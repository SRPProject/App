var logger=require("../../utils/log")(module);
const bcrypt=require("bcrypt");
const crypto = require("crypto")
const { sendMail}= require("../../utils/mail")
const {Admin,Faculty,Verification} = require("../../models/roles")
const {Students}=require("../../models/students");
const saltRounds=10;

const ForgotPassword = async(req,res)=>{
    try{
        var lcode=0;
        var mail="";
       
        if(res.locals.stdauthkey===1){
            
            mail=await isStudent(req.body.regnum);
            
            if(mail){ lcode=12; }
            else{ return res.status(400).send({ message: "Roll Number not exists" });}
        }
        else{
            mail=req.body.mail
            const checkAdmin=await isAdmin(mail);
            const checkFA=await isFA(mail);
            if(!checkAdmin && !checkFA ){ return res.status(401).send({ message: "Unauthorized." }); }   
            else if(checkAdmin){ lcode=4; }
            else if(checkFA){ lcode=8; }
        }       
        await sendVerificationLink(req,res,mail,lcode,0);
       
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({ message: "Server Error" });
    }
}

//having doubt on set-password 
const SetPassword=async (req,res)=>{
    try{
        var uid=req.body.userId;//for students it should be regnum
        var linkCode=req.body.linkCode;
        var obj="";
        var iscreated=true;
        if(res.locals.stdauthkey===1){
            obj=await Students.findOne({
                where:{
                    regnum:uid,
                    linkCode:linkCode,
                }
            })
            iscreated=(obj)?obj.iscreated:true;
        }
        else if(linkCode.length===8){
            //check  in admin table
            obj=await Verification.findOne({
                where:{
                    verifyId:uid,
                    linkCode:linkCode,
                }
            })
            val=(obj)?await Admin.findOne({where:{
                mail:obj.mail
            }}):""
            iscreated=(val)?val.iscreated:true;
           
        }
        else if(linkCode.length===16){
            obj=await Verification.findOne({
                where:{
                    verifyId:uid,
                    linkCode:linkCode,
                }
            })
            val=(obj)?await Faculty.findOne({where:{
                mail:obj.mail
            }}):""
            iscreated=(val)?val.iscreated:true;
        }
        else{
            return res.status(400).send({message:"Invalid Link"});
        }    
       
       
        if(!obj){
            return res.status(400).send({message:"Invalid Link"});
        }
        else{
            var val="";
            if(iscreated && obj.expireTime-Date.now()<0){
                console.log(obj.expireTime-Date.now())
                return res.status(400).send({message:"Invaid link or Expired...."});
            }
            else if(linkCode.length===8){
                //check  in admin table
                 val=await Admin.findOne({where:{
                    mail:obj.mail
                }})
            }
            else if(linkCode.length===16){
                //check  in admin table
                 val=await Faculty.findOne({where:{
                    mail:obj.mail
                }})
            }
            else if(linkCode.length===24){
                //check  in admin table
                 val=await Students.findOne({where:{
                    regnum:uid,
                    mail:obj.mail
                }})
            }
            if(!val){
                return res.status(400).send({message:"Invaid link or Expired."});
            }
            else{
                const newPassword=req.body.password;
                const cpassword=req.body.confirmpassword
                if(newPassword!==cpassword) {return res.status(400).send({message:"Invalid Credentials"})}
                else{
                    await obj.update({
                        expireTime:0,
                       
                    })
                    bcrypt.genSalt(saltRounds,async (err, salt) => {
                        bcrypt.hash(newPassword, salt,async (err, hash) => {
                            if(err){
                                logger.error(err);
                                return res.status(500).send({ message: "Server Error." });
                            }
                            else{
                                await val.update({
                                    password:hash,
                                    iscreated:true
                                })
                                return res.status(200).send({ message: "Success" });
                            }
                        });
                        if(err){
                            logger.error(err.message);
                            return res.status(500).send({ message: "Server Error." });
                        }
                    });
                }
            }
            
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error!"});
    }
}


// helpers 
const isAdmin=async (mail)=>{
    const data=await Admin.findOne({
        where:{
            mail:mail
        }
    })
    return (data!=null)?true:false
}

const isFA=async (mail)=>{
    const data=await Faculty.findOne({
        where:{
            mail:mail
        }
    })
    return (data!=null)?true:false
}

const isStudent=async (regnum)=>{
    const data=await Students.findOne({
        where:{
            regnum:regnum
        }
    })
    return (data!=null)?data.mail:false
}
const sendVerificationLink=async(req,res,mail,lcode,regnum)=>{
    try{
        var id="";var oobj="";
        linkCode = crypto.randomBytes(lcode).toString("hex");
        const obj=(regnum===0)?await Verification.findOne({where:{mail:mail}}):await Students.findOne({where:{regnum:mail}})
       
        if(obj){
            oobj= await obj.update({
                linkCode:linkCode,
                expireTime:(Date.now()*1000)
            })
            id=(regnum===0)?oobj.verifyId:oobj.st_id;
        }
        else{
            oobj=await Verification.create({
                linkCode:linkCode,
                mail:mail,
                expireTime:(Date.now()*1000)
                })
            id=oobj.verifyId
        }
        logger.info(id);
        if(id){
                 //send mail 
            const [addregnum,addstdurl]=(regnum===0)?["",""]:[("-"+regnum),"student/"]

            const link = process.env.DOMAIN_NAME+"/auth/password-set/"+addstdurl + id+addregnum + "/" + linkCode;
            logger.info(link);
            const html =  `<h3>Reset Link: </h3> 
                            <p><a> ${link} </a></p>` ; 

            const subject = `Password Set-link ; Expires on ${oobj.expireTime}`; 

            const isSend =await sendMail(html, subject, oobj.mail);

            console.log(isSend);
            
            if (isSend) {
                return res.status(200).send({ message: "Check Your Mail!!" })
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
    catch(err){
        logger.error(err);
        return res.status(500).send({ message: "Server Error." })   
    }
}

const sendBulkVerificationLink=async(req,res,mail,lcode,regnum)=>{
    try{
        var id="";var oobj="";
        linkCode = crypto.randomBytes(lcode).toString("hex");
        const obj=(regnum===0)?await Verification.findOne({where:{mail:mail}}):await Students.findOne({where:{regnum:mail}})
       
        if(obj){
            oobj= await obj.update({
                linkCode:linkCode,
                expireTime:(Date.now()*1000)
            })
            id=(regnum===0)?oobj.verifyId:oobj.st_id;
        }
        else{
            oobj=await Verification.create({
                linkCode:linkCode,
                mail:mail,
                expireTime:(Date.now()*1000)
                })
            id=oobj.verifyId
        }
        logger.info(id);
        if(id){
                 //send mail 
            const [addregnum,addstdurl]=(regnum===0)?["",""]:[("-"+regnum),"student/"]

            const link = process.env.DOMAIN_NAME+"/auth/password-set/"+addstdurl + id+addregnum + "/" + linkCode;
            logger.info(link);
            const html =  `<h3>Reset Link: </h3> 
                            <p><a> ${link} </a></p>` ; 

            const subject = `Password Set-link ; Expires on ${oobj.expireTime}`; 

            const isSend =await sendMail(html, subject, oobj.mail);

            console.log(isSend);
            
            if (isSend) {
                logger.info("Mail sent for user-->"+regnum);
            }
            else {
                logger.error("Mail not sent - Error"+regnum);
                // return res.status(500).send({ message: "Server Error." })
            }
        }
        else{
            logger.error("Id not found - Error");
            // return res.status(500).send({ message: "Server Error." })
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({ message: "Server Error." })   
    }
}
module.exports = {
    ForgotPassword,
    SetPassword ,
    sendVerificationLink,
    sendBulkVerificationLink
}