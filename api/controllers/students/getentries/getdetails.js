var logger = require("../../../utils/log")(module);
const {Students}=require("../../../models/students");

const {Subjects}=require("../../../models/comod");
const {InternProjects,Placement,StuPersonalDetails}=require("../../../models/students")
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
            return res.status(400).send({message:"invalid"})
        }
    }
    catch(err){
        logger.error(err);
        return  res.status(500).send({message:"Server Error Try again."})
    }
}

const getplacement=async(req,res)=>{
    try{
        const stid=res.locals._id;
        const getplacement=await Placement.findAll({
            where:{studentStId:stid}
        })
        if(getplacement){
            return res.status(200).send({message:getplacement})
        }
        else{
            return res.status(400).send({message:"invalid"})
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again."})
    }
}

const getPersonalDetails=async(req,res)=>{
    try{
        const stid=res.locals._id;
        const getPersonal=await StuPersonalDetails.findOne({where:{studentStId:stid}})
        if(getPersonal){
            return res.status(200).send({message:getPersonal})
        }
        else{
            return res.status(400).send({message:"invalid"})
        }

    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again."})
    }
}

module.exports={getInterndetails,getplacement,getPersonalDetails}