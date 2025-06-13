import express from 'express';
import * as controller from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.get('/user', controller.getUser);

authRouter.post('/signup', controller.postSignup)
authRouter.post('/login', controller.postLogin)

authRouter.delete('/user', controller.deleteUser)

export default authRouter