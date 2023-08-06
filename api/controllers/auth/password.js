//forgot password for faculty and student
//set-password for faculty !!

var logger = require("../../utils/log")(module);
const jwt = require("jsonwebtoken");
const { jwtDetails } = require("../../config/config")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendMail } = require("../../utils/mail");
const { Admin, Faculty, Verification } = require("../../models/roles");
const { Students } = require("../../models/students");
const { verifyToken } = require("../../utils/token");
const { getHashPassword } = require("../../utils/password");
const saltRounds = 10;

const ForgotPassword = async (req, res) => {
  try {
    var lcode = 0;
    var mail = "";

    if (res.locals.stdauthkey === 1) {
      mail = await isStudent(req.body.regnum);

      if (mail) {
        lcode = 12;
      } else {
        return res.status(400).send({ message: "Roll Number not exists" });
      }
    } else {
      mail = req.body.mail;
      const checkAdmin = await isAdmin(mail);
      const checkFA = await isFA(mail);
      if (!checkAdmin && !checkFA) {
        return res.status(401).send({ message: "Unauthorized." });
      } else if (checkAdmin) {
        lcode = 4;
      } else if (checkFA) {
        lcode = 8;
      }
    }
    await sendVerificationLink(req, res, mail, lcode, 0);
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error" });
  }
};

//only for faculty !! 
const SetPassword = async (req, res) => {

  try {
    
    const {linkCode,password} = req.body

    const verify = await Verification.findOne({
      where : {
         linkCode 
      }
    })

    console.log(linkCode)

    if(!verify) {
      console.log("hi")
      return res.status(500).send({message:"LinkCode is Not valid"} )
    }

    //parse 
    const details = jwt.verify(linkCode,jwtDetails.secret)

    if(!details) {
       await Verification.destroy({
         where : {
           linkCode 
         }
       })
       return res.status(500).send({message:"LinkCode is Not valid"} )
    }

    const hashPassword = await getHashPassword(password)

    await Faculty.update({
      password : hashPassword,
      isCreated : true 
    },{
      where : {
         mail : details.mail  
      }
    }) 

    await Verification.destroy({
      where :{
         linkCode 
      }
    })

    return res.status(200).send({ message: "Account has been activated ,Please Login !" })
    
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: err });
  }
};

// helpers
const isAdmin = async (mail) => {
  const data = await Admin.findOne({
    where: {
      mail: mail,
    },
  });
  return data != null ? true : false;
};

const isFA = async (mail) => {
  const data = await Faculty.findOne({
    where: {
      mail: mail,
    },
  });
  return data != null ? true : false;
};

const isStudent = async (regnum) => {
  const data = await Students.findOne({
    where: {
      regnum: regnum,
    },
  });
  return data != null ? data.mail : false;
};


const sendVerificationLink = async (req, res, mail) => {
  
  try {
    
    let token = jwt.sign({ mail }, jwtDetails.secret, {
      expiresIn: jwtDetails.jwtExpiration,
    });

    await Verification.create({
       linkCode : token 
    })

    const html = `<a href=${token}>${token}</a>`

    const subject = "DIST-FACULTY SET_PASSWORD LINK"

    sendMail(html,subject,mail) 

    return res.status(200).send({message:"Check Faculty Mail"}) 
   
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error." });
  }
};

const sendBulkVerificationLink = async (req, res, mail, lcode, regnum) => {
  try {
    var id = "";
    var oobj = "";
    linkCode = crypto.randomBytes(lcode).toString("hex");
    const obj =
      regnum === 0
        ? await Verification.findOne({ where: { mail: mail } })
        : await Students.findOne({ where: { regnum: mail } });

    if (obj) {
      oobj = await obj.update({
        linkCode: linkCode,
        expireTime: Date.now() * 1000,
      });
      id = regnum === 0 ? oobj.verifyId : oobj.st_id;
    } else {
      oobj = await Verification.create({
        linkCode: linkCode,
        mail: mail,
        expireTime: Date.now() * 1000,
      });
      id = oobj.verifyId;
    }
    logger.info(id);
    if (id) {
      //send mail
      const [addregnum, addstdurl] =
        regnum === 0 ? ["", ""] : ["-" + regnum, "student/"];

      const link =
        process.env.DOMAIN_NAME +
        "/auth/password-set/" +
        addstdurl +
        id +
        addregnum +
        "/" +
        linkCode;
      logger.info(link);
      const html = `<h3>Reset Link: </h3> 
                            <p><a> ${link} </a></p>`;

      const subject = `Password Set-link ; Expires on ${oobj.expireTime}`;

      const isSend = await sendMail(html, subject, oobj.mail);

      console.log(isSend);

      if (isSend) {
        logger.info("Mail sent for user-->" + regnum);
      } else {
        logger.error("Mail not sent - Error" + regnum);
        // return res.status(500).send({ message: "Server Error." })
      }
    } else {
      logger.error("Id not found - Error");
      // return res.status(500).send({ message: "Server Error." })
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error." });
  }
};
module.exports = {
  ForgotPassword,
  SetPassword,
  sendVerificationLink,
  sendBulkVerificationLink,
};
