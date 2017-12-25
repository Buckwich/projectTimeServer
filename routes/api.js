var express = require('express');
var router = express.Router();
var db = require("../db");
var debug = require('debug')('projecttimeserver:routes:api');
var session =require("../services/sessions");
/* GET users listing. */
router.post('/:user/:project', async function(req, res, next) {

    try{
        debug(req.body);
        await db.Staging.create({
            type:req.body.type,
            comment:req.body.comment,
            user:req.params.user,
            project:req.params.project,
            clientTime:req.body.time||Date.now()
        });
        var code = await session.validateSession(req.params.user,req.params.project);
        res.sendStatus(code);
    }
    catch(err){
        console.log(err)
        res.sendStatus(err);
    }
    
});

module.exports = router;
