var logger = require("../../../utils/log")(module);
const {Students}=require("../../../models/students");

const {Subjects}=require("../../../models/comod");
const {InternProjects,Placement}=require("../../../models/students")
const sequelize = require("sequelize");

const getInterndetails=async(req,res)=>{
    try{
        const stid=res.locals._id;
        const getIntern=await InternProjects.findAll({
            where :{studentStId:stid}
        })
       if(getIntern){
        return res.status(200).send({message:getIntern})
       }
        else{
            return res.status(400).send({message:"no data found!"})
        }
    }
    catch(err){
        logger.error(err);
        return  res.status(500).send({message:"Server Error Try again."})
    }
}


module.exports={getInterndetails}