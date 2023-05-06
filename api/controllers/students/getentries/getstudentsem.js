var logger = require("../../../utils/log")(module);
const {Students}=require("../../../models/students");

const {Subjects}=require("../../../models/comod");
const sequelize = require("sequelize");

// to be implemented : get all subjects of students of semester !!

const getstudentsem=async (req,res)=>{
    
    try{
        const stid=res.locals.id;

        const getstdsubs=await Students.findAll({
            where:{st_id:stid},
            include:{
                model: Subjects,
                through: { attributes: [] } 
            }
        })

       // console.log(getstdsubs)
        return res.status(200).send({message:getstdsubs});

    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again."});
    }
}
module.exports={getstudentsem}