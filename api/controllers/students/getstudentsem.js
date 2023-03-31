var logger = require("../../utils/log")(module);
const {StuPersonalDetails,Students,Scholarship,StudentSem,InternProjects,Placement}=require("../../models/students");

const {Departments,Regulation,Degree,Subjects,Batch}=require("../../models/comod");

const getstudentsem=async (req,res)=>{
    try{
        // const sstid=res.locals.id;//need to change 
        const stid=4;
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