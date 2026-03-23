import { RfcError } from "../errors/RfcError.js"; 

export function handleError(err, req, res, next){
    let status = err.status ?? 500;
    let returnErr;

    if (status >= 500){
        console.log(err.stack, err.message)
        returnErr = new RfcError("An internal error occured. Please try again later.", 
            {   
                title : "ServerError",
            }
        )
    } else {
        returnErr = err
    }

    let allowedFields = [
        "type", 
        "title", 
        "detail", 
        "instance",
        "status",
        "errors",
        "invalidField",
        "validFields",
        "invalidFields"
    ]

    let returnObj = {}
    allowedFields.forEach(field => {
        if (returnErr[field]){
            returnObj[field] = returnErr[field]
        }
    })

    returnObj["status"] = status;
    returnObj["instance"] = req.originalUrl

    return res.status(status).json(returnObj)
}