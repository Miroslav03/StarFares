import { Publisher, TicketCreatedEvent, Subjects } from "@starfares/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
