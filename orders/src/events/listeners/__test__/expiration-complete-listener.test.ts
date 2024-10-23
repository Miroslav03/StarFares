import { ExpirationCompleteEvent, OrderStatus } from "@starfares/common";
import { natsWrapper } from "../../../nats-wrapper";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { Ticket } from "../../../models/Ticket";
import mongoose from "mongoose";
import { Order } from "../../../models/Order";

const configure = async () => {
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "ticket",
        price: 20,
    });

    await ticket.save();

    const order = Order.build({
        status: OrderStatus.Created,
        userId: new mongoose.Types.ObjectId().toHexString(),
        expiresAt: new Date(),
        ticket,
    });

    await order.save();

    const data: ExpirationCompleteEvent["data"] = {
        orderId: order.id,
    };

    // @ts-ignore
    const message: Message = {
        ack: jest.fn(),
    };

    return { listener, data, message, order };
};

it("updates the order status to canclled", async () => {
    const { listener, data, message, order } = await configure();

    await listener.onMessage(data, message);

    const updatedOrder = await Order.findById(data.orderId);

    expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it("publishes an order cancelled event", async () => {
    const { listener, data, message, order } = await configure();

    await listener.onMessage(data, message);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("acks the message", async () => {
    const { listener, data, message } = await configure();

    await listener.onMessage(data, message);

    expect(message.ack).toHaveBeenCalled();
});
