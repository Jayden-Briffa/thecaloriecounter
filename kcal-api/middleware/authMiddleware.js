import jwt from 'jsonwebtoken';
import * as model from '../models/authModel.js';

// Get user details on each request
export async function checkuser(req, res, next){
    console.log("COOKIE BEFORE:", req.cookies.user)
    if (Object.keys(req.cookies).includes('user')){
        const result = jwt.verify(req.cookies.user, process.env.JWT_SECRET)
        console.log("COOKIE:", req.cookies.user)
        const user = await model.selectUserById(result.id);

        if (user !== undefined){
            res.locals.user = user;
        } else {
            res.locals.user = null;
        }

    } else {
        res.locals.user = null;
    }
    console.log(res.locals.user, req.cookies)
    next()
}

// Refuse to serve users who don't have a valid jwt cookie
export async function requireAuth(req, res, next){
    
    if (res.locals.user !== null){
        return next()
    }

    const errors = {login_required: "You must log in before making a request to this service"}
    return res.status(403).json({ errors })
}