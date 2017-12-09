var express = require('express');
var router = express.Router();
var db = require("../db");
var debug = require('debug')('projecttimeserver:routes:api');
/* GET users listing. */
router.post('/:user/:project', function(req, res, next) {
    debug(req.body);
    db.Tag.create({
        type:req.body.type,
        comment:req.body.comment,
        user:req.params.user,
        project:req.params.project,
        clientTime:req.body.time||Date.now()
    });
    res.send('ok');
});

module.exports = router;
