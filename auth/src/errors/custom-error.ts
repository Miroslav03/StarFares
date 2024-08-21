export abstract class CutomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CutomError.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[];
}
