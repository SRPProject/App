
const { Admin } = require("../../models/roles")
const bcrypt=require("bcrypt");
const saltRounds = 10 

/*
    PATH : /api/auth/signup-admin 
    POST : {mail,password}
    RESPONSE : {status , message }
*/

const AdminSave = async (req, res) => {
    
    const mail = req.body.mail
    const password = req.body.password

    console.log(mail,password)
        
    if (!mail || !password) return res.status(500).send({ message: "Failure" });

    try {
        
        const data = await Admin.findOne({
            where: {
                mail: mail,
            }
        })
        
        //account already exists 
        if(data) return res.status(403).send({status:"failure",message:"Account already exists"})
        
        // hash password and save 
        
        bcrypt.genSalt(saltRounds,async (err, salt) => {

            if(err){
                return res.status(500).send({ message: "Failure" });
            }

            bcrypt.hash(
                password, 
                salt ,
                async (err, hash) => {

                    if(err){
                        return res.status(500).send({ status: "failure" , message: "Server Error" });
                    }

                    else {
                        
                        const data = await Admin.create({
                            mail:mail,
                            password:hash,
                        })
                        return res.status(200).send({status:"success" ,message:"Account created"})
                    }
            });
            
        });

    }
    catch (err) {
        return res.status(500).send({status:"failure",message:"Server error"})
    }

}


    


module.exports = AdminSave 
