// Ensures compliance with RFC 7807
export class RfcError extends Error {
    constructor(
        message, 
        {
            type = "",
            title = "Error",
            instance = null,
            status = 500,
            detail = null,

            cause = undefined
        } = {}) {
        super(message, { cause });
        this.type = type;
        this.title = title;
        this.detail = detail ?? message;
        this.instance = instance;
        this.status = status;
    }
}