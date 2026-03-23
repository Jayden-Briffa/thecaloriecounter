import { RfcError } from "./RfcError.js";

export class InvalidQueryFieldsError extends RfcError{
    constructor(
        {
            queryParamName,
            invalidField,
            validFields,

            cause = undefined
        }) {
            
        super(`Invalid value for '${queryParamName}': ${invalidField}`, { 
            title: "Invalid fields", 
            status: 400,
            cause
        });

        this.invalidField = invalidField
        this.validFields = validFields
    }
}