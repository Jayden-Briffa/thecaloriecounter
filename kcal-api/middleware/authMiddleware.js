import jwt from 'jsonwebtoken';
import * as model from '../models/authModel.js';

// Get user details on each request
export async function checkuser(req, res, next){

    const authHeader = req.headers.authorization;
    if (authHeader !== undefined && authHeader.startsWith('Bearer ')){ 
        const token = authHeader.split(' ')[1];
        
        let user;
        try{
            const result = jwt.verify(token, process.env.JWT_SECRET)

            user = await model.selectUserById(result.id);

            if (user !== undefined){
                res.locals.user = user;
            } else {
                res.locals.user = null;
            }
        } catch (error) {
            res.locals.user = null;
        }

    } else {
        res.locals.user = null;
    }

    next()
}

// Refuse to serve users who don't have a valid jwt auth token
export async function requireAuth(req, res, next){
    
    if (res.locals.user !== null){
        return next()
    }

    const errors = {login_required: "You must log in before making a request to this service"}
    return res.status(403).json({ errors })
}