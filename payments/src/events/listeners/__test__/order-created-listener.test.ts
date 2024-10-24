import { OrderCreatedEvent, OrderStatus } from "@starfares/common";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/Order";

const configure = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const data: OrderCreatedEvent["data"] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        userId: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        expiresAt: "test",
        version: 0,
        ticket: {
            id: new mongoose.Types.ObjectId().toHexString(),
            price: 2,
        },
    };

    //@ts-ignore
    const message: Message = {
        ack: jest.fn(),
    };

    return { data, listener, message };
};

it("acks the message", async () => {
    const { listener, data, message } = await configure();

    await listener.onMessage(data, message);

    const order = await Order.findById(data.id);

    expect(order?.price).toEqual(data.ticket.price);
});

it("acks the message", async () => {
    const { listener, data, message } = await configure();

    await listener.onMessage(data, message);

    expect(message.ack).toHaveBeenCalled();
});
