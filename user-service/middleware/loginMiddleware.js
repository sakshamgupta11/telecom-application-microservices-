/**
 * Generates a JWT token for a user after verifying credentials.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The user's password.
 * @param {string} password_confirmation - The password confirmation to verify.
 * @returns {Promise<void>} Resolves when the token is generated.
 */
import con from "../config.js";
import jssonwebtoken from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config()

export async function generateToken(req, res, next) {
    try {
        const { email, password_confirmation } = req.body
        const [checkExist] = await con.query('select password ,  from telecom.users where email = ?', [email]);
        const compirePassword = await bcrypt.compire(checkExist, password_confirmation);
        if (!compirePassword) {
            res.status(401).json({ status: "failed", msg: "email or password is incorrect" })
        }

        const token = await Jwt.sign(compirePassword, process.env.JWT_SECRECT);
        next()
    } catch (error) {
res.status(500).json({status:"failed",msg:"internal server error at generate token"})
    }




}