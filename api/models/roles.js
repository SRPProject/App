
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
      validate:{isEmail:true,notNull:true,notEmpty: true}
     
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

const Verification=sequelize.define("verification",{
  verifyId:{
    allowNull:false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  linkCode:{
    allowNull:false,
    type:DataTypes.TEXT,
    validate:{notNull:true,notEmpty: true }//wont allow null
  },
  mail:{
    type:DataTypes.TEXT,
    allowNull:false,
    unique:true,
    validate:{isEmail:true,notNull:true,notEmpty: true}
   
},
  expireTime:{
    allowNull:false,
    type:DataTypes.TEXT,
    validate:{notNull:true,notEmpty: true }
  }

},{
  freezeTableName: true
  })
// Admin.hasOne(Verification);
// Verification.belongsTo(Admin);
module.exports={Admin,Verification}