// import express, { Router } from 'express';
import dotenv from 'dotenv';
import authMiddleware from './middleware/simMiddleware.js';
import express from 'express'
import Router from './router/simRouter.js';
dotenv.config();
const PORT = process.env.PORT


const app = express();

app.use(express.json());
app.use(authMiddleware,Router);


app.listen(PORT,()=>{
    console.log(`app is ruuning on port http://localhost:${PORT}`);
    
})



