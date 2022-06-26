let express = require('express');
const app = express();
const mysql = require('mysql2');


let dbparams =
{
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'company',
    port: 3306
};

const con = mysql.createConnection(dbparams);

app.use(express.static("staticfolder"));


app.get("/getdetails", (req, resp) => {
    con.query('select * from emptable', [],
        (error, rows) => {
            //console.log(rows);
            resp.send(rows);
        });
});

app.get("/getemployeedetails", (req, resp) => {
    let empno = req.query.empno;
    console.log(empno);
    let output = { status: false, details: {} }
    con.query('select empname, empsalary from emptable where empno = ?', [empno],
        (error, rows) => {
            if (error) {

            }
            else {
                if (rows.length > 0) {
                    output.status = true;
                    output.details = rows[0];
                }
                else {
                    output.status = false;
                }
            }
            console.log(rows);
            resp.send(output);
        });//database

});//server

app.get("/insertdata", (req, resp) => {

    let empinsert = { empno: req.query.empno, empname: req.query.empname, empsalary: req.query.empsalary };
    console.log(empinsert);
    let output = false;
    con.query('insert into emptable(empno,empname,empsalary) values(?,?,?)', [empinsert.empno, empinsert.empname, empinsert.empsalary],
        (error, rows) => {
            if (error) {
            }
            else if (rows.affectedRows > 0) {
                output = true;
            }
            resp.send(output);
        });//database
});

app.get("/updatedata", (req, resp) => {

    let empinsert = { empno: req.query.empno, empname: req.query.empname, empsalary: req.query.empsalary };
    console.log(empinsert);
    let output = false;
    con.query('update emptable set empname = ?,empsalary =? where empno=?', [empinsert.empname, empinsert.empsalary, empinsert.empno],
        (error, rows) => {
            if (error) {
            }
            else if (rows.affectedRows > 0) {
                output = true;
            }
            resp.send(output);
        });//database
});


app.get("/deletedata", (req, resp) => {

    let empdel = { empno: req.query.empno };
    console.log(empdel);
    let output = false;
    con.query('delete from emptable where empno=?', [empdel.empno],
        (error, rows) => {
            if (error) {
            }
            else if (rows.affectedRows > 0) {
                output = true;
            }
            resp.send(output);
        });//database
});



app.listen(900, function () {
    console.log("server listening at port 900...")
});