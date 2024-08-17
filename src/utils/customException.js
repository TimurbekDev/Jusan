export class CustomException extends Error {

    constructor(status, message) {

        super(message);

        this.status = status
    }
}