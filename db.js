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
    //projectId: {type: Sequelize.INTEGER,unique: "row"}, //foreign key
    user: {type: Sequelize.STRING,unique: "row"}, 
    start:{type: Sequelize.DATE,unique: "row"}, 
    end:{type: Sequelize.DATE,unique: "row"}    
});
const Marker =  sequelize.define('marker', {
    title: Sequelize.STRING,      
    time:Sequelize.DATE   
});
const Category = sequelize.define('category',{
    name: Sequelize.STRING,
    color: Sequelize.STRING
});
const Project = sequelize.define('project',{
    name: {type:Sequelize.STRING},
    categoryId: {type:Sequelize.INTEGER,allowNull:false,defaultValue:1}
});
const User = sequelize.define('user',{
    name: {type:Sequelize.STRING}
});
Session.belongsTo(Project);
Project.hasMany(Session);

Session.hasMany(Marker);
Marker.belongsTo(Session);

Project.belongsTo(Category);
Category.hasMany(Project);

Project.belongsTo(User);
User.hasMany(Project);

module.exports = {sequelize,Staging,Session,Marker,Category,Project,User};


