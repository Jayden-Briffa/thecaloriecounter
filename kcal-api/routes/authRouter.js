import express from 'express';
import * as controller from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/signup', controller.postSignup)
authRouter.post('/login', controller.postLogin)

authRouter.delete('/signup', controller.deleteSignup)

export default authRouter