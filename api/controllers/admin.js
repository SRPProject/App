<<<<<<< HEAD
const {Departments} = require("../models/comod")
var logger=require("../utils/log")(module)
=======
const {Departments} = require("../models/module")
>>>>>>> origin/kumaran

const addDepartments=async (req,res)=>{
    
    try{
<<<<<<< HEAD
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
=======
        var role=req.body.role;
        const deptName=req.body.deptName;
        if(deptName && role==="AdMiN"){
            const dept=await Departments.findOne({where:{dept_name:deptName}});
            if(dept===null){
                Departments.create({
                    dept_name:deptName
                }).then((data)=>{
                    if(data){
                        return res.status(200).send({msg:"Department saved successsfully!"});
>>>>>>> origin/kumaran
                    }
                    else {
                        return res
                          .status(400)
                          .send({ message: "Server Error. Try again." });
                      }
                })
<<<<<<< HEAD
            }
            else{
                return res.status(400).send({ message: "Department Name Already Exists." });
=======
                .catch((err) => {
                    return res.status(500).send({ message: "Server Error." });
                });
            }
            else{
                return res.status(400).send({ message: "Department Name Already exists." });
>>>>>>> origin/kumaran
            }
        }
        else{
            return res.status(400).send({ message: "Empty Department Name." });
        }
    }
    catch(err){
<<<<<<< HEAD
        logger.error(err);
=======
>>>>>>> origin/kumaran
        return res.status(500).send({ message: "Server Error." });
    }
    
}
module.exports={addDepartments}
