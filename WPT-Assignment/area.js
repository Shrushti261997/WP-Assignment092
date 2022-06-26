const express = require('express');
const app = express();

const mysql=require('mysql2');
let dbparams =
{
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'wpt',
    port: 3306
};
app.use(express.static("staticFiles"))

const dbcon = mysql.createConnection(dbparams); 

app.use(express.static("staticFiles"))

app.get('/getAreaName',(req,resp)=>{
    console.log('created');
    let input = req.query.pincode;  //store data from ajax

    console.log(input);

    let output = {itemnofoundstatus:false, itemdetails:{}}

    // dbcon.query('select bal from SBI where acno= ?',[accno],(err,rows)=>{
    dbcon.query('select area from address where pincode=?',[input],(err,rows)=>{
        console.log(rows);
       if(rows.length>0)
        {
        output.itemnofoundstatus=true;
        output.itemdetails=rows[0];   
     }
     console.log("working");
     resp.send(output);

     })
    console.log("My server is working");
    

});



app.listen(800,function(){
    console.log("hello at 800");
});