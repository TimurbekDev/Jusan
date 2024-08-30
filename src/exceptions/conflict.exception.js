import { BaseException } from "./base.exception.js";

export class ConflictException extends BaseException {
    constructor(message) {
        super();
        this.status = 409;
        this.name = "Conflict Exception";
        this.message = message;
    }
}