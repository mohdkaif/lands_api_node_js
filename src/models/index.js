var dbConn = require('../../config/db.config');
const Sequelize = require("sequelize"); const sequelize = new Sequelize(dbConn.database, dbConn.user, dbConn.password, {
    host: dbConn.host,
    dialect: mysql,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
}); const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;