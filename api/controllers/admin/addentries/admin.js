const {Departments} = require("../../../models/comod")
var logger=require("../../../utils/log")(module)

const addDepartments=async (req,res)=>{
    
    try{
        var role=res.locals.role;
        const deptName=req.body.deptName;
        if(deptName){
            logger.info(role);
            const dept=await Departments.findOne({where:{deptname:deptName}});
            if(dept===null){
                Departments.create({
                    deptname:deptName
                }).then((data)=>{
                    if(data){
                        return res.status(200).send({message:"Department saved successsfully!"});
                    }
                    else {
                        return res
                          .status(400)
                          .send({ message: "Server Error. Try again." });
                      }
                })
            }
            else{
                return res.status(400).send({ message: "Department Name Already Exists." });
            }
        }
        else{
            return res.status(400).send({ message: "Empty Department Name." });
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({ message: "Server Error." });
    }
    
}
module.exports={addDepartments}
