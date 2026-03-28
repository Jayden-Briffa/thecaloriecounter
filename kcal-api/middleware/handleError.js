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

    if (status >= 400 && process.env.NODE_ENV == "test" && process.env.NODE_NOLOG !== "true" || process.env.NODE_ENV == "dev"){
        const banner = "=".repeat(5) + ` REQUEST (${status}): ${req.method} ${req.originalUrl} ` + "=".repeat(5)
        console.log(banner)
        console.log(returnObj)

        console.log(req.locals)
        console.log("=".repeat(banner.length))
    }

    return res.status(status).json(returnObj)
}