var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/title/:id', function(req, res, next) {
  res.json({title: "title-" + req.params.id});
});

router.get('/content/:id', function(req, res, next) {
  res.json({titcontentle: "content-" + req.params.id});
});
module.exports = router;
