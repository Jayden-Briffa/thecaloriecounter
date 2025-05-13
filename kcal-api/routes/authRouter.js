import express from 'express';
import * as controller from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/signup', controller.postSignup)
authRouter.post('/login', controller.postLogin)
authRouter.post('/logout', controller.postLogout)

authRouter.delete('/signup', controller.deleteSignup)

export default authRouter