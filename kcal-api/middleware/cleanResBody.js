import convertEmptyStringsToNull from "../utils/convertEmptyStringsToNull.js";

export function cleanResBody (req, res, next) {
    if (res.body){
        convertEmptyStringsToNull(res.body);
    }
    next();
};