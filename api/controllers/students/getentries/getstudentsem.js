var logger = require("../../../utils/log")(module);
const {Students}=require("../../../models/students");

const {Subjects}=require("../../../models/comod");

const sequelize = require("../../../config/dbconnection")

// to be implemented : get all subjects of students of semester !!

const getstudentsem=async (req,res)=>{
    
    try{
        const stid=res.locals._id;
        const semno= 1;

        if(semno){
            const getstdsubs=await sequelize.query(`select 
                ss.scoredgrade,
                ss.attempts,
                ss.monthyrpass,
                ss.semsubbelongs,
                subjects.subid,
                subjects.credit,
                subjects.subcode,
                subjects.subname,
                subjects.typeofsub 
                    from studentsems as ss inner join subjects 
                    on ss."subjectSubid" = "subjects"."subid" 
                    where ss."studentStId"=${res.locals._id} and "ss"."semsubbelongs"=${semno}
            `)
            return res.status(200).send({message:getstdsubs[0]});
        }
        else{
            return res.status(200).send({message:"semester not valid"});
        }
        // const getstdsubs=await Students.findAll({
        //     where:{st_id:stid},
        //     include:{
        //         model: Subjects,
        //         through: { attributes: [] } 
        //       }
        // })
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again."});
    }
}
const getStdMarkSheet=async (req,res)=>{
    try{
        
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again."});   
    }
}
module.exports={getstudentsem}