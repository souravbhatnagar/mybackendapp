const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
    host: process.env.RDS_HOSTNAME,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    dialect: 'mysql',
    database: 'mynode_db',
  });

module.exports = sequelize;
