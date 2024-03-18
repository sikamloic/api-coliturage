const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: config.mysql.host,
  port: config.mysql.port,
  dialect: 'mysql',
  dialectModule: require('mysql2')
});

module.exports = sequelize;