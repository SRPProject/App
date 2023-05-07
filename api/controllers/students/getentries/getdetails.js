var logger = require("../../../utils/log")(module);

const {Subjects,Degree}=require("../../../models/comod");
const {InternProjects,Placement,StuPersonalDetails,Scholarship,Students}=require("../../../models/students")
const {containerClient}=require("../../../utils/azureconfig");

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

async function streamToText(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
      data += chunk;
    }
    return data;
}

const getScholarship=async(req,res)=>{
    try{
        const stid=res.locals._id;
        const getScholarship=await Scholarship.findOne({where:{studentStId:stid}})
        if(getScholarship){
            const blockBlobClient = containerClient("scholarshiproofs").getBlockBlobClient(getScholarship.proofname);
            const downloadBlockBlobResponse = await blockBlobClient.download();
            const downloaded = (
              await streamToText(downloadBlockBlobResponse.readableStreamBody)
            ).toString();
            return res.status(200).send({message:getScholarship,scholarshippdf:downloaded});
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
const studentsemscount=async(req,res)=>{
    try{
        const getStd=await Students.findByPk(res.locals._id);

        const semcount=(getStd)?await Degree.findByPk(getStd.degreeDegid):"";
        if(semcount){
            return res.status(200).send({message:semcount.noofsems});
        }
        else{
            return res.status(200).send({message:"invalid"});
        }
        
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server error!"});
    }
}

module.exports={getInterndetails,getplacement,getPersonalDetails,getScholarship,studentsemscount}