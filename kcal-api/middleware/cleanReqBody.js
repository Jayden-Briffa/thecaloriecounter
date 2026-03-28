import convertEmptyStringsToNull from "../utils/convertEmptyStringsToNull.js";

export function cleanReqBody(req, res, next) {
    if (req.body){
        req.bodyUncleaned = structuredClone(req.body) 
        convertEmptyStringsToNull(req.body)
    }
    next();
};