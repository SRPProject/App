// student ,admin ,faculty signup ;;

var logger = require("../../utils/log")(module);
const sequelize = require("../../config/dbconnection");
const { Admin, studentVerification } = require("../../models/roles");
const bcrypt = require("bcrypt");
const { Students } = require("../../models/students");
const saltRounds = 10;
const { Op } = require("sequelize");
const saveFile = require("../../utils/files");
const { getHashPassword, verifyPassword } = require("../../utils/password");

//////////////////////////////////////////////////
//student -signup

const studentSignup = async (req, res) => {
  let data = req.body;

  //pre checking

  try {
    data.password = await getHashPassword(data.password);
    console.log(data)

    const student = await Students.findOne({
      where: {
        [Op.or]: [{ mail: data.mail }, { regnum: data.regnum }],
      },
      attributes: ["isCreated", "st_id" ],
      include : {
         model : studentVerification 
      }
    });

    //if student found !!

    if (student) {
      const isCreated = student.getDataValue("isCreated");

      if (isCreated)
        return res.status(400).send({ message: "Account already exists" });

      const verify = student.getDataValue("student_verification")
      
        if (!verify.getDataValue("status"))
          return res.status(400).send({ message: "Verification Pending" });

        if (verify.getDataValue("isRejected"))
          return res.status(400).send({ message: "Account rejected" });
      
    }
    

    const t = await sequelize.transaction();

    data.isCreated = false;

    //create new student
    let newStudent = await Students.create(data, { transaction: t });

    const id = newStudent.st_id;

    //create blob

    //save to local file system
    const url = await saveFile(req.file.buffer, "student-proof", id);

    // const blobname= id +"_student_proof";
    // const blockBlobClient = containerClient("marksheetproofs").getBlockBlobClient(blobname);
    // const file =req.file.buffer;
    // await blockBlobClient.upload(file, file.length);
    // const url = await azureBlobSaSUrl("marksheetproofs",blobname)

    //login verfication

    const verify = await studentVerification.create(
      {
        proofLink: url,
        status: false,
        isRejected: false,
      },
      { transaction: t , returning:true},
    );

    await newStudent.update({"studentVerificationId":verify.getDataValue("id")},{
      transaction: t 
    }) 


    await t.commit();

    return res.status(200).send({ message: "Details Submitted Suceesfully" });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: err });
  }
};

///////////////////////////////////////////////////////

// faculty -signup ====  admin adding faculty

// sending email to faculties after extracting excel sheet

///////////////////////////////////////////////////////

const adminSignup = async (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;

  logger.info(mail, password);

  if (!mail || !password) return res.status(400).send({ message: "Failure" });

  try {
    const data = await Admin.findOne({
      where: {
        mail: mail,
      },
    });

    //account already exists
    if (data)
      return res.status(400).send({ message: "Account already exists" });

    // hash password and save
    const hashPassword = await getHashPassword(password);

    await Admin.create({
      mail,
      password: hashPassword,
    });

    return res.status(200).send({ message: "Account Created Successfully" });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: err });
  }
};

module.exports = { adminSignup, studentSignup };
