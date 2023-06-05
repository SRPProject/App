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
const addingSubjects=async (req,res)=>{
    try{
        //type of subjects==>1 compulsory,2 professional elective ,3 humanities elective,4 audit 
        //fields credit subcode , subname ,typeofsub ,regulationRegid ,degreeDegid,distDepartmentDeptid,semsubbelongs
        console.log("--->"+req.body.semsubbelongs+'-->'+req.body.typeofsub);
        const entry={
            subcode:req.body.subcode,
            subname:req.body.subname,
            typeofsub:req.body.typeofsub,
            regulationRegid:req.body.regulationRegid,
            degreeDegid:req.body.degreeDegid,
            semsubbelongs:req.body.semsubbelongs,
            distDepartmentDeptid:req.body.distDepartmentDeptid,
            credit:req.body.credit
        }
        if(entry.typeofsub != '1'){entry.semsubbelongs=0;}

        //Subjects Names will be in Uppercase
        entry.subname=(entry.subname).trim().toUpperCase();


        const sub=await Subjects.findOne({where:entry})
        if(sub===null){
            const MaxSemNum=await Degree.findOne({where:{degid:req.body.degreeDegid}})
            if(MaxSemNum){
                if(entry.typeofsub == 1){
                    //for core(compulsory subject) need to check semster no. 
                    //should be within the degree table semester no
                    if((entry.semsubbelongs>=1 && entry.semsubbelongs<=MaxSemNum)){
                        await Subjects.create(entry);
                        return res.status(200).send({message:"Subjects added Successfuly"});
                    }
                    else{
                        return res.status(400).send({message:"Invalid Semester Number!"});
                    }
                }
                else{
                    entry.semsubbelongs=0;
                    await Subjects.create(entry);
                    return res.status(200).send({message:"Subjects added Successfuly"});
                }
            }
            else{
                return res.status(400).send({message:"Invalid Degree !"});
            }
        }
        else{
            return res.status(400).send({message:"Subjects entry Already Exists!"});
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({ message: "Server Error." });
    }
}
const addBatches=async(req,res)=>{
    try{
        let entry={
            startyr:req.body.startyr,
            endyr:req.body.endyr
        }
        const checkexists=await Batch.findOne({where:entry});
        if(checkexists){
            return res.status(400).send({message:"Batch already exists!"})
        }
        else{
            await Batch.create(entry);
            return res.status(200).send({message:"Added Successfully"})
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({ message: "Server Error." });
    }
}
module.exports={addDepartments,addRegulation,addDegree,addingSubjects,addBatches}
