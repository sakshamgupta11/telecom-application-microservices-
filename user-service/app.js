import express from 'express';
import dotenv from 'dotenv';
import Router from './routes/userSignup.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("user servive is running");
});
app.use('/telco',Router)
app.listen(process.env.PORT || 5000,()=>{
    console.log(`user service is running on port ${process.env.PORT} || 5000`);
    
})