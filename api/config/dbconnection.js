const { Sequelize } = require("sequelize");
const dbConfig = require("./db.config");

const sequelize = new Sequelize("srp", "postgres", "kumaran", {
  host: "127.0.0.1",
  dialect: "postgres",
  port: 5432,
});

const migrate = ()=>{
  sequelize.sync().then(function(){
    return sequelize.drop({});
 })
}

//migrate() 

module.exports = sequelize;
