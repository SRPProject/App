<<<<<<< HEAD
// no need just for testing

var logger=require("../../utils/log")(module);
=======

>>>>>>> origin/kumaran
const { Admin } = require("../../models/roles")
const bcrypt=require("bcrypt");
const saltRounds = 10 

<<<<<<< HEAD

=======
>>>>>>> origin/kumaran
/*
    PATH : /api/auth/signup-admin 
    POST : {mail,password}
    RESPONSE : {status , message }
*/

const AdminSave = async (req, res) => {
    
    const mail = req.body.mail
    const password = req.body.password

<<<<<<< HEAD
    logger.info(mail,password)
        
    if (!mail || !password) return res.status(400).send({ message: "Failure" });
=======
    console.log(mail,password)
        
    if (!mail || !password) return res.status(500).send({ message: "Failure" });
>>>>>>> origin/kumaran

    try {
        
        const data = await Admin.findOne({
            where: {
                mail: mail,
            }
        })
        
        //account already exists 
<<<<<<< HEAD
        if(data) return res.status(403).send({message:"Account already exists"})
=======
        if(data) return res.status(403).send({status:"failure",message:"Account already exists"})
>>>>>>> origin/kumaran
        
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
<<<<<<< HEAD
                        logger.info(err);
                        return res.status(500).send({  message: "Server Error" });
=======
                        return res.status(500).send({ status: "failure" , message: "Server Error" });
>>>>>>> origin/kumaran
                    }

                    else {
                        
                        const data = await Admin.create({
                            mail:mail,
                            password:hash,
                        })
<<<<<<< HEAD
                        return res.status(200).send({message:"Account created"})
=======
                        return res.status(200).send({status:"success" ,message:"Account created"})
>>>>>>> origin/kumaran
                    }
            });
            
        });

    }
    catch (err) {
<<<<<<< HEAD
        logger.error(err);
        return res.status(500).send({message:"Server error"})
=======
        return res.status(500).send({status:"failure",message:"Server error"})
>>>>>>> origin/kumaran
    }

}


    


module.exports = AdminSave 
