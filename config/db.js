const Sequelize = require('sequelize');
const db = new Sequelize('uptasknode', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    operatorAliases: false,
    define:{
        timestamps: false
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000
    }
});

module.exports = db;