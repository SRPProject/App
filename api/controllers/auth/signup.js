

// **
//  no need just for testing
// **


var logger=require("../../utils/log")(module);
const { Admin } = require("../../models/roles")
const bcrypt=require("bcrypt");
const saltRounds = 10 

const AdminSave = async (req, res) => {
    
    const mail = req.body.mail
    const password = req.body.password

    logger.info(mail,password)
        
    if (!mail || !password) return res.status(400).send({ message: "Failure" });

    try {
        
        const data = await Admin.findOne({
            where: {
                mail: mail,
            }
        })
        
        //account already exists 
        if(data) return res.status(403).send({message:"Account already exists"})
        
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
                        logger.info(err);
                        return res.status(500).send({  message: "Server Error" });
                    }

                    else {
                        
                        const data = await Admin.create({
                            mail:mail,
                            password:hash,
                            iscreated:true,
                            distDepartmentDeptid:req.body.distDepartmentDeptid,
                        })
                        return res.status(200).send({message:"Account created"})
                    }
            });
            
        });

    }
    catch (err) {
        logger.error(err);
        return res.status(500).send({message:"Server error"})
    }

}


    


module.exports = AdminSave 
