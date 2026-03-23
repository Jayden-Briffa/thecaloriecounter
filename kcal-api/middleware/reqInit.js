export function reqInit(req, res, next) {
    req.locals = {}

    next()
}