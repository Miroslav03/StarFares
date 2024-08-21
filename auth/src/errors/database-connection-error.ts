import { CutomError } from "./custom-error";

export class DatabaseConnectionError extends CutomError {
    statusCode = 500;
    reason = "Error connection to database";

    constructor() {
        super('Error connecting to db');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}
