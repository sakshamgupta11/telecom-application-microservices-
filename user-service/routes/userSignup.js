import express from 'express';
import { SignUp } from '../controllers/userSignupController.js';
const Router = express.Router()

Router.post('/signup',SignUp)

export default Router