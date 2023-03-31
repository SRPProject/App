
// const Sequelize = require("sequelize");
const sequelize = require("../config/dbconnection");
var DataTypes = require('sequelize/lib/data-types');

const {Departments,Degree,Regulation,Subjects,Batch}=require("./comod");
const {StuPersonalDetails,Students,Scholarship,StudentSem,InternProjects,Placement}=require("./students");


const Admin = sequelize.define("dist_admin", {
  adminid : {
    allowNull:false,
    type: DataTypes.INTEGER,
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
    validate:{notNull:true,notEmpty: true }//wont allow null
  }
},{
  freezeTableName: true
});


const Faculty=sequelize.define("faculties",{
  facid:{
    allowNull:false,
    type: DataTypes.INTEGER,
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
    type:DataTypes.TEXT,
  },
  iscreated:{type:DataTypes.BOOLEAN,defaultValue:'0'}  
},{
  freezeTableName: true,
})

const Verification=sequelize.define("verification",{
  verifyId:{
    allowNull:false,
    type: DataTypes.INTEGER,
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

//Relationship

Departments.hasOne(Admin);
Admin.belongsTo(Departments);

Departments.hasOne(Faculty);
Faculty.belongsTo(Departments);
//Departments - Students one to many
Departments.hasMany(Students);
Students.belongsTo(Departments);

//Students - StuPersonalDetails one to one
Students.hasOne(StuPersonalDetails);
StuPersonalDetails.belongsTo(Students);

//Students - Scholarhsip one to many
Students.hasMany(Scholarship);
Scholarship.belongsTo(Students);

//Students - InternProjects one to many
Students.hasMany(InternProjects);
InternProjects.belongsTo(Students);

// //Students-StudentSem  one to Many
// Students.hasMany(StudentSem);
// StudentSem.belongsTo(Students);

//Placement - Student one to one
Students.hasOne(Placement);
Placement.belongsTo(Students);

//Batch - Student one to many
Batch.hasMany(Students);
Students.belongsTo(Batch);

//Degree - Students one to many
Degree.hasMany(Students);
Students.belongsTo(Degree);

//Regulation - Students one to many
Regulation.hasMany(Students);
Students.belongsTo(Regulation);

//Subjects - Students many to many through StudentSem
Subjects.belongsToMany(Students,{through:"studentsems"})
Students.belongsToMany(Subjects,{through:"studentsems"});




//Regulation - subjects one to many
Regulation.hasMany(Subjects);
Subjects.belongsTo(Regulation)

//Degree - Subjects one to many
Degree.hasMany(Subjects);
Subjects.belongsTo(Degree);

//Departments - Subjects one to many
Departments.hasMany(Subjects);
Subjects.belongsTo(Departments);



module.exports={Admin,Faculty,Verification}