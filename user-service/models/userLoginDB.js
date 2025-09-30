import con from "../config.js";
import { v4 as uuidv4 } from "uuid";


export async function userLoginCheck(email) {
    const [checkUser] = await con.query("SELECT * FROM telecom.users where email = ?", [email])
    return checkUser[0]
}

export async function checkEmail(email) {
    const [data] = await con.query("select password,email,id from telecom.users where email =?", [email])
    return data[0]

}


export async function inserToken(token, email) {

    const [getUserID] = await con.query("SELECT id FROM telecom.users WHERE email = ?", [email]);
    const userId = getUserID[0]?.id;

    if (!userId) throw new Error("User not found");


    const [fetchUser] = await con.query("SELECT * FROM telecom.user_tokens WHERE user_id = ?", [userId]);

    if (fetchUser.length > 0) {

        await con.query("UPDATE telecom.user_tokens SET token = ? WHERE user_id = ?", [token, userId]);
    } else {

        const id = uuidv4();
        await con.query("INSERT INTO telecom.user_tokens (id, user_id, token) VALUES (?, ?, ?)", [id, userId, token]);
    }

    const [getToken] = await con.query("SELECT token FROM telecom.user_tokens WHERE user_id = ?", [userId]);
    return getToken[0]?.token;
}
