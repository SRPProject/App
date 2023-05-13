var logger = require("../../../utils/log")(module);
const sequelize = require("../../../config/dbconnection");
const {containerClient}=require("../../../utils/azureconfig");
var {StudentSem,MarksheetProofs}=require("../../../models/students");

const updatesem=async(req,res)=>{
    try{
        
        const studentId = res.locals._id 
        
        const marr=res.locals.marks;
        var updatearr=[]
        for(let i=0;i<marr.length;i++){
            let getrow=await StudentSem.findOne({where : {subjectSubid:marr[i].subjectSubid , studentStId:studentId}})
            
            if(getrow===null){
                return res.status(400).send({message:"Subject Id : "+marr[i].subjectSubid +" doesn't belongs to!"});
            }
            else{//to give previlege (variable) by 'or' operator 
                updatearr.push(`UPDATE studentsems
                SET scoredgrade=${marr[i].scoredgrade}, attempts=${getrow.attempts+1},monthyrpass='${marr[i].monthyrpass}' 
                WHERE id=${getrow.id};`
                )
            }
        }

        for(let i=0;i<updatearr.length;i++){
            await sequelize.query(updatearr[i]);
        }

        return res.status(200).send({message:"Marks has been updated !!"});
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error"});
    }
}

const uploadMarkSheet=async(req,res)=>{
    try {
        console.log(req.body.semno)
        const getmarksheet=await MarksheetProofs.findOne({
            where:{
                studentStId:res.locals._id,
                semno:req.body.semno
            }
        })
        if(getmarksheet && getmarksheet.status==0){
            const blobname=res.locals._id+"_sem"+req.body.semno+"_"+Date.now()+".pdf";
            const blockBlobClient = containerClient("marksheetproofs").getBlockBlobClient(blobname);
            const data =req.file.buffer;
            await blockBlobClient.upload(data, data.length);
            await getmarksheet.update({
                marksheetname:blobname,
                status:1,
            })
            return res.status(200).send({message:"Mark sheet uploaded!"})
        }
        else{
            return res.status(400).send({message:"Mark sheet already updated! or Invalid Request"});
        }

    } catch (err) {
        logger.error(err);
        return res.status(500).send({message:"Server Error"});
    }
}
module.exports={updatesem,uploadMarkSheet};