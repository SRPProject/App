const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {Admin} = require("../../models/roles")
const {jwtDetails }= require("../../config/config")

var logger=require("../../utils/log")(module);

/*
    PATH : /api/auth/admin/ && /api/auth/student/
    POST : {mail,password}
    RESPONSE :{ status , message , accessToken }
*/

const Login = async (req, res) => {

    const role = res.locals.role 

    var Role  ; 

    logger.info(role)

    if (role === "Admin") {
        Role = Admin;
    }
    else if (role == "Student") {
        Role = Admin; 
    }
    else if (role == "Faculty") {
        Role = Admin; 
    }

    try{
        const mail=req.body.mail
        const password=req.body.password
    
        const data=await Role.findOne({
            where:{
                mail:mail
            }
        })

        if(data===null){
            return res.status(401).send({ message:"Mail Id not Found"})
        }
        else{
        
            bcrypt.compare(password, data.password, function(err, result) {
                if(err){
                    return res.status(401).send({message:"Server Error"})
                }
                else{
                    if (result === true) {
                        
                        const id = data.admin_id

                        let token = jwt.sign({ role , id}, jwtDetails.secret, {
                            expiresIn: jwtDetails.jwtExpiration,
                        });
                        return res.status(200).json({message:"Login success",accessToken:token,});
                    }
                    else{
                        return res.status(401).send({ message:"Wrong Password"})
                    }
                }
                });
            
        }
       
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({  message: "Server Error" });
    }
}


module.exports = Login 