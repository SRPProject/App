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
                    )order by tb.regnum;
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

const getProjectReport=async(req,res)=>{
    try{
        let rq=req.query;
        if(rq.batchId && rq.degreeDegid && rq.regulationRegid && rq.distDepartmentDeptid ){
            
            const getProjectsReport=await sequelize.query(
                `
                    select  tb.regnum as rollnumber,tb.firstname as firstname,tb.lastname as lastname,projects.title as projecttitle,projects.guidename as guidename,projects.fromperiod as from,projects.toperiod as to,projects.sourcecodelink as sourcecode,projects.certificate as fileURL
                    from (
                        (select studentpersonal.firstname,studentpersonal.lastname,sttb.st_id,sttb.regnum
                            from 
                                (select st_id,regnum,mail from "students"  where "students"."distDepartmentDeptid"=${rq.distDepartmentDeptid} and "students"."batchId"=${rq.batchId} and "students"."degreeDegid"=${rq.degreeDegid} and "students"."regulationRegid"=${rq.regulationRegid}) as sttb 
                                inner join studentpersonal on sttb.st_id=studentpersonal."studentStId" )
                    as tb inner join "projects" on tb."st_id"=projects."studentStId"
                    )  order by tb.regnum;
                `
                
            )
            for(let i=0;i<getProjectsReport[0].length;i++){
                getProjectsReport[0][i]["fileurl"]=await azureBlobSaSUrl("projectsproofs",getProjectsReport[0][i]["fileurl"]);
            }
            return res.status(200).send({message:getProjectsReport[0]});
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }
}

const getInternshipsReport=async(req,res)=>{
    try{
        let rq=req.query;
        if(rq.batchId && rq.degreeDegid && rq.regulationRegid && rq.distDepartmentDeptid ){
            
            const getInternships=await sequelize.query(
                `
                    select  tb.regnum as rollnumber,tb.firstname as firstname,tb.lastname as lastname,internships.inname as companyname,internships.fromperiod as from,internships.toperiod as to,internships.details as details
                    from (
                        (select studentpersonal.firstname,studentpersonal.lastname,sttb.st_id,sttb.regnum
                            from 
                                (select st_id,regnum,mail from "students"  where "students"."distDepartmentDeptid"=${rq.distDepartmentDeptid} and "students"."batchId"=${rq.batchId} and "students"."degreeDegid"=${rq.degreeDegid} and "students"."regulationRegid"=${rq.regulationRegid}) as sttb 
                                inner join studentpersonal on sttb.st_id=studentpersonal."studentStId" )
                    as tb inner join "internships" on tb."st_id"=internships."studentStId" 
                    ) order by tb.regnum;
                `
                
            )
            return res.status(200).send({message:getInternships[0]});
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }
}
const getPlacementReport=async(req,res)=>{
    try{
        let rq=req.query;
        if(rq.batchId && rq.degreeDegid && rq.regulationRegid && rq.distDepartmentDeptid ){
            
            const getPlacements=await sequelize.query(
                `
                    select  tb.regnum as rollnumber,tb.firstname as firstname,tb.lastname as lastname,placements.compname as companyname,placements.selection as selection,placements.salary as salary,placements.comptype as comptype
                    from (
                        (select studentpersonal.firstname,studentpersonal.lastname,sttb.st_id,sttb.regnum
                            from 
                                (select st_id,regnum,mail from "students"  where "students"."distDepartmentDeptid"=${rq.distDepartmentDeptid} and "students"."batchId"=${rq.batchId} and "students"."degreeDegid"=${rq.degreeDegid} and "students"."regulationRegid"=${rq.regulationRegid}) as sttb 
                                inner join studentpersonal on sttb.st_id=studentpersonal."studentStId" )
                    as tb inner join "placements" on tb."st_id"=placements."studentStId" 
                    ) order by placements.salary;
                `
                
            )
            return res.status(200).send({message:getPlacements[0]});
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }

}
module.exports={getSampleExcel,getStudentScholarship,getProjectReport,getPlacementReport,getInternshipsReport}