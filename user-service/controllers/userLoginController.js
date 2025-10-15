import Jwt from 'jsonwebtoken';
import { userLoginCheck, checkEmail, inserToken } from '../models/userLoginDB.js';
import bcrypt from "bcrypt"


export async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: "failed", msg: "all filed are required" })
        }

        // if (password !== password_confirmation) {
        //     return res.status(400).json({ status: "failed", msg: "password and confirmation password is not match please recheck" })
        // }
        const checkExistUser = await userLoginCheck(email);
        if (!checkExistUser) {
            return res.status(400).json({ status: "failed", msg: "user does not exist please sign up" })
        }
        const userData = await checkEmail(email)
        const authentication = await bcrypt.compare(password, userData.password)
        if (!authentication) {
            return res.status(401).json({ status: "faild", msg: "incorrect credencial please try again" })
        }

        const token = Jwt.sign({ id: userData.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "10d",
        });


        let fetchToken = await inserToken(token, email);
        res.status(200).json({ status: "success", msg: "logged in successfully", token: fetchToken })
    } catch (error) {
        res.status(500).json({
            status: "faild",
            msg: "internal server error",
            error: error

        })
        console.log(error);

    }

}