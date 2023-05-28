var logger=require("../../../utils/log")(module);
const {StuPersonalDetails,Students,StudentSem,MarksheetProofs,Scholarship}=require("../../../models/students");
const {Degree,Subjects}=require("../../../models/comod");
const {azureBlobSaSUrl}=require("../../../utils/azureconfig");
const { Op } = require("sequelize");
const sequelize = require("../../../config/dbconnection");



const getSampleExcel=async(req,res)=>{
    try{
        const sampleExcelURL=await azureBlobSaSUrl("sampledocs","stupr.xlsx");
        return res.status(200).send({message:sampleExcelURL});
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }
}

//Report Generation
//Scholarship report
const getStudentScholarship=async(req,res)=>{
    try{
        let rq=req.query;
        if(rq.batchId && rq.degreeDegid && rq.regulationRegid && rq.distDepartmentDeptid ){//should be in req.query parameters
            
            const getScholarshipReport=await sequelize.query(
                `
                    select tb.firstname as firstname,tb.lastname as lastname,tb.community as community,tb.regnum as rollnumber,tb.mail as mailid ,scholarships.name as scholarshipname,scholarships.amount as scholarshipamount,scholarships.proofname as fileURL
                    from (
                        (select studentpersonal.firstname,studentpersonal.lastname,studentpersonal.community,sttb.st_id,sttb.regnum,sttb.mail 
                            from 
                                (select st_id,regnum,mail from "students"  where "students"."distDepartmentDeptid"=${rq.distDepartmentDeptid} and "students"."batchId"=${rq.batchId} and "students"."degreeDegid"=${rq.degreeDegid} and "students"."regulationRegid"=${rq.regulationRegid}) as sttb 
                                inner join studentpersonal on sttb.st_id=studentpersonal."studentStId" )
                    as tb inner join "scholarships" on tb."st_id"=scholarships."studentStId" 
                    );
                `
                /*
                Query Explanation (from inner sub-query to outer level-query):

                1.getting st_id from 'students table' with spcific batch ,dept, regulation and degree -- named as sttb
                2.Joining 'sttb' table and studentpersonal table to get firstname,lastname etc... -- named as tb
                3.Joining 'tb' table and scholarships to get scholarships details etc...
                
                */
            )
            for(let i=0;i<getScholarshipReport[0].length;i++){
                getScholarshipReport[0][i]["fileurl"]=await azureBlobSaSUrl("scholarshiproofs",getScholarshipReport[0][i]["fileurl"]);
            }
            return res.status(200).send({message:getScholarshipReport[0]});
        }
        else{
            return res.status(400).send({message:"Invalid Parameters"})
        }
        

       

        
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }
}
module.exports={getSampleExcel,getStudentScholarship}