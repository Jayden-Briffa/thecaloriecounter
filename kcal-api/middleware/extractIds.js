export function extractIds(req, res, next) {
    req.locals.ids;

    if (req.query.ids){
            req.locals.ids = req.query.ids.split(",");
    }

    next()
}