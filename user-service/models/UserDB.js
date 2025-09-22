import con from '../config.js'
import { v4 as uuidv4 } from "uuid";


export async function findUserByID(email,phone) {
   const [rows]=  await con.query('SELECT * FROM telecom.users where email =? or phone =?',[email,phone])
   return rows[0]
}

export async function insertUser(name ,email,password,phone) {
      const id = uuidv4(); 
      const [inserUserData] = await con.query("insert into telecom.users (id,name,email,password,phone)VALUES(?,?,?,?,?)",[id,name,email,password,phone])
      return inserUserData.insertId

    
}