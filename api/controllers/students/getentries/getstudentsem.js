var logger = require("../../../utils/log")(module);
const {Students}=require("../../../models/students");

const {Subjects}=require("../../../models/comod");

const sequelize =require("../../../config/dbconnection");

// to be implemented : get all subjects of students of semester !!

const getstudentsem=async (req,res)=>{
    
    try{

        // const getstdsubs=await Students.findAll({
        //     where:{st_id:stid},
        //     include:{
        //         model: Subjects,
        //         through: { attributes: [] } 
        // select * from studentsems as a inner join subjects as b 
        // on a."subjectSubid" = b."subid"
        // where a."studentStId"=${res.locals._id} and b."semsubbelongs"=${semno}
        //       }
        // })

        const stid=res.locals._id;
        const semno= !req.query.semno?1:req.query.semno;

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

        // const data=await sequelize.query(` 

        //     select credit,subcode,scoredgrade,subname,typeofsub,subid,attempts,monthyrpass from studentsems a , subjects b 
        //     where 
        //     (a."subjectSubid" = b."subid" 
        //     and 
        //     a."studentStId" = ${res.locals._id} 
        //     and 
        //     b."semsubbelongs" = 1 )
        //     order by b."typeofsub"

        // `)

        

        return res.status(200).send({message:data[0]});

    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again."});
    }
}
module.exports={getstudentsem}