var logger=require("../../../utils/log")(module);
const {Faculty}=require("../../../models/roles")
const {sendVerificationLink}=require("../../auth/password")

const addFaculty=async(req,res)=>{
    try{

        const checkacc=await Faculty.findOne({
            where: {
                mail: req.body.mail,
            },
        });
        if(checkacc){
            return res.status(401).send({message:"Faculty account already exists for mail id : "+req.body.mail});
        }
        else{
            await Faculty.create({
                mail: req.body.mail,
                distDepartmentDeptid:Number(req.body.distDepartmentDeptid),
            })            
            await sendVerificationLink(req,res,req.body.mail,8,0);

        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error Try again"})
    }
}
module.exports={addFaculty}