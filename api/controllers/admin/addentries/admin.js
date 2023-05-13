const {Departments,Regulation,Degree,Subjects,Batch} = require("../../../models/comod")
var logger=require("../../../utils/log")(module)

function normalizestr(Sentence){
    let words = Sentence.trim().split(" ");
    console.log(words);
    let ans="";
    for (let i = 0; i < words.length; i++) {
        if(i!==words.length-1){ans += words[i][0].toUpperCase() + words[i].substr(1).toLowerCase()+" ";}
        else{
            ans += words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
        }
    }
    return ans;
}

const addDepartments=async (req,res)=>{
    
    try{
        const deptName=normalizestr(req.body.deptName);
        const dept=await Departments.findOne({where:{deptname:deptName}});
        if(dept===null){
           await Departments.create({deptname:deptName});
           return res.status(200).send({message:"Department added successsfully!"});
        }
        else{
            return res.status(400).send({message:"Department already exists!"})
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({ message: "Server Error." });
    }
    
}

const addRegulation=async(req,res)=>{
    try{
        const reg=await Regulation.findOne({where:{regyear:req.body.regyear}});
        if(reg===null){
            await Regulation.create({regyear:req.body.regyear});
            return res.status(200).send({message:"Regulation added successsfully!"});
        }
        else{
            return res.status(400).send({message:"Regulation already exists!"})
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({ message: "Server Error." });
    }
}

const addDegree=async(req,res)=>{
    try{
        const degreeName=normalizestr(req.body.degreename);
        const deg=await Degree.findOne({where:{degname:degreeName,noofsems:req.body.noofsems}});
        if(deg===null){
            await Degree.create({degname:degreeName,noofsems:req.body.noofsems});
            return res.status(200).send({message:"Degree added successsfully!"});
        }
        else{
            return res.status(400).send({message:"Degree already exists!"})
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({ message: "Server Error." });
    }
}
module.exports={addDepartments,addRegulation,addDegree}
