var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database/databaseConnect');
var connection = mysql.createConnection(dbconfig);

router.get('/getTable', (req, res) => {
    connection.query('SELECT * FROM client', (err, rows) => {
        if (err) throw err;

        console.log('A result is : ', rows);
        res.send(rows);
    });
});

router.post('/join', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

router.post('/login', (req, res) => {
    console.log(req.body);

    connection.query(`SELECT COUNT(*) as count FROM client
     where user_email = '${req.body.email}' and user_password = '${req.body.pw}'`, (err, result) => {

            if (err) throw err
            if (result[0].count === 1) {
                res.send(true);
            } else {
                res.send(false);
            }
        })
})

module.exports = router;