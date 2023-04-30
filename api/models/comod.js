const sequelize = require("../config/dbconnection");
var DataTypes = require('sequelize/lib/data-types');

const Departments=sequelize.define("dist_departments",{
    deptid:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    deptname:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }//wont allow null
    }
},{
    freezeTableName: true
})


const Regulation =sequelize.define("regulations",{
    regid:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    regyear:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{notNull:true,notEmpty: true}
    }
},{
    freezeTableName: true
})

const Degree=sequelize.define("degrees",{
    degid:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    degname:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }//wont allow null
    },
    noofsems:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{notNull:true,notEmpty: true}
    
    }
},{
    freezeTableName: true
})


const Subjects=sequelize.define("subjects",{
    subid:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    credit:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{notNull:true,notEmpty: true}
    
    },
    subcode:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }//wont allow null
    },
    subname:{
        allowNull:false,
        type:DataTypes.TEXT,
        validate:{notNull:true,notEmpty: true }//wont allow null
    },
    typeofsub:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{notNull:true,notEmpty: true}
    
    },
    semsubbelongs:{
        type:DataTypes.INTEGER,
    }
},{
    freezeTableName: true
})
const Batch=sequelize.define("batches",{
    id:{
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startyr:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{notNull:true,notEmpty: true}
    
    },
    endyr:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{notNull:true,notEmpty: true}
    }
},{
    freezeTableName: true
})




//type of subjects==>1 compulsory,2 professional elective ,3 humanities elective,4 audit 
module.exports={Departments,Regulation,Degree,Subjects,Batch}