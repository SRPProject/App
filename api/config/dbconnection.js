const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgresql://skmei_i:v2_3zdfd_L8qxvquJH8DfRLshs2DhDBZ@db.bit.io:5432/skmei_i/distDb?sslmode=true");
module.exports = sequelize;