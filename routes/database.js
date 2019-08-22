var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database/databaseConnect');
var connection = mysql.createConnection(dbconfig);

router.get('/getBoardList', (req, res) => {
    connection.query('SELECT * FROM board', (err, result) => {
        if (err) {
            return err;
        } else {
            res.send(result);
        }
    })
});

router.get('/getBoardModify', (req, res) => {

});

router.post('/join', (req, res) => {
    connection.query(`SELECT COUNT(*) as count FROM client
    where user_email = '${req.body.email}' `, (err, result) => {

            if (err) throw err;
            if (result[0].count === 1) {

                res.send(false);
            } else {
                connection.query(`INSERT INTO client (user_email,user_firstName,user_lastName,user_password)
                VALUES('${req.body.email}','${req.body.first}','${req.body.last}','${req.body.pw}')`, (err, result) => {
                        if (err) throw err;
                    })

                res.send(true);
            }
        });
});

router.post('/login', (req, res) => {
    connection.query(`SELECT COUNT(*) as count FROM client
     where user_email = '${req.body.email}' and user_password = '${req.body.pw}'`, (err, result) => {

            if (err) throw err
            if (result[0].count === 1) {
                res.send(true);
            } else {
                res.send(false);
            }
        });
});

router.post('/setBoard', (req, res) => {

    connection.query(`INSERT INTO board (board_name, board_user, board_password, board_contents, board_date, board_title)
    VALUES('${req.body.name}','${req.body.user}','${req.body.pw}','${req.body.contents}','${req.body.date}', '${req.body.title}')`,
     (err, result) => {

            if (err) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
});

router.post('/setBoardDelete', (req, res) => {

});

module.exports = router;