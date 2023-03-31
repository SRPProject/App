var logger=require("../../utils/log")(module);
const {StuPersonalDetails,Students,Scholarship,StudentSem,InternProjects,Placement}=require("../../models/students");
const {Subjects}=require("../../models/comod");
const {Verification}=require("../../models/roles");
const crypto = require("crypto")
const { sendMail}= require("../../utils/mail")
const addStudent=async(req,res)=>{
    try{
        logger.info(req.body.distDepartmentDeptid);
        const mail=req.body.mail;
        const checkacc=await Students.findOne({
            where: {
                mail: mail,
            },
        });
        
        if(checkacc){
            return res.status(401).send({mail:mail,message:"Student account already exists"});
        }
        else{
            const createacc=await Students.create({
                mail:mail,
            })
            
            const entry={
                regnum: req.body.regnum,
                sex: Number(req.body.sex),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dob: new Date(req.body.dob),
                studentStId: createacc.st_id,
                distDepartmentDeptid:Number(req.body.distDepartmentDeptid),
                batchId:Number(req.body.batchId),
                degreeDegid:Number(req.body.degreeDegid),
                regulationRegid:req.body.regulationRegid
            }
            const createaccDetails=await StuPersonalDetails.create(entry);

            //get subjects of the students with regid batchid degid deptid from the subjects table
            const getStudSubs=await Subjects.findAll({
                attributes:['subid'],
                where:{
                    distDepartmentDeptid:req.body.distDepartmentDeptid,
                    degreeDegid:req.body.degreeDegid,
                    regulationRegid:req.body.regulationRegid
                }
            })
            
            // add subjects in student sems 
            for(let i=0;i<getStudSubs.length;i++){
                await StudentSem.create({subjectSubid:getStudSubs[i].subid,studentStId:createacc.st_id});
            }
            const linkCode = crypto.randomBytes(12).toString("hex");
            const obj=await Verification.findOne({where:{mail:mail}})
            if(obj){
                var oobj="";
                var id="";
                oobj= await obj.update({
                    verifyId:obj.verifyId,
                    linkCode:linkCode,
                    mail:mail,
                    expireTime:(Date.now()*1000)
                })
                id=oobj.verifyId
            }
            else{
                oobj=await Verification.create({
                    linkCode:linkCode,
                    mail:mail,
                    expireTime:(Date.now()*1000)
                    })
                id=oobj.verifyId
            }
            if(id){
                //send mail 
                const link = "localhost:3000/api/auth/account-set/" + id + "/" + linkCode;
                
                const html =  `<h3>Account Set Link: </h3> 
                                <p><a> ${link} </a></p>` ; 

                const subject = `Account Set-link ; Expires on ${oobj.expireTime}`; 

                const isSend = sendMail(html, subject, mail);
           
                if (isSend) {
                    return res.status(200).send({ message: "Account link sent successfully" })
                }
                else {
                    logger.error("Mail not sent - Error");
                    return res.status(500).send({ message: "Server Error." })
                }
            }
            else{
                logger.error("Id not found - Error");
                return res.status(500).send({ message: "Server Error." })
            }
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }
}
module.exports={addStudent}