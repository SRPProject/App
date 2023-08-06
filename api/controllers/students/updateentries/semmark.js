var logger = require("../../../utils/log")(module);
const sequelize = require("../../../config/dbconnection");
const { containerClient } = require("../../../utils/azureconfig");
var { StudentSem, MarksheetProofs } = require("../../../models/students");
const { studentVerification } = require("../../../models/roles");
const saveFile = require("../../../utils/files");

const updatesem = async (req, res) => {
  try {
    // const arr={"studentStId":2,marks:[{"subjectSubid":32 ,"scoredgrade":10,"monthyrpass":"2020/1/1"},{"subjectSubid":33 ,"scoredgrade":10,"monthyrpass":"2020/1/1"},{"subjectSubid":34 ,"scoredgrade":10,"monthyrpass":"2020/1/1"}]}
    const marr = res.locals.marks;
    const studentStId = res.locals._id 

    console.log(marr)
    
    var updatearr = [];
    
    //if student is waiting to be verified , don't update them !!
    const marksheet = await MarksheetProofs.findOne({
        where:{
           studentStId 
        },
        include :{
          model : studentVerification
        }
    })

     if(marksheet){
        const status = marksheet.getDataValue("student_verification.status")
        if(status) {
           return res.status(400).send({message:"Can update a verified semester marks"})
        }
     }

    for (let i = 0; i < marr.length; i++) {
      let getrow = await StudentSem.findOne({
        where: {
          subjectSubid: marr[i].subjectSubid,
          studentStId,
        },
      });

      if (getrow === null) {
        return res.status(400).send({
          message:
            "Subject Id : " + marr[i].subjectSubid + " doesn't belongs to!",
        });
      } else {
        if(!marr[i].monthyrpass) 
           marr[i].monthyrpass = new Date().toLocaleDateString();
        else 
          marr[i].monthyrpass = new Date(marr[i].monthyrpass).toLocaleDateString();


        updatearr.push(`UPDATE studentsems
                SET scoredgrade=${marr[i].scoredgrade}, attempts=${
                  marr[i].attempts 
                },monthyrpass='${marr[i].monthyrpass}' 
                WHERE id=${getrow.id};`);
      }
    }

    const t = await sequelize.transaction() 

    for (let i = 0; i < updatearr.length; i++) {
      await sequelize.query(updatearr[i],{transaction:t});
    }

    await t.commit() ;

    return res.status(200).send({ message: "Updated successfully" });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error" });
  }
};

const uploadMarkSheet = async (req, res) => {
  try {

    const getmarksheet = await MarksheetProofs.findOne({
      where: {
        studentStId: res.locals._id,
        semester_no: req.body.semester_no,
      },
      include :{
        model : studentVerification 
      }
    });
    
    //creating marksheets for first time !! 
    if(!getmarksheet){
      
      const url = await saveFile(req.file.buffer, "student-proof" ,  res.locals._id+"semester_"+ req.body.semno);

      const t=  await sequelize.transaction()

      const verify = await studentVerification.create({
        proofLink : url ,
        status : false ,
        isRejected: false 
      },{transaction:t})

      const verifyId = verify.getDataValue("id")

      await MarksheetProofs.create({
         studentStId : res.locals._id ,
         semester_no: req.body.semester_no,
         studentVerificationId : verifyId 
      },{transaction:t})

      await t.commit() 

    }
    else {
      
      const verify = getmarksheet.getDataValue("student_verification")
    
      const verifyId = verify.getDataValue("id")

      const status = verify.getDataValue("status")

      const isRejected = verify.getDataValue("isRejected")

      if(status&&!isRejected) {
        return res.status(400).send({message:"marksheet is verified already "})
      }
      else {
        
        const prev = verify.getDataValue("proofLink")

        console.log("prev file has to be deleted here !!")

        //delete prev files 
        const url = await saveFile(req.file.buffer, "student-proof" ,  res.locals._id+"semester_"+ req.body.semno);

        await studentVerification.update({
           proofLink : url ,
           status : false ,
           isRejected : false 
        },{
          where : {
             id: verifyId 
          }

        })

        return res.status(200).send({message:"marksheet is updated!! "})

      }
      
    }

    return res.status(200).send({ message: "Uploaded successfully" });

  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error" });
  }
};
module.exports = { updatesem, uploadMarkSheet };
