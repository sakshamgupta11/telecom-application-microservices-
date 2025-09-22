import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

const con = mysql2.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE

});

con.connect((err)=>{
    if(err){
        console.log("Database connection issue",err);
        
    }
    else{
        console.log("Database is connected successfully");
        
    }
});

export default con.promise()