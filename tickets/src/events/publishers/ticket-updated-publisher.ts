import { Publisher, Subjects, TicketUpdatedEvent } from "@starfares/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
