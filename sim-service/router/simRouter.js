// import { Router } from "express";
import express from 'express'
import authMiddleware from "../middleware/simMiddleware.js";
import simController from '../controllers/simContoller.js';


const Router = express.Router();

Router.get('/orders',simController);

export default Router;