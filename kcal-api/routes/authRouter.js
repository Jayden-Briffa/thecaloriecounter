import express from 'express';
import * as controller from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.get('/user', controller.getUser);
authRouter.get('/logout', controller.getLogout)

authRouter.post('/signup', controller.postSignup)
authRouter.post('/login', controller.postLogin)

authRouter.delete('/signup', controller.deleteSignup)

export default authRouter