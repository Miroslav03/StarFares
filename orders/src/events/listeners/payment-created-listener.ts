import {
    Listener,
    NotFoundError,
    OrderStatus,
    PaymentCreatedEvent,
    Subjects,
} from "@starfares/common";
import { queueGroupName } from "../../constants/queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
        const order = await Order.findById(data.orderId);

        if (!order) {
            throw new NotFoundError();
        }

        order.set({ status: OrderStatus.Complete });
        await order.save();

        msg.ack();
    }
}
