const Sequelize = require('sequelize');
const sequelize = new Sequelize('projectTime', 'projectTime', '12345678', {
host: 'localhost',
dialect: 'postgres',

pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
},

// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
operatorsAliases: false
});

const Tag = sequelize.define('tag', {
type: Sequelize.STRING,
comment: Sequelize.STRING,
user:Sequelize.STRING,
project:Sequelize.STRING,
clientTime:Sequelize.DATE
});
module.exports = {sequelize,Tag};


