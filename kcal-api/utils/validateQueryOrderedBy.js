import { InvalidQueryFieldsError } from "../errors/InvalidQueryFieldsError.js";

export function validateQueryOrderedBy(orderedBy, validFields, defaultValue="id"){
    orderedBy = orderedBy ?? defaultValue;

    if (!validFields.includes(orderedBy)){
        let returnErr = new InvalidQueryFieldsError({queryParamName: "orderdBy", invalidField: orderedBy, validFields});
        returnErr.status = 400
        return returnErr
    } 

    return null
}