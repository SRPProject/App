var logger = require("../../../utils/log")(module);

const {Subjects,Degree}=require("../../../models/comod");
const {InternProjects,Placement,StuPersonalDetails,Scholarship,Students,MarksheetProofs}=require("../../../models/students")
const {containerClient,azureBlobSaSUrl}=require("../../../utils/azureconfig");

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
        const getScholarship=await Scholarship.findOne({where:{studentStId:res.locals._id}})
        if(getScholarship){
            const scholarshipPDFURL=await azureBlobSaSUrl("scholarshiproofs",getScholarship.proofname);
            return res.status(200).send({message:getScholarship,scholarshippdf:scholarshipPDFURL});
            /* Getting Pdf as stream of bytes*/
            // const blockBlobClient = containerClient("scholarshiproofs").getBlockBlobClient(getScholarship.proofname);
            // const downloadBlockBlobResponse = await blockBlobClient.download();
            // const downloaded = (
            //   await streamToText(downloadBlockBlobResponse.readableStreamBody)
            // ).toString();           
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



const getSubjects=async(req,res)=>{
    try{
         //type of subjects==>1 compulsory,2 professional elective ,3 humanities elective,4 audit
         //getting Degree id ,regulation id and dept id of student
         //fetching subjects of students 
         
         var condt="";
         const getStdDetails=await Students.findOne({where:{st_id:res.locals._id}});
         if(getStdDetails && req.query.typeofsub ){
            condt={
                typeofsub:req.query.typeofsub,
                regulationRegid:getStdDetails.regulationRegid,
                degreeDegid:getStdDetails.degreeDegid,
                distDepartmentDeptid:getStdDetails.distDepartmentDeptid
            }
            if(Number(req.query.typeofsub)===3){
                condt.distDepartmentDeptid=6;//English Departments
            }
            const Subs=await Subjects.findAll({where:condt});
            if(Subs){
                return res.status(200).send({message:Subs});
            }
            else{
                return res.status(400).send({message:"No entries found!"});
            }
         }
        else{
            return res.status(400).send({message:"Are u invalid ?"});
        }
    }catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again."});
    }
}

const getMarkSheet=async(req,res)=>{
    try{
        if(req.query.semno){
            const SemMarkSheet=await MarksheetProofs.findOne({where:{studentStId:res.locals._id,semno:req.query.semno}});
            if(SemMarkSheet){
               
                const marksheetURL=await azureBlobSaSUrl("marksheetproofs",SemMarkSheet.marksheetname);

                return res.status(200).send({message:marksheetURL});
                
            }
            else{
                return res.status(400).send({message:"No entry found.."});
            }
        }
        else{
            return res.status(400).send({message:"Invalid Semester No."});
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again."});
    }
}
module.exports={getInterndetails,getplacement,getPersonalDetails,getScholarship,studentsemscount,getSubjects,getMarkSheet}