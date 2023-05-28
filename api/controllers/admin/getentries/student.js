var logger=require("../../../utils/log")(module);
const {StuPersonalDetails,Students,StudentSem,MarksheetProofs}=require("../../../models/students");
const {Degree,Subjects}=require("../../../models/comod");
const {azureBlobSaSUrl}=require("../../../utils/azureconfig");


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
module.exports={getSampleExcel}