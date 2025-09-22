import Router from "../routes/userSignup.js";
import { findUserByID } from "../models/UserDB.js";
import { insertUser } from "../models/UserDB.js";
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'



export async function SignUp(req, res) {

    try {

        const { name, email, password, phone } = req.body
    if (!name || !email || !password || !phone) {

        return res.status(400).json({ status: "failed", msg: "all fileds are required" })
    }
    const checkExistUser = await findUserByID(email, phone)
    if (checkExistUser) {
        return res.status(400).json({ status: "failed", msg: "email or phone  is already exist please login" })

    }
    const hashPassword = await bcrypt.hash(password,10)
     await insertUser(name,email,hashPassword,phone);
    
    res.status(201).json({status:"success",msg:"user has been created."})
        
    } catch (error) {
        res.status(500).json({
            status:"failed",
            msg:"internal server error",
            error:error
        })
        console.log("something went wrong",error);
        
    }
    
}