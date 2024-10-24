import { OrderCancelledEvent, OrderStatus } from "@starfares/common";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import mongoose from "mongoose";
import { Order } from "../../../models/Order";

const configure = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        status: OrderStatus.Created,
    });

    const data: OrderCancelledEvent["data"] = {
        id: order.id,
        version: 1,
        ticket: {
            id: new mongoose.Types.ObjectId().toHexString(),
        },
    };

    //@ts-ignore
    const message: Message = {
        ack: jest.fn(),
    };

    return { data, listener, message, order };
};

it("expect order status to be cancelled", async () => {
    const { listener, data, message, order } = await configure();

    await listener.onMessage(data, message);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("acks the message", async () => {
    const { listener, data, message } = await configure();

    await listener.onMessage(data, message);

    expect(message.ack).toHaveBeenCalled();
});
