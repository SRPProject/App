const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

const {transporter,jwtDetails}=require("../config/config");
const {Admin} = require("../models/roles")
const saltRounds=10;


//saving super-admin credentials
const AdminSave=async(req,res)=>{
   
    try{
        const mail=req.body.email
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
                            return res.status(500).json({message:"Error in hashing password!"});
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
                        return res.status(500).json({message:"Error in hashing-salt password!"});
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
        const mail=req.body.email
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
//         const mail=req.body.email
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
        const mail=req.body.email
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
module.exports={AdminSave,AdminLogin,StudentLogin}
