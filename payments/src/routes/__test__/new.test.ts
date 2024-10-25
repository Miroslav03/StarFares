import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/Order";
import { OrderStatus } from "@starfares/common";
import { stripe } from "../../stripe";
import { Payment } from "../../models/Payment";

jest.mock("../../stripe");

it("returns a 404 when purchasing an order that does not exist", async () => {
    const user = global.signup();

    await request(app)
        .post(`/api/payments`)
        .set("Cookie", user)
        .send({
            token: "asd",
            orderId: new mongoose.Types.ObjectId().toHexString(),
        })
        .expect(404);
});

it("returns a 401 when purchasing an order that does not belong to the user", async () => {
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
    });

    await order.save();

    const user = global.signup();

    await request(app)
        .post(`/api/payments`)
        .set("Cookie", user)
        .send({
            token: "asd",
            orderId: order.id,
        })
        .expect(401);
});

it("returns a 400 when purchasing a cancelled order", async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Cancelled,
        userId: userId,
        price: 20,
    });

    await order.save();

    const user = global.signup(userId);

    await request(app)
        .post(`/api/payments`)
        .set("Cookie", user)
        .send({
            token: "test",
            orderId: order.id,
        })
        .expect(400);
});

it("creates a payment and returns 201", async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: userId,
        price: 20,
    });

    await order.save();

    const user = global.signup(userId);

    await request(app)
        .post(`/api/payments`)
        .set("Cookie", user)
        .send({
            token: "tok_visa", //Test mode stripe acc
            orderId: order.id,
        })
        .expect(201);

    expect(stripe.charges.create).toHaveBeenCalled();

    const payment = await Payment.findOne({
        orderId: order.id,
    });

    expect(payment).not.toBeNull();
    expect(payment!.stripeId).toEqual("some_stripe_id");
});
