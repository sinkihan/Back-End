var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database/databaseConnect');
var connection = mysql.createConnection(dbconfig);

// router.get('/getBoardList', (req, res) => {
//     connection.query('SELECT * FROM board', (err, result) => {
//         if (err) {
//             return err;
//         } else {
//             res.send(result);
//         }
//     })
// });

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
    console.log(req.body);
    
    connection.query(`SELECT COUNT(*) as count FROM client
     where user_email = '${req.body.email}' and user_password = '${req.body.pw}'`, (err, result) => {
            
            (result[0].count === 1) ? res.send(true) : res.send(false);
        });
});

router.post('/setBoard', (req, res) => {

    connection.query(`INSERT INTO board (board_name, board_user, board_password, board_contents, board_date, board_title)
    VALUES('${req.body.name}','${req.body.user}','${req.body.pw}','${req.body.contents}','${req.body.date}', '${req.body.title}')`,
        (err, result) => {

            (err) ? res.send(false) : res.send(true);
        });
});

router.get('/getBoardContents', (req, res) => {

    connection.query(`SELECT * FROM board where board_id = '${req.query.board_id}'`,
        (err, result) => {

            (err) ? res.send(err) : res.send(result);
        });
});

router.post('/setBoardDelete', (req, res) => {

    connection.query(`SELECT COUNT(*) as count FROM board where board_id ='${req.body.board_id}' and
    board_password = '${req.body.board_password}'`,
        (err, result) => {

            if (err) throw err;
            if (result[0].count === 0) {

                res.send(false);
            } else {
                connection.query(`DELETE FROM board where board_id = '${req.body.board_id}'`,
                    (err, result) => {
                        (err) ? res.send(err) : res.send(true);
                    }
                )
            }
        })
});

router.post('/getBoardModify', (req, res) => {
    console.log(req.body);
    
    connection.query(`SELECT COUNT(*) as count FROM board where board_id ='${req.body.board_id}' and
    board_password = '${req.body.board_password}'`,
        (err, result) => {

            if (err) throw err;
            if (result[0].count === 0) {

                res.send(false);
            } else {
                connection.query(`UPDATE board SET board_name = '${req.body.name}', board_user = '${req.body.user}', board_password = '${req.body.board_password}', board_contents = '${req.body.contents}', board_date = '${req.body.date}', board_title = '${req.body.title}' where board_id = ${req.body.board_id}`,
                    (err, result) => {
                        (err) ? res.send(err) : res.send(true);
                        console.log(err);
                        
                    }
                )
            }
        })
});

//---------------------------------------------------------
//kim reporting....
router.get('/getBoardCount', (req, res) => {
    connection.query('SELECT count(*) as count FROM board', (err, result) => {
        let count = result[0].count.toString();

        (count !== 0) ? res.send(count) : res.send(0);
    })
});

//get boardList by rownum indexing
router.get('/getBoardList/:currentPage', (req, res) => {
    //  console.log(req.params);

    connection.query(`select @rownum:=@rownum+1 as rownum, board_id, board_title, board_name, board_date from board, (select @rownum:=0) TMP order by rownum desc limit ${(req.params.currentPage - 1) * 10}, 10`, (err, result) => {

        (err) ? res.send(err) : res.send(result);
    })
});
//---------------------------------------------------------

module.exports = router;