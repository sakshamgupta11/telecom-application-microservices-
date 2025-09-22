import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("user servive is running");
});

app.listen(process.env.PORT || 5000,()=>{
    console.log(`user service is running on port ${process.env.PORT} || 5000`);
    
})