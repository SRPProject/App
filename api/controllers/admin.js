const {Departments} = require("../models/module")

const addDepartments=async (req,res)=>{
    
    try{
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
                    }
                    else {
                        return res
                          .status(400)
                          .send({ message: "Server Error. Try again." });
                      }
                })
                .catch((err) => {
                    return res.status(500).send({ message: "Server Error." });
                });
            }
            else{
                return res.status(400).send({ message: "Department Name Already exists." });
            }
        }
        else{
            return res.status(400).send({ message: "Empty Department Name." });
        }
    }
    catch(err){
        return res.status(500).send({ message: "Server Error." });
    }
    
}
module.exports={addDepartments}
