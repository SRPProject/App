const sequelize = require("../config/dbconnection");
var DataTypes = require("sequelize/lib/data-types");

const { Departments, Degree, Regulation, Subjects, Batch } = require("./comod");
const {
  StuPersonalDetails,
  Students,
  Scholarship,
  StudentSem,
  Internships,
  Placement,
  MarksheetProofs,
  Workshops,
  ExtraCourses,
  EventHackathon,
  PaperPublished,
  Projects,
  HigherEducation,
} = require("./students");


const Admin = sequelize.define(
  "dist_admin",
  {
    adminid: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mail: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: { isEmail: true, notNull: true, notEmpty: true },
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: { notNull: true, notEmpty: true }, //wont allow null
    },
  },
  {
    freezeTableName: true,
  },
);

const Faculty = sequelize.define(
  "dist_faculty",
  {
    facultyId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mail: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: { isEmail: true, notNull: true, notEmpty: true },
    },
    password: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.TEXT,
    },
    isCreated : {
       type: DataTypes.BOOLEAN ,
       defaultValue : false 
    }
  },
  {
    freezeTableName: true,
  },
);


const studentVerification = sequelize.define(
  "student_verification",
  {
    status: {
      type: DataTypes.BOOLEAN,
    },
    isRejected: {
      type: DataTypes.BOOLEAN,
    },
    proofLink: {
      type: DataTypes.CHAR(400), // link to azure
    },
  },

);

/////////////////////// newly added

Faculty.hasMany(Students);
Students.belongsTo(Faculty);

studentVerification.hasOne(Students)
Students.belongsTo(studentVerification)

studentVerification.hasOne(Scholarship)
Scholarship.belongsTo(studentVerification)


studentVerification.hasOne(MarksheetProofs)
MarksheetProofs.belongsTo(studentVerification)
// studentVerification.hasOne(StudentSem)
// StudentSem.belongsTo(studentVerification)

studentVerification.hasOne(Internships)
Internships.belongsTo(studentVerification)

studentVerification.hasOne(Placement)
Placement.belongsTo(studentVerification)

studentVerification.hasOne(Workshops)
Workshops.belongsTo(studentVerification)

studentVerification.hasOne(ExtraCourses)
ExtraCourses.belongsTo(studentVerification)

studentVerification.hasOne(EventHackathon)
EventHackathon.belongsTo(studentVerification)

studentVerification.hasOne(PaperPublished)
PaperPublished.belongsTo(studentVerification)

studentVerification.hasOne(HigherEducation)
HigherEducation.belongsTo(studentVerification)

studentVerification.hasOne(Projects)
Projects.belongsTo(studentVerification)

//Batch - would store {start,end,regid,degreeId} // no need to store it in student 
// which was done previously 

///////////////////////// newly added

//link code : {mailId : "" , Role:"" , id: ""}

const Verification = sequelize.define(
  "verification",
  {
    linkCode :{
        type : DataTypes.TEXT  
    }
  },
  {
    freezeTableName: true,
  },
);


//Relationship

Departments.hasOne(Admin);
Admin.belongsTo(Departments);

// no need for this any more !!
// Departments.hasOne(Faculty);
// Faculty.belongsTo(Departments);

//Departments - Students one to many
// Departments.hasMany(Students);
// Students.belongsTo(Departments);

//Students - StuPersonalDetails one to one
Students.hasOne(StuPersonalDetails);
StuPersonalDetails.belongsTo(Students);

//Students - Scholarhsip one to many
Students.hasMany(Scholarship);
Scholarship.belongsTo(Students);

//Students - Internships one to many
Students.hasMany(Internships);
Internships.belongsTo(Students);

// //Students-StudentSem  one to Many
// Students.hasMany(StudentSem);
// StudentSem.belongsTo(Students);

//Placement - Student one to one
Students.hasOne(Placement);
Placement.belongsTo(Students);

//Batch - Student one to many
Batch.hasMany(Students);
Students.belongsTo(Batch);

//Batch - regulation -- one to many 
Regulation.hasMany(Batch)
Batch.belongsTo(Regulation)

//Batch - degree 
Degree.hasMany(Batch)
Batch.belongsTo(Degree)

//Degree - Students one to many
// Degree.hasMany(Students);
// Students.belongsTo(Degree);

// Regulation - Students one to many

// Regulation.hasMany(Students);
// Students.belongsTo(Regulation);

//Subjects - Students many to many through StudentSem
Subjects.hasMany(StudentSem)
Students.hasMany(StudentSem)

StudentSem.belongsTo(Subjects)
StudentSem.belongsTo(Students)

//Regulation - subjects one to many
Regulation.hasMany(Subjects);
Subjects.belongsTo(Regulation);

//Degree - Subjects one to many
Degree.hasMany(Subjects);
Subjects.belongsTo(Degree);

//Departments - Subjects one to many
// Departments.hasMany(Subjects);
// Subjects.belongsTo(Departments);

Students.hasMany(MarksheetProofs);
MarksheetProofs.belongsTo(Students);

//Faculty - Student one to many
Faculty.hasMany(Students);
Students.belongsTo(Faculty);

//Student - Workshops one to many relationship
Students.hasMany(Workshops);
Workshops.belongsTo(Students);



//Student - ExtraCourses one to many relationship
Students.hasMany(ExtraCourses);
ExtraCourses.belongsTo(Students);

//Student - EventHackathon
Students.hasMany(EventHackathon);
EventHackathon.belongsTo(Students);

//Student - PaperPublished one to many relationship
Students.hasMany(PaperPublished);
PaperPublished.belongsTo(Students);

//Student - HigherEducation one to  many relationship
Students.hasMany(HigherEducation);
HigherEducation.belongsTo(Students);

//Student - Projects one to many relationships
Students.hasMany(Projects);
Projects.belongsTo(Students);

module.exports = { Admin, Faculty, Verification, studentVerification  };
