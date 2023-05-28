var logger=require("../../../utils/log")(module);
const {StuPersonalDetails,Students,StudentSem,MarksheetProofs}=require("../../../models/students");
const {Degree,Subjects}=require("../../../models/comod");
const {sendVerificationLink,sendBulkVerificationLink}=require("../../auth/password");
// var xlstojson = require("xls-to-json-lc");
// var xlsxtojson = require("xlsx-to-json-lc");
const xlsx = require('xlsx');


const addStudent=async(req,res)=>{
    try{
        const checkacc=await Students.findOne({
            where: {
                regnum: req.body.regnum,
            },
        });
        
        if(checkacc){
            return res.status(400).send({message:"Student account already exists for roll number : "+req.body.regnum});
        }
        else{
            //getting no of semester from degrees

            const semcount=await Degree.findByPk(req.body.degreeDegid);

            
        
            const createacc=await Students.create({
                regnum: req.body.regnum,
                mail:req.body.mail,
                total_sem : semcount.noofsems, 
                distDepartmentDeptid:Number(req.body.distDepartmentDeptid),
                batchId:Number(req.body.batchId),
                degreeDegid:Number(req.body.degreeDegid),
                regulationRegid:req.body.regulationRegid,
                facultyFacid:req.body.facultyFacid
            })
            const entry={
                regnum: req.body.regnum,
                sex: (req.body.sex),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dob: new Date(req.body.dob),
                studentStId: createacc.st_id,
               
            }

            
            await StuPersonalDetails.create(entry);
                //creating entries in marksheets table
            const marksheetentry=[]
            for(let i=1;i<=semcount.noofsems;i++){
                marksheetentry.push({
                    semno:i,
                    studentStId:createacc.st_id
                })
            }

            await MarksheetProofs.bulkCreate(marksheetentry);
            logger.info(marksheetentry);
            

            //get subjects of the students with regid batchid degid deptid from the subjects table
            const getStudSubs=await Subjects.findAll({
                attributes:['subid'],
                where:{
                    distDepartmentDeptid:req.body.distDepartmentDeptid,
                    degreeDegid:req.body.degreeDegid,
                    regulationRegid:req.body.regulationRegid
                }
            })
            
            // add subjects in student sems 
            const StdSemEntry=[]
            for(let i=0;i<getStudSubs.length;i++){
                StdSemEntry.push({subjectSubid:getStudSubs[i].subid,studentStId:createacc.st_id});
            }
            await StudentSem.bulkCreate(StdSemEntry)

            await sendVerificationLink(req,res,req.body.regnum,12,req.body.regnum);
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:err.message})
    }
}
const extractDatafromExcel=async(req,res)=>{
    try{
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        return jsonData;
    }
    catch(err){
        logger.error(err);
        return res.status(400).send({message:"Server Error Try again"})
    }
}
const addBulkStudents=async (req,res)=>{
    try{
        
        //req body should contain
        //degreeDegid,distDepartmentDeptid,regulationRegid,facultyFacid,batchId
        const datafromExcel=await extractDatafromExcel(req,res);

        //works to do here

        /*
        need to check 
            *all the key values are valid
            *values should not be empty
            *check for the duplicates
            * regnum should be unique
            * any of those regnum should not be in the student sems table

        */

        //getting semester count
        const semcount=await Degree.findByPk(req.body.degreeDegid);

        //array of entries for students table
        let createacc=[]

       

        for (let i=0;i<datafromExcel.length;i++){
            let temp=datafromExcel[i];
            createacc.push({
                regnum: temp.regnum,
                mail:temp.mail,
                total_sem : semcount.noofsems, 
                distDepartmentDeptid:Number(req.body.distDepartmentDeptid),
                batchId:Number(req.body.batchId),
                degreeDegid:Number(req.body.degreeDegid),
                regulationRegid:req.body.regulationRegid,
                facultyFacid:req.body.facultyFacid
            })
            
        }

        // inserting into students table
        let Stdaccounts=await Students.bulkCreate(createacc);

        console.log("Student Account");
        console.log( typeof(Stdaccounts));

        //get subjects of the students with regid batchid degid deptid from the subjects table
        const getStudSubs=await Subjects.findAll({
            attributes:['subid'],
            where:{
                distDepartmentDeptid:req.body.distDepartmentDeptid,
                degreeDegid:req.body.degreeDegid,
                regulationRegid:req.body.regulationRegid
            }
        })
        
        //array of student personal details
        let personalentries=[];

        //array of marksheets entries
        let marksheetentry=[];

         // add subjects in student sems 
         const StdSemEntry=[]

         for (let i=0;i<datafromExcel.length;i++){
            let temp=datafromExcel[i];
            personalentries.push({
                regnum: temp.regnum,
                sex: temp.sex,
                firstname: temp.firstname,
                lastname: temp.lastname,
                dob: new Date(Date.now()),
                studentStId: Stdaccounts[i].getDataValue("st_id")
            })
            for(let j=1;j<=semcount.noofsems;j++){
                marksheetentry.push({
                    semno:j,
                    studentStId:Stdaccounts[i].getDataValue("st_id")
                })
            }
            for(let k=0;k<getStudSubs.length;k++){
                StdSemEntry.push({subjectSubid:getStudSubs[k].subid,studentStId:Stdaccounts[i].getDataValue("st_id") });
            }
        }

        console.log("personalentries");
        console.log(personalentries);

        await StuPersonalDetails.bulkCreate(personalentries);


        console.log("marksheetentry");
        console.log(marksheetentry);

        await MarksheetProofs.bulkCreate(marksheetentry);


        console.log("StdSemEntry");
        console.log(StdSemEntry);

        await StudentSem.bulkCreate(StdSemEntry);

        for (let i=0;i<datafromExcel.length;i++){
            let temp=datafromExcel[i];
            await sendBulkVerificationLink(req,res,temp.regnum,12, temp.regnum);

        }    

        return res.status(200).send({message:"All users added Successfully!"});
        
    }
    catch(err){
        logger.error(err);
        return res.status(400).send({message:err.message})
    }
}

module.exports={addStudent,addBulkStudents,extractDatafromExcel}