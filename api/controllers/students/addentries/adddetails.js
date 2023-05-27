var logger = require("../../../utils/log")(module);
const { Degree } = require("../../../models/comod");
var {Scholarship,InternProjects,Placement, StudentSem, Students}=require("../../../models/students");
const {containerClient}=require("../../../utils/azureconfig");



const addintern=async(req,res)=>{
    try{
        const entry={
            inname: req.body.inname,
            fromperiod: new Date(req.body.fromperiod),
            toperiod:new Date(req.body.toperiod),
            details:req.body.details,
            studentStId:Number(res.locals._id)
            
        }
        await InternProjects.create(entry);
        return res.status(200).send({message:"Intern details added"});
    }
    catch(err){
        logger.error(err.message);
        return res.status(500).send({message:"Server Error"});
    }
}

const addplacement=async(req,res)=>{
    try{
        const entry={
            compname:req.body.compname,
            selection:req.body.selection,
            salary:Number(req.body.salary),
            comptype:req.body.comptype,
            studentStId:Number(res.locals.id)
        }
        await Placement.create(entry);
        return res.status(200).send({message:"Placement Details added !!"});

    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error"});
    }
}
const addscholarship=async(req,res)=>{
    try{
        const blobname=res.locals._id+"_scholarship"+req.body.ryear+"_"+Date.now()+".pdf";
        const blockBlobClient = containerClient("scholarshiproofs").getBlockBlobClient(blobname);
        const data =req.file.buffer;
        await blockBlobClient.upload(data, data.length);
        const entry={
            name:req.body.name,
            ryear:Number(req.body.ryear),
            amount:Number(req.body.amount),
            studentStId:Number(res.locals._id),
            proofname:blobname
        }
        await Scholarship.create(entry);
        return res.status(200).send({message:"Added Successfully"});


    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error"});
    }
}

const addSubElectives=async(req,res)=>{
    try{
        //adding electives subjects into student sem table
        const getStd=await Students.findByPk(res.locals._id);
        const getDeg=await Degree.findByPk(getStd.degreeDegid);
        console.log(getDeg);
        const MaxSem=await getDeg.noofsems;
        if(req.body.semsubbelongs>=1 && req.body.semsubbelongs<=MaxSem){
            const entry={
                subjectSubid:req.body.subjectSubid,
                studentStId:res.locals._id,
            }
            const stdSems=await StudentSem.findOne({where:entry});
            if(stdSems===null){
                entry.semsubbelongs=req.body.semsubbelongs;
    
                logger.info(entry);
                await StudentSem.create(entry);
    
                return res.status(200).send({message:"Subject added Successfully"});
    
            }
            else{
                return res.status(400).send({message:"Already Exists"});
            }
        }
        else{
            return res.status(400).send({message:"Invalid Semester No"});
        }
        
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error"});
    }
}
module.exports={addintern,addplacement,addscholarship,addSubElectives}