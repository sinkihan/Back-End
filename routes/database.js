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
    connection.query(`SELECT COUNT(*) as count FROM client
     where user_id = '${req.body.id}' and user_pw = '${req.body.pw}'`, (err, result) => {
         console.log(result[0].count);
         
         if (err) throw err
         else if(result[0].count === 1){
             res.send('Login!');
         } else {
             res.send('Check your info!');
         }
     })
})

module.exports = router;