var logger = require("../../../utils/log")(module);
const {Students}=require("../../../models/students");

const {Subjects}=require("../../../models/comod");

const sequelize = require("sequelize");

// to be implemented : get all subjects of students of semester !!

const getstudentsem=async (req,res)=>{
    
    try{
        const stid=res.locals._id;
        const semno=1;
        // const getstdsubs=await Students.findAll({
        //     where:{st_id:stid},
        //     include:{
        //         model: Subjects,
        //         through: { attributes: [] } 
        //       }
        // })
        const getstdsubs=await sequelize.query(`select * from studentsems as ss inner join subjects 
        on ss."subjectSubid" = "subjects"."subid" 
        where ss."studentStId"=${res.locals._id} and "subjects"."semsubbelongs"=${semno}
        `)
        return res.status(200).send({message:getstdsubs});

    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again."});
    }
}
module.exports={getstudentsem}