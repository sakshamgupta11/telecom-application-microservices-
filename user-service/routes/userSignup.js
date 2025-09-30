import express from 'express';
import { SignUp } from '../controllers/userSignupController.js';
import { userLogin } from '../controllers/userLoginController.js';
const Router = express.Router()

Router.post('/signup',SignUp)
Router.post('/login',userLogin)

export default Router