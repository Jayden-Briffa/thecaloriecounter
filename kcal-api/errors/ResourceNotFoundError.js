import { RfcError } from "./RfcError.js";

export class ResourceNotFoundError extends RfcError{
    constructor( 
        {
            resourceType,
            resourceId,

            cause = undefined
        }) {

        super(
            `There is no ${resourceType} with the id: '${resourceId}' in your account`, 
            { 
                title: "resource_not_found",
                status: 404, 
                cause
            }
        );
        
    }
}