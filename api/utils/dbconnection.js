// const dbConfig = require("../config/db.config.js");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "postgresql://skmei_i:v2_3zdfd_L8qxvquJH8DfRLshs2DhDBZ@db.bit.io:5432/skmei_i/distDb?sslmode=true",
);

module.exports = sequelize;

/*  LOCAL_DB 

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.development.host,
  dialect: dbConfig.development.dialect,
  dialectOptions:dbConfig.development.dialectOptions,
  port:5432,
  ssl:true
  // operatorsAliases: true,

  // pool: {
  //   max: dbConfig.pool.max,
  //   min: dbConfig.pool.min,
  //   acquire: dbConfig.pool.acquire,
  //   idle: dbConfig.pool.idle
  // }
});

*/
