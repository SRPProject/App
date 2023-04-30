var logger = require("../../../utils/log")(module);
const {Students}=require("../../../models/students");

const {Subjects}=require("../../../models/comod");

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

        return res.status(200).send({message:getstdsubs});

    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again."});
    }
}
module.exports={getstudentsem}