import {
    Listener,
    OrderCancelledEvent,
    OrderStatus,
    Subjects,
} from "@starfares/common";
import { queueGroupName } from "../../constants/queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
        const order = await Order.findOne({
            _id: data.id,
            version: data.version - 1,
        });

        if (!order) {
            throw new Error("Order does not exist");
        }
        order.set({ status: OrderStatus.Cancelled });
        await order.save();

        msg.ack();
    }
}
