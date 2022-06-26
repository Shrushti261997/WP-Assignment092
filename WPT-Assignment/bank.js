const express = require('express');
const app = express();

const mysql = require('mysql2');

let dbparams =
{
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bank',
    port: 3306
};

const dbcon = mysql.createConnection(dbparams); 

app.use(express.static("staticFiles"))

app.get('/balance',(req,resp)=>{
    console.log('created');
    let accno = req.query.userAccNo;  //store data from ajax

    console.log('Accoun no fetch');

    dbcon.query('select bal from SBI where acno= ?',[accno],(err,rows)=>{
       if(err)
        {
            console.log("error has occoure  database errror");
        }
        else
        {
            let str = {balance :rows[0].bal};  //object
        }
        resp.send(str);


    })



});

app.listen(980,function(){
    console.log("hello at 990");
});