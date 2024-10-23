import {
    ExpirationCompleteEvent,
    Publisher,
    Subjects,
} from "@starfares/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
