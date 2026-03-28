import { RfcError } from "./RfcError.js";

export class InvalidFieldsError extends RfcError{
    constructor(
        {
            invalidFields,

            cause = undefined
        }) {
            
        super(`Invalid field values were given`, { 
            title: "invalid_fields", 
            status: 400,
            cause
        });

        this.invalidFields = invalidFields
    }
}