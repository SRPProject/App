const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {Admin,Faculty} = require("../../models/roles")
const {Students}=require("../../models/students")
const {jwtDetails }= require("../../config/config")

var logger=require("../../utils/log")(module);

const Login = async (req, res) => {

    const role = res.locals.role 
    var Role="" ; 
    if (role === "Admin") {
        Role = Admin;
    }
    else if (role == "Student") {
        Role = Students; 
    }
    else if (role == "Faculty") {
        Role = Faculty; 
    }

    try{
        var data=""; var id="";
        if(role==="Faculty" || role==="Admin"){
            const mail=req.body.mail
             data=await Role.findOne({
                where:{
                    mail:mail
                }
            })
            id=(data)?( (role==="Faculty")?data.facid:data.adminid ):"";
        }
        else{
            data=await Role.findOne({
                where:{
                    regnum:req.body.regnum
                }
            })
            id=(data)?data.st_id:"";
        }
        
        const password=req.body.password
       
        if(data){
            if(!data.iscreated)return res.status(400).send({message:"User not created!"});
            bcrypt.compare(password, data.password, function(err, result) {
                if(err){
                    return res.status(500).send({message:"Server Error"})
                }
                else{
                    if (result === true) {
                        let token = jwt.sign({ role , id}, jwtDetails.secret, {
                            expiresIn: jwtDetails.jwtExpiration,
                        });
                        return res.status(200).json({message:"Login success",accessToken:token,});
                    }
                    else{
                        return res.status(400).send({ message:{"password":"Wrong Password"}})
                    }
                }
                });
            
        }
        else{
            return res.status(400).send({ message:{"regnum":"User not Found"}})
        }
       
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({  message: "Server Error" });
    }
}


module.exports = Login 