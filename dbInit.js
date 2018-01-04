const db=require("./db");
db.sequelize.sync({
    force: true
}).then(() => {
    db.Category.create({name:"Default"}).then(() => {        
        console.log('success');
        process.exit(0);
    }).catch((error) => {
        console.error(error);
        process.exit(1);
    });    
}).catch((error) => {
    console.error(error);
    process.exit(1);
});