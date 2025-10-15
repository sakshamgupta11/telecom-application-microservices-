import express from 'express';
import { SignUp } from '../controllers/userSignupController.js';
import { userLogin } from '../controllers/userLoginController.js';
// import { logRequestResponse } from '../middleware/loggerMiddleware.js';
const Router = express.Router()
// Router.use(logRequestResponse)

Router.post('/signup',SignUp)
Router.post('/login',userLogin)

export default Router