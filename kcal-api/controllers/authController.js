import * as model from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import isEmail from 'validator/lib/isEmail.js';

// Validate new user accounts
async function validateSignup(email, password){
    const errors = {}

    // Check that email is valid
    if (!isEmail(email)){
        errors.email = "You must give a valid email";
    }

    // Check that email is unique
    const foundUser = await model.selectUserByEmail(email)
    console.log(foundUser);
    if (foundUser.length !== 0){
        errors.email = "That email is already registered";
    }

    // Check that password is strong
    if (password.length < 6){
        errors.password = "Your password must be at least 6 characters long";
    }

    return errors;
}

async function validateLogin(user, password){
    const errors = {};

    if (user.length === 0){
        errors.invalid_credentials = "Invalid email or password";

    } else {
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches){
            errors.invalid_credentials = "Invalid email or password"
        }
    
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60 * 1000
function createToken(id){
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

// Create account
export async function postSignup(req, res, next) {
    const { email, password } = req.body;

    try{
        const errors = await validateSignup(email, password)

        if (Object.keys(errors).length > 0){
            return res.status(400).json({ errors })
        }

        const result = await model.insertUser(email, password)
        
        const token = createToken(result.insertId)

        res.cookie('user', token, { httpOnly: true, maxAge });
        res.cookie('access', {}, { maxAge });
        res.status(201).json({user: result.insertId});

    } catch(error){
        const errors = await handleErrors(error)
        res.status(400).json(errors)
    }
};

// Create cookie only
export async function postLogin(req, res, next) {
    const { email, password } = req.body

    try{
        const user = await model.selectUserByEmail(email)
        const errors = await validateLogin(user, password);
    
        if (Object.keys(errors).length > 0){
            console.log(errors)
            return res.status(400).json({ errors })
        }

        const token = createToken(user.id);
        res.cookie('user', token, { httpOnly: true, maxAge });
        res.cookie('access', {}, { maxAge });
        res.status(200).json({user: user.id})
    
    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

};

export async function postLogout(req, res, next) {
    res.cookie("user", "", { maxAge: 100});
    res.cookie("access", "", { maxAge: 100});
    res.status(200).json({message: "Successfully logged out"})
};

export async function deleteSignup(req, res, next) {};