var express = require('express');
var router = express.Router();
var db = require("../db");
var session =require("../services/sessions");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/:user/:project', function(req, res, next) {
    var options={order:[['clientTime','DESC']]};
    if(req.params.project!='all'){
        options.where={project:req.params.project};
    }
        
    db.Staging.findAll(options).then((rows) => {             
        res.render('stagingTable', { rows,project:req.params.project,user:req.params.user });
    }).catch((err)=>{next(err);});
    
    
});
router.get('/session', function(req, res, next) {
    
        
    db.Session.findAll().then((rows) => {             
        res.render('sessionTable', { rows,project:req.params.project,user:req.params.user });
    }).catch((err)=>{console.log("err");next(err);});
    
    
});
router.get('/week', function(req, res, next) {
    var test=session.validateSession("simon","backend").then(console.log("success")).catch((err)=>{console.log( err)});
    res.send(test);  
    
});

module.exports = router;
