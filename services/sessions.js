var db = require("../db");



var validateSession=function (user,project){
    return new Promise ( async (resolve,reject) => {
        try{

        
            var rows = await db.Staging.findAll({where:{user,project},order:[['clientTime','DESC']]});               
            
            var start= rows.find((row)=>{
                return row.type=="start"             
            });
            var end= rows.find((row)=>{
                return row.type=="stop"             
            });
            if(start&&end){
                var startTime=start.clientTime;
                var endTime=end.clientTime;
            
                var markers=[];
                rows.forEach(row => {
                    if(row.clientTime<=endTime){
                        if(row.comment){
                            markers.push({title:row.comment,time:row.clientTime});
                        }                    
                        row.destroy();
                    }
                }); 
    
                var test=await db.Session.create({user,project,start:startTime, end:endTime,markers},{include:[db.Marker]});
                console.log("complete");
                resolve(201);
            }
            else{
                resolve(202);
            }
            
           
            
        }  
        catch(err){
            console.log(err)
            reject(409);
        }  
    })       
}
module.exports = {validateSession};