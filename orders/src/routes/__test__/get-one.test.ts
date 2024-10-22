import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket";
import { Order } from "../../models/Order";
import { OrderStatus } from "@starfares/common";
import mongoose from "mongoose";

it("returns the fetched order", async () => {
    const user = global.signup();

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "ticket1",
        price: 20,
    });
    await ticket.save();

    const { body: order } = await request(app)
        .post(`/api/orders`)
        .set("Cookie", user)
        .send({ ticketId: ticket.id })
        .expect(201);

    const { body: fetched } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set("Cookie", user)
        .expect(200);

    expect(fetched.id).toEqual(order.id);
});

it("returns error if user tries to fetch another's user order", async () => {
    const user = global.signup();
    const user1 = global.signup();

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "ticket1",
        price: 20,
    });
    await ticket.save();

    const { body: order } = await request(app)
        .post(`/api/orders`)
        .set("Cookie", user)
        .send({ ticketId: ticket.id })
        .expect(201);

    await request(app)
        .get(`/api/orders/${order.id}`)
        .set("Cookie", user1)
        .expect(401);
});
