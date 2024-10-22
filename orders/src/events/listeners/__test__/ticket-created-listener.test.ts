import { TicketCreatedEvent } from "@starfares/common";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedListener } from "../ticket-created-listener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/Ticket";

const configure = async () => {
    const listener = new TicketCreatedListener(natsWrapper.client);

    const data: TicketCreatedEvent["data"] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "ticket",
        price: 312,
        userId: new mongoose.Types.ObjectId().toHexString(),
    };

    // @ts-ignore
    const message: Message = {
        ack: jest.fn(),
    };

    return { listener, data, message };
};

it("creates and saves a ticket", async () => {
    const { listener, data, message } = await configure();

    await listener.onMessage(data, message);

    const ticket = await Ticket.findById(data.id);

    expect(ticket).toBeDefined();
    expect(ticket?.title).toEqual(data.title);
    expect(ticket?.price).toEqual(data.price);
});

it("acks the message", async () => {
    const { listener, data, message } = await configure();

    await listener.onMessage(data, message);

    expect(message.ack).toHaveBeenCalled();
});