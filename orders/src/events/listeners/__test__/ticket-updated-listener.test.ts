import mongoose from "mongoose";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedEvent } from "@starfares/common";
import { Ticket } from "../../../models/Ticket";

const configure = async () => {
    const listener = new TicketUpdatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "ticket",
        price: 20,
    });

    await ticket.save();

    const data: TicketUpdatedEvent["data"] = {
        version: ticket.version + 1,
        id: ticket.id,
        title: "ticket1",
        price: 312,
        userId: new mongoose.Types.ObjectId().toHexString(),
    };

    // @ts-ignore
    const message: Message = {
        ack: jest.fn(),
    };

    return { listener, data, message, ticket };
};

it("finds, updates and saves a ticket", async () => {
    const { listener, data, message, ticket } = await configure();

    await listener.onMessage(data, message);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket?.title).toEqual(data.title);
    expect(updatedTicket?.price).toEqual(data.price);
    expect(updatedTicket?.version).toEqual(data.version);
});

it("acks the message", async () => {
    const { listener, data, message, ticket } = await configure();

    await listener.onMessage(data, message);

    expect(message.ack).toHaveBeenCalled();
});

it("doesn't ack the function if the event has a future version", async () => {
    const { listener, data, message } = await configure();

    data.version = 3;

    try {
        await listener.onMessage(data, message);
    } catch (error) {}

    expect(message.ack).not.toHaveBeenCalled();
});
