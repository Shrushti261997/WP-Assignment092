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

app.get("/displayitems", (req, resp) => {
    con.query('select * from items', [],
        (error, rows) => {
            //console.log(rows);
            resp.send(rows);
        });
});

app.get("/getdetails", (req, resp) => {
    let itemno = req.query.itemno;
    console.log(itemno);
    let output = { status: false, details: {} }
    con.query('select itemname, itemprice from items where itemno = ?', [itemno],
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
            resp.send(output);
        });//database

});//server


app.get("/insertdata", (req, resp) => {

    let iteminsert = { itemno: req.query.itemno, itemname: req.query.itemname, itemprice: req.query.itemprice };
    console.log(iteminsert);
    let output = false;
    con.query('insert into items(itemno,itemname,itemprice) values(?,?,?)', [iteminsert.itemno, iteminsert.itemname, iteminsert.itemprice],
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

    let iteminsert = { itemno: req.query.itemno, itemname: req.query.itemname, itemprice: req.query.itemprice };
    console.log(iteminsert);
    let output = false;
    con.query('update items set itemname = ?,itemprice =? where itemno=?', [iteminsert.itemname, iteminsert.itemprice, iteminsert.itemno],
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