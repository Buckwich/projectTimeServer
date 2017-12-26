require('json5/lib/require');
const {db} = require('./config'); 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(db.db, db.user, db.password, {
host: db.host,
dialect: db.dialect,

pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
},

// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
operatorsAliases: false
});

const Staging = sequelize.define('staging', {
    type: Sequelize.STRING,
    comment: Sequelize.STRING,
    user:Sequelize.STRING,
    project:Sequelize.STRING,
    clientTime:Sequelize.DATE
});
const Session = sequelize.define('session', {
    project: {type: Sequelize.STRING,unique: "row"}, 
    user: {type: Sequelize.STRING,unique: "row"}, 
    start:{type: Sequelize.DATE,unique: "row"}, 
    end:{type: Sequelize.DATE,unique: "row"}
    // project: {type: Sequelize.STRING}, 
    // user: {type: Sequelize.STRING}, 
    // start:{type: Sequelize.DATE}, 
    // end:{type: Sequelize.DATE}
});
const Marker =  sequelize.define('marker', {
    title: Sequelize.STRING,      
    time:Sequelize.DATE   
});

Session.hasMany(Marker);
Marker.belongsTo(Session);
module.exports = {sequelize,Staging,Session,Marker};


