
const { error } = require("console");
const crypto = require("crypto")
const utils = require("../../utils/mail")

/*
    PATH : /api/auth/forgot-password 
    POST : email  
    RESPONSE : {  }
*/
const ForgotPassword = async(req,res)=>{
    try{
        const mail=req.body.mail
        const checkAdmin=await isAdmin(mail);
        const checkFA=await isFA(mail);
        const  checkStudent=await isStudent(mail);
        if(checkAdmin){
            
            const linkCode = crypto.randomBytes(4).toString("hex");
            
            try{
                var id;
                const obj=await Verification.findOne({where:{
                    mail:mail
                }}).then(async (data)=>{
                    if(data) {
                        const oobj= await data.update({
                            verifyId:data.verifyId,
                            linkCode,
                            mail:mail,
                            expireTime:(Date.now()+24*60*60)
                        })
                        id=oobj.verifyId
                    }
                    else{
                       
                        const oobj=await Verification.create({
                            // verifyId:data.verifyId,
                            linkCode,
                            mail:mail,
                            expireTime:(Date.now()+24*60*60)
                        })
                        id=oobj.verifyId
        
                    }
                }).then((data)=>{
                    //send mail 
                    const link = "localhost:3000/password-set/" + id + "/" + token;
                    
                    const html =  `<h3>Reset Link: </h3> 
                                   <p><a> ${link} </a></p>` ; 

                    const subject = `Password Set-link ; Expires on ${data.expireTime}`; 

                    const isSend = mail.sendMail(html, subject, mail);
                    
                    if (isSend) {
                        return res.status(200).json({ message: "Success" })
                    }
                    else {
                       //  const deleteThisVerify = ; 
                        return res.status(500).json({ message: "Server Error." })
                    }
                })
                .catch((err)=>{
                   
                    return res.status(500).json({ message: "Server Error." });
                })    
            }
            catch(err){
                console.log(err);
                return res.status(500).json({message:"Server Error!"});
            }   

        }
        else{
            return res.status(401).json({ message: "Unauthorized." });
        }
    }
    catch(err){
        return res.status(500).json({ message: "Server Error" });
    }
}



/*
    PATH : /api/auth/set-password 
    POST : userId , linkCode 
    RESPONSE : {message:Success}
               {message:Failure}
*/


const SetPassword=async (req,res)=>{
    try{
        const uid=req.data.userId;
        const linkCode=req.data.linkCode;
        const obj=await Verification.findOne({
            where:{
                verifyId:uid,
                linkCode:linkCode,
            }
        })
       
        if(!obj){
            return res.status(400).send({message:"Invalid uid or Link"});
        }
        else{

            if(Date.now()-obj.expireTime<0){
                console.log(obj.expireTime-Date.now())
                return res.status(400).send({message:"Invaid link or Expired."});
            }
            else if(linkCode.length===8){
                //check  in admin table
                const val=await Admin.findOne({where:{
                    mail:obj.mail
                }})
                if(!val){
                    return res.status(400).send({message:"Invaid link or Expired."});
                }
                else{
                    const newPassword=req.body.password;
                    bcrypt.genSalt(saltRounds,async (err, salt) => {
                        bcrypt.hash(newPassword, salt,async (err, hash) => {
                            if(err){
                                return res.status(500).send({ message: "Server Error." });
                            }
                            else{
                                val.update({
                                    mail:val.mail,
                                    password:hash,
                                }).then((reg)=>{
                                    if(reg){
                                        return res.status(500).send({ message: "Server Error." });
                                    }
                                    else {
                                        return res
                                          .status(400)
                                          .send({ message: "Server Error. Try again." });
                                      }
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                    return res.status(500).send({ message: "Server Error." });
                                });
                            }
                        });
                        if(err){
                            return res.status(500).send({ message: "Server Error." });
                        }
                    });
                }
            }
        }
    }
    catch(err){
        console.log(err);
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
    const data=await Admin.findOne({
        where:{
            mail:mail
        }
    })
    return (data!=null)?true:false
}

const isStudent=async (mail)=>{
    const data=await Admin.findOne({
        where:{
            mail:mail
        }
    })
    return (data!=null)?true:false
}

module.exports = {
    ForgotPassword,
    SetPassword 
}