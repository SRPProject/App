const DataTypes = require("sequelize");
const sequelize = require("../config/dbconnection");



// use hard coded values for sex,blood group,specialcategory,community,volunteer,accomodation(hostel/dayscholar)
const StuPersonalDetails=sequelize.define("studentpersonal",{
    sp_id:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    regnum:{
        type:DataTypes.BIGINT,
        allowNull:false,
        validate:{notNull:true,notEmpty: true},
    },
    sex:{type:DataTypes.CHAR},
    cutoffmark:{
        type:DataTypes.DECIMAL,
    },
    admittedon:{
        type:DataTypes.DATEONLY
    },
    firstname:{
    type:DataTypes.TEXT,
},
    lastname:{
    type:DataTypes.TEXT,
},
    dob:{
        type:DataTypes.DATEONLY
    },
    bloodgroup:{
    type:DataTypes.TEXT,
},
    specialcategory:{
    type:DataTypes.TEXT,
},
    community:{
    type:DataTypes.TEXT,
},
    volunteer:{
    type:DataTypes.TEXT,
},
    accomodation:{type:DataTypes.INTEGER},

    //parentDetails
    fathername:{
    type:DataTypes.TEXT,
},
    fatherjob:{
    type:DataTypes.TEXT,
},
    fatherincome:{type:DataTypes.INTEGER},

    mothername:{
    type:DataTypes.TEXT,
},
    motherjob:{
    type:DataTypes.TEXT,
},
    motherincome:{type:DataTypes.INTEGER},

    parentaddress:{
    type:DataTypes.TEXT,
},
    parentemail:{
    type:DataTypes.TEXT,
    validate:{isEmail:true}
},
    parentphonenum:{type:DataTypes.INTEGER},

    //localguard
    localgname:{
    type:DataTypes.TEXT,
},
    localgaddr:{
    type:DataTypes.TEXT,
},
    localgphone:{type:DataTypes.INTEGER},
    localgmail:{type:DataTypes.TEXT,validate:{isEmail:true}},
    isfilled:{type:DataTypes.BOOLEAN,defaultValue:'0'},

},

{
    freezeTableName: true
})
const Students=sequelize.define("students",{
    st_id:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mail:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{isEmail:true,notNull:true,notEmpty: true}
    },
    regnum:{
        type:DataTypes.BIGINT,
        allowNull:false,
        unique:true,
        validate:{notNull:true,notEmpty: true},
    },
    password:{type:DataTypes.TEXT},
    linkCode:{
        type:DataTypes.TEXT
    },
    total_sem : {
        type : DataTypes.INTEGER
    },
    expireTime:{
        type:DataTypes.TEXT,
    },
        iscreated:{type:DataTypes.BOOLEAN,defaultValue:'0'}//whether student setted his/her account
    },{
        freezeTableName: true
    })

const Scholarship=sequelize.define("scholarships",{
    id:{
    allowNull:false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
    name:{type:DataTypes.TEXT},
    ryear:{type:DataTypes.INTEGER},//year received 
    amount:{type:DataTypes.INTEGER},
    proofname:{type:DataTypes.TEXT},

},{
    freezeTableName: true
})


const StudentSem=sequelize.define("studentsems",{
    id:{
    allowNull:false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
    scoredgrade:{type:DataTypes.INTEGER,defaultValue:0},//store grade points eg: A+ 9 ,A - 8
    attempts:{type:DataTypes.INTEGER,defaultValue:0},//to maintain arrears
    monthyrpass:{
    type:DataTypes.DATEONLY
},//Month and year of passing if reattempted
    // for not alllowing any further iupdates 
    isVerified : {
        type:  DataTypes.BOOLEAN
    }
},{
    freezeTableName: true
})

const InternProjects=sequelize.define("internprojects",{
    id:{
    allowNull:false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
    inname:{
    allowNull:false,
    type:DataTypes.TEXT,
    validate:{notNull:true,notEmpty: true }//wont allow null
},
    fromperiod:{
    type:DataTypes.DATEONLY
},
    toperiod:{
    type:DataTypes.DATEONLY
},
    details:{
    allowNull:false,
    type:DataTypes.TEXT,
    validate:{notNull:true,notEmpty: true }//wont allow null
},

},{
    freezeTableName: true
    })

const Placement=sequelize.define("placements",{
    id:{
    allowNull:false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true},
    compname:{type:DataTypes.TEXT},
    selection:{type:DataTypes.BOOLEAN,defaultValue:'0'},//1- oncampus/ 0- off campus
    salary:{type:DataTypes.INTEGER},
    comptype:{type:DataTypes.TEXT}//service / product
})

const MarksheetProofs=sequelize.define("marksheets",{
    id:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true},
    semno:{
        allowNull:false,
        type: DataTypes.INTEGER},
    marksheetname:{type:DataTypes.TEXT},
    status:{
        type: DataTypes.INTEGER,
        defaultValue:Number(0)
    }
})

module.exports={StuPersonalDetails,Students,Scholarship,StudentSem,InternProjects,Placement,MarksheetProofs}



