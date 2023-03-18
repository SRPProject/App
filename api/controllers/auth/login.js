const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { Admin } = require("../../models/roles")

const {JWTDetails }= require("../../config/config")



/*
    PATH : /api/auth/admin/ && /api/auth/student/
    POST : {mail,password}
    RESPONSE :{ status , message , accessToken }
*/

const Login = async (req, res) => {

    const role = res.locals.role 

    var Role  ; 

    console.log(role)

    if (role === "Admin") {
        Role = Admin;
    }
    else if (role == "Student") {
        Role = Admin; 
    }

    try{
        const mail=req.body.mail
        const password=req.body.password
        if(mail && password){
            const data=await Role.findOne({
                where:{
                    mail:mail
                }
            })

            if(data===null){
                return res.status(401).send({ status : "failure" ,  message:"Mail Id not Found"})
            }
            else{
            
                bcrypt.compare(password, data.password, function(err, result) {
                    if(err){
                        return res.status(401).send({status:"failure" , message:"Server Error"})
                    }
                    else{
                        if (result === true) {
                            
                            const id = data.dataValues.admin_id

                            let token = jwt.sign({ role , id}, JWTDetails.secret, {
                                expiresIn: JWTDetails.jwtExpiration,
                            });
                            return res.status(200).json({status:"success" ,message:"Login success",accessToken:token,});
                        }
                        else{
                            return res.status(401).send({status:"failure", message:"Wrong Password"})
                        }
                    }
                  });
                
            }
        }
        else{
            return res.status(401).send({status:"failure",message:"Server Error"})
        }
    }
    catch(err){
        return res.status(500).send({ status:"failure" , message: "Server Error" });
    }
}


module.exports = Login 