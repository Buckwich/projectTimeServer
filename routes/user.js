var express = require('express');
var router = express.Router();
var db = require("../db");
var moment = 

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/:user/:project', function(req, res, next) {
    let options={order:[['clientTime','DESC']]};
    if(req.params.project!='all'){
        options.where={project:req.params.project};
    }
        
    db.Tag.findAll(options).then((rows)=>{             
        res.render('table', { rows,project:req.params.project,user:req.params.user });
    }).catch((err)=>{next(err);});
    
    
});

module.exports = router;
