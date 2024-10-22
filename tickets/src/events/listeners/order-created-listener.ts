import { Listener, OrderCreatedEvent, Subjects } from "@starfares/common";
import { queueGroupName } from "../../constants/queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/Ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        const ticket = await Ticket.findById({
            id: data.ticket.id,
        });

        if (!ticket) {
            throw new Error(`Ticket does't exist`);
        }

        ticket.set({ orderId: data.id });

        await ticket.save();

        msg.ack();
    }
}
