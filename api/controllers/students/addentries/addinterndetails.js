var logger = require("../../../utils/log")(module);
var {Scholarship,InternProjects,Placement}=require("../../../models/students");
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
module.exports={addintern,addplacement,addscholarship}