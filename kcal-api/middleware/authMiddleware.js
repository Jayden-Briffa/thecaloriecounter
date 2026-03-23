import jwt from 'jsonwebtoken';
import * as model from '../models/authModel.js';
import { NoLoginError } from '../errors/NoLoginError.js';

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
                req.locals.user = user;
            } else {
                req.locals.user = null;
            }
        } catch (error) {
            req.locals.user = null;
        }

    } else {
        req.locals.user = null;
    }

    next()
}

// Refuse to serve users who don't have a valid jwt auth token
export async function requireAuth(req, res, next){
    
    if (req.locals.user !== null){
        return next()
    }

    next(new NoLoginError())
}