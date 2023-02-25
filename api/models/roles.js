
const Sequelize = require("sequelize");
const sequelize = require("../utils/dbconnection");
var DataTypes = require('sequelize/lib/data-types');
const {Departments}=require('./module')
const Admin = sequelize.define("dist_admin", {
  admin_id : {
    allowNull:false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  mail:{
      type:DataTypes.TEXT,
      allowNull:false,
      unique:true,
      validate:{isEmail:true}
     
  },
  password:{
    allowNull:false,
    type:DataTypes.TEXT,
  }  
},{
  freezeTableName: true
  }
);
Departments.hasOne(Admin);
Admin.belongsTo(Departments);
module.exports={Admin}