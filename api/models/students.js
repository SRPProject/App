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

    semsubbelongs:{
        type:DataTypes.INTEGER,
        defaultValue:0,
        allowNull:false,
        validate:{notNull:true,notEmpty: true}
    },
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
    validate:{notNull:true,notEmpty: true }
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
    validate:{notNull:true,notEmpty: true }
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
const Workshops=sequelize.define("workshops",{
    id:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true},
    name:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    heldby:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    certificate:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    dateattended:{
        allowNull:false,
        type:DataTypes.DATEONLY,
        validate:{notNull:true,notEmpty: true }
    }
})

const ExtraCourses=sequelize.define("extracourses",{
    id:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true},
    name:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    certificate:{
            allowNull:false,
            type:DataTypes.TEXT,
            validate:{notNull:true,notEmpty: true }
    },
    duration:{//should be months
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{notNull:true,notEmpty: true }
    },
    typeofcourse:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },//NPTEL/MOORE/OTHERS

})

const EventHackathon=sequelize.define(("eventshackathon"),{
    id:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true},
    name:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    role:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{notNull:true,notEmpty: true}//( Organized/ Participated/ Won) - (1,2,3)
    },
   organizedBy:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    dateattended:{
        allowNull:false,
        type:DataTypes.DATEONLY,
        validate:{notNull:true,notEmpty: true }
    },
    certificate:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    participationlevel:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{notNull:true,notEmpty: true}
    } // (International/National/State/University/College)- (1,2,3,4,5)
})

const PaperPublished=sequelize.define("paperpublished",{
    id:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    authors:{ 
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    title:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    journalname:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    doilink:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    Category:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{notNull:true,notEmpty: true}
    } //- (SCI-E / SCI / Scopus / WOS / National / International Conference / Workshop / Symposium) - (1,2,3,4,5,6,7,8)
})

const HigherEducation=sequelize.define("highereducation",{
    id:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    universityname:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    yearofadmission:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{notNull:true,notEmpty: true}
    },
    specialization:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    },
    degreename:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }
    }
})
module.exports={StuPersonalDetails,Students,Scholarship,StudentSem,InternProjects,Placement,MarksheetProofs,Workshops,ExtraCourses,EventHackathon,PaperPublished,HigherEducation}



