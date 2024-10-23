import mongoose from "mongoose";
import { Ticket } from "../../../models/Ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { OrderCancelledEvent } from "@starfares/common";

const configure = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = new mongoose.Types.ObjectId().toHexString();

    const ticket = Ticket.build({
        userId: new mongoose.Types.ObjectId().toHexString(),
        title: "ticket",
        price: 20,
    });
    await ticket.save();

    const data: OrderCancelledEvent["data"] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        ticket: {
            id: ticket.id,
        },
    };

    // @ts-ignore
    const message: Message = {
        ack: jest.fn(),
    };

    return { listener, data, message, ticket, orderId };
};

it("updates the ticket", async () => {
    const { listener, data, message, ticket } = await configure();

    await listener.onMessage(data, message);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(undefined);
});

it("acks the message", async () => {
    const { listener, data, message } = await configure();

    await listener.onMessage(data, message);

    expect(message.ack).toHaveBeenCalled();
});

it("publishes a ticket updated event", async () => {
    const { listener, data, message } = await configure();

    await listener.onMessage(data, message);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
