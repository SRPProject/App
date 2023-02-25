const Sequelize = require("sequelize");
const sequelize = require("../utils/dbconnection");
var DataTypes = require('sequelize/lib/data-types');

const Departments=sequelize.define("dist_departments",{
    dept_id:{
        primarykey:true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
    ,dept_name:{
        type:Sequelize.TEXT,
        allowNull:true,
    }
  
},{
    freezeTableName: true
})
module.exports={Departments}