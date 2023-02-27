const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const crypto=require("crypto");
const {transporter,jwtDetails}=require("../config/config");
const {Admin,Verification} = require("../models/roles")
const saltRounds=10;


//saving super-admin credentials
const AdminSave=async(req,res)=>{
   
    try{
        const mail=req.body.mail
        const password=req.body.password
        const deptId=req.body.deptId
        Admin.findOne({

            where:{
                mail:mail,
            }
        }).then((data)=>{
            if(data){
                return res.status(403).send({message:"Admin id already exists"});
            }
            else{
                bcrypt.genSalt(saltRounds,async (err, salt) => {
                    bcrypt.hash(password, salt,async (err, hash) => {
                        if(err){
                            return res.status(500).send({ message: "Server Error." });
                        }
                        else{
                            Admin.create({
                                mail:mail,
                                password:hash,
                                distDepartmentDeptId:deptId
                            }).then((reg)=>{
                                if(reg){
                                    return res.status(200).send({message:"Account saved successsfully!"});
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
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({ message: "Server Error." });
    }
}

const AdminLogin=async(req,res)=>{
    try{
        const mail=req.body.mail
        const password=req.body.password
        if(mail && password){
            const data=await Admin.findOne({
                where:{
                    mail:mail
                }
            })

            if(data===null){
                return res.status(401).send({message:"Failure"})
            }
            else{
                console.log(data);
                bcrypt.compare(password, data.password, function(err, result) {
                    if(err){
                        console.log(err);
                        return res.status(401).send({message:"Failure"})
                    }
                    else{
                        if (result === true){
                            let token = jwt.sign({ role:"AdMiN",id:data.admin_id}, jwtDetails.secret, {
                                expiresIn: jwtDetails.jwtExpiration,
                            });
                            return res.status(200).json({accessToken:token,message:"Success"});
                        }
                        else{
                            return res.status(401).send({message:"Failure"})
                        }
                    }
                  });
                
            }
        }
        else{
            return res.status(401).send({message:"Failure"})
        }
    }
    catch(err){
        return res.status(500).send({ message: "Server Error." });
    }
}
// const FALogin=async(req,res)=>{
//     try{
//         const mail=req.body.mail
//         const password=req.body.password
//         if(mail && password){
//             const data=await Admin.findOne({
//                 where:{
//                     mail:mail
//                 }
//             })

//             if(data===null){
//                 return res.status(401).send({message:"Failure"})
//             }
//             else{
//                 console.log(data);
//                 bcrypt.compare(password, data.password, function(err, result) {
//                     if(err){
//                         console.log(err);
//                         return res.status(401).send({message:"Failure"})
//                     }
//                     else{
//                         if (result === true){
//                             let token = jwt.sign({ role:"FaCuLtYaDvIsOr",id:data.fa_id}, jwtDetails.secret, {
//                                 expiresIn: jwtDetails.jwtExpiration,
//                             });
//                             return res.status(200).json({accessToken:token,message:"Success"});
//                         }
//                         else{
//                             return res.status(401).send({message:"Failure"})
//                         }
//                     }
//                   });
                
//             }
//         }
//         else{
//             return res.status(401).send({message:"Failure"})
//         }
//     }
//     catch(err){
//         return res.status(500).send({ message: "Server Error." });
//     }
// }
const StudentLogin=async(req,res)=>{
    try{
        const mail=req.body.mail
        const password=req.body.password
        if(mail && password){
            const data=await Admin.findOne({
                where:{
                    mail:mail
                }
            })

            if(data===null){
                return res.status(401).send({message:"Failure"})
            }
            else{
                console.log(data);
                bcrypt.compare(password, data.password, function(err, result) {
                    if(err){
                        console.log(err);
                        return res.status(401).send({message:"Failure"})
                    }
                    else{
                        if (result === true){
                            let token = jwt.sign({ role:"FaCuLtYaDvIsOr",id:data.fa_id}, jwtDetails.secret, {
                                expiresIn: jwtDetails.jwtExpiration,
                            });
                            return res.status(200).json({accessToken:token,message:"Success"});
                        }
                        else{
                            return res.status(401).send({message:"Failure"})
                        }
                    }
                  });
                
            }
        }
        else{
            return res.status(401).send({message:"Failure"})
        }
    }
    catch(err){
        return res.status(500).send({ message: "Server Error." });
    }
}
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
    return false;
}
const isStudent=async (mail)=>{
    const data=await Admin.findOne({
        where:{
            mail:mail
        }
    })
    return false
}
const ForgotPassword=async(req,res)=>{
    try{
        const mail=req.body.mail
        const checkAdmin=await isAdmin(mail);
        const checkFA=await isFA(mail);
        const  checkStudent=await isStudent(mail);
        if(checkAdmin){
            const linkCode=crypto.randomBytes(4).toString("hex");
            //save to db
            sendMailLink(mail,linkCode,res);
        }
        else{
            return res.status(401).send({ message: "Unauthorized." });
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send({ message: "Server Error" });
    }
}
const sendMailLink=async (mail,token,res)=>{
    try{
        var id;
        const obj=await Verification.findOne({where:{
            mail:mail
        }}).then(async (data)=>{
            if(data) {
                const oobj= await data.update({
                    verifyId:data.verifyId,
                    linkCode:token,
                    mail:mail,
                    expireTime:(Date.now()+24*60*60)
                })
                id=oobj.verifyId
            }
            else{
               
                const oobj=await Verification.create({
                    // verifyId:data.verifyId,
                    linkCode:token,
                    mail:mail,
                    expireTime:(Date.now()+24*60*60)
                })
                id=oobj.verifyId

            }
        }).then((data)=>{
            const link="localhost:3000/password-set/"+id+"/"+token;
            var mailOptions={
                to: mail,
                subject: "Password Reset Link: ",
                html: "<h3>Reset Link: </h3>"+"<p><a>" + link +"</a></p>" // html body
            };
            transporter.sendMail(mailOptions,async (error, info) => {
                if (error) {
                     return res.status(404).json({message:"Error in sending mail"});
                }
                console.log(mailOptions);
                console.log('Message sent: %s', info.messageId);   
                return res.status(200).send({message:"Password Reset link sent to registered mail id"}); 
             })
             
        })
        .catch((err)=>{
            console.log(err)
             return res.status(500).send({ message: "Server Error." });
        })    
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:"Server Error!"});
    }   
}

const SetPassword=async (req,res)=>{
    try{
        const uid=req.params.userId;
        const linkCode=req.params.linkCode;
        const obj=await Verification.findOne({
            where:{
                verifyId:uid,
                linkCode:linkCode,
            }
        })
        console.log(uid+" "+linkCode+" "+obj);
        if(!obj){
            return res.status(400).send({message:"Invaid link or Expired."});
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
module.exports={AdminSave,AdminLogin,StudentLogin,ForgotPassword,SetPassword}
