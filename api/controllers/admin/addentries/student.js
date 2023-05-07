var logger=require("../../../utils/log")(module);
const {StuPersonalDetails,Students,StudentSem,MarksheetProofs}=require("../../../models/students");
const {Degree,Subjects}=require("../../../models/comod");
const {sendVerificationLink}=require("../../auth/password");


const addStudent=async(req,res)=>{
    try{
        const checkacc=await Students.findOne({
            where: {
                regnum: req.body.regnum,
            },
        });
        
        if(checkacc){
            return res.status(401).send({message:"Student account already exists for roll number : "+req.body.regnum});
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
        return res.status(500).send({message:"Server Error Try again"})
    }
}

module.exports={addStudent}