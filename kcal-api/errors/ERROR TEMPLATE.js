import { RfcError } from "./RfcError";

export class ErrorTemplate extends RfcError{
    constructor(
        message, 
        {
            type = null,
            title = "Error",
            instance = null,
            status = 500,

            cause = undefined
        }) {

        super(message, { cause, type, title, instance, status });

        
    }
}