var logger = require("../../../utils/log")(module);
const sequelize = require("../../../config/dbconnection");
const {containerClient}=require("../../../utils/azureconfig");
var {StudentSem,MarksheetProofs}=require("../../../models/students");

const updatesem=async(req,res)=>{
    try{
      
        // const arr={"studentStId":2,marks:[{"subjectSubid":32 ,"scoredgrade":10,"monthyrpass":"2020/1/1"},{"subjectSubid":33 ,"scoredgrade":10,"monthyrpass":"2020/1/1"},{"subjectSubid":34 ,"scoredgrade":10,"monthyrpass":"2020/1/1"}]}
        const marr=res.locals.marks;
        var updatearr=[]
        for(let i=0;i<marr.length;i++){
            let getrow=await StudentSem.findOne({where : {subjectSubid:marr[i].subjectSubid , studentStId:res.locals._id}})
            
            if(getrow===null){
                return res.status(400).send({message:"Subject Id : "+marr[i].subjectSubid +" doesn't belongs to!"});
            }
            else if(getrow.scoredgrade===0 ){//to give previlege (variable) by 'or' operator 
                updatearr.push(`UPDATE studentsems
                SET scoredgrade=${marr[i].scoredgrade}, attempts=${getrow.attempts+1},monthyrpass='${marr[i].monthyrpass}' 
                WHERE id=${getrow.id};`
                )
            }
            else{
                return res.status(400).send({message:"Grade for this subject : "+marr[i].subjectSubid+" already addded"});
            }
        }

        for(let i=0;i<updatearr.length;i++){
            await sequelize.query(updatearr[i]);
        }

        return res.status(200).send({messgae:"Ok"});
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