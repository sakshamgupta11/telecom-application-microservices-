import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()


const createConnection = mysql2.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD
});

createConnection.connect((err)=>{
    if(err){
        console.log("database connected faild for sim service");
        
    }
    else{
        console.log("databased connected");
        
    }
})