import { Publisher, OrderCreatedEvent, Subjects } from "@starfares/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
