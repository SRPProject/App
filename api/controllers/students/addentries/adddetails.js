var logger = require("../../../utils/log")(module);
const { Degree } = require("../../../models/comod");
var {Scholarship,InternProjects,Placement, StudentSem, Students,Workshops,ExtraCourses,EventHackathon,PaperPublished,HigherEducation}=require("../../../models/students");
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
const addWorkshops=async(req,res)=>{
    try{

        let entry={
            name:req.body.name,
            heldby:req.body.heldby,
            dateattended:req.body.dateattended,
            studentStId:res.locals._id

        }
        
        const checkExists=await Workshops.findOne({where:entry})
        if(checkExists){
            return res.status(400).send({message:"Already exists."})
        }
        else{
            const blobname=res.locals._id+"_workshop_"+Date.now()+".pdf";
            const blockBlobClient = containerClient("workshopcertificates").getBlockBlobClient(blobname);
            const data =req.file.buffer;
            await blockBlobClient.upload(data, data.length);
            entry.certificate=blobname;
           

            await Workshops.create(entry);
            return res.status(200).send({message:"Added Successfully!"});
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }
}
const addExtraCourses=async(req,res)=>{
    try{
        let entry={
            name:req.body.name,
            duration:req.body.duration,
            typeofcourse:req.body.typeofcourse,
            studentStId:res.locals._id
        }
        const checkExists=await ExtraCourses.findOne({where:entry})
        if(checkExists){
            return res.status(400).send({message:"Already exists."})
        }
        else{
            const blobname=res.locals._id+"_extracourse_"+Date.now()+".pdf";
            const blockBlobClient = containerClient("extracourseproofs").getBlockBlobClient(blobname);
            const data =req.file.buffer;
            await blockBlobClient.upload(data, data.length);
            entry.certificate=blobname;
            await ExtraCourses.create(entry);
            return res.status(200).send({message:"Added Successfully!"});
        }


    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }
}
const addPaperPublishing=async(req,res)=>{
    try{
        let entry={
            authors:req.body.authors,
            title:req.body.title,
            journalname:req.body.journalname,
            doilink:req.body.doilink,
            Category:Number(req.body.Category),//- (SCI-E / SCI / Scopus / WOS / National / International Conference / Workshop / Symposium) - (1,2,3,4,5,6,7,8)
            studentStId:res.locals._id,
        }
        const checkExists=await PaperPublished.findOne({where:entry});
        if(checkExists){
            return res.status(400).send({message:"Already exists."})
        }
        else{
            await PaperPublished.create(entry);
            return res.status(200).send({message:"Added Successfully!"});
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }
}

const addHigherEducation=async(req,res)=>{
    try{
        let entry={
            universityname:req.body.universityname,
            yearofadmission:Number(req.body.yearofadmission),
            specialization:req.body.specialization,
            degreename:req.body.degreename,
            studentStId:res.locals._id,
        }
        const checkExists=await HigherEducation.findOne({where:entry});
        if(checkExists){
            return res.status(400).send({message:"Already exists."})
        }
        else{
            await HigherEducation.create(entry);
            return res.status(200).send({message:"Added Successfully!"});
        }
    }
    catch(err)
    {
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }
}

const addEventHackathon=async(req,res)=>{
    try{
        let entry={
            name:req.body.name,
            role:Number(req.body.role),//( Organized/ Participated/ Won) - (1,2,3)
            organizedBy:req.body.organizedBy,
            dateattended:req.body.dateattended,
            participationlevel:Number(req.body.participationlevel),// (International/National/State/University/College)- (1,2,3,4,5)
            studentStId:res.locals._id,
        }
        const checkExists=await EventHackathon.findOne({where:entry})
        if(checkExists){
            return res.status(400).send({message:"Already exists."})
        }
        else{
            const blobname=res.locals._id+"_eventhackathon_"+Date.now()+".pdf";
            const blockBlobClient = containerClient("eventhackathonproofs").getBlockBlobClient(blobname);
            const data =req.file.buffer;
            await blockBlobClient.upload(data, data.length);
            entry.certificate=blobname;
            
            await EventHackathon.create(entry);
            return res.status(200).send({message:"Added Successfully!"});

        }

    }
    catch(err)
    {
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }

}
module.exports={addintern,addplacement,addscholarship,addSubElectives,addWorkshops,addExtraCourses,addPaperPublishing,addHigherEducation,addEventHackathon}