import { PaymentCreatedEvent, Publisher, Subjects } from "@starfares/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
