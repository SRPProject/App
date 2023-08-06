// admin ,faculty ,student login

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Admin, Faculty, studentVerification } = require("../../models/roles");
const { Students } = require("../../models/students");
const { jwtDetails } = require("../../config/config");
const { verifyPassword } = require("../../utils/password");

var logger = require("../../utils/log")(module);

const studentLogin = async (req, res) => {
  try {
    const { regnum, password } = req.body;

    const data = await Students.findOne({
      where: {
        regnum,
      },
      include :{
        model: studentVerification 
      }
    });


    if (data) {
      if (!data.isCreated)
        return res
          .status(400)
          .send({ message: { regnum: "Wait for Approval" } });

      const passwordValidity = verifyPassword(password, data.password);

      if (!passwordValidity)
        return res
          .status(400)
          .send({ message: { password: "Wrong Password" } });

      const id = data.getDataValue("st_id"),
        total_sem = data.getDataValue("total_sem") , mail = data.getDataValue("mail")

      let token = jwt.sign(
        { role: "Student", id, mail, regnum, total_sem },
        jwtDetails.secret,
        {
          expiresIn: jwtDetails.jwtExpiration,
        },
      );

      return res
        .status(200)
        .json({ message: "Login success", accessToken: token });
    } else {
      return res.status(400).send({ message: { regnum: "User not Found" } });
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error" });
  }
};

////////////////////////// remaining !!

// set batches handled , id , role:faculty
const facultyLogin = async (req, res) => {

   try{
      const {mail,password} = req.body 

      const data = await Faculty.findOne({
          where : {
            mail 
          }
      })

      if(!data){
        return res.status(400).send({message:"Not Found"})
      }
      else if(!data.getDataValue("isCreated")) {
        return res.status(200).send({message:"Account is not verified and please check Mail"})
      }
      else {
        
        console.log( data.getDataValue("facultyId"))

         const passwordValidity = await verifyPassword(password,data.getDataValue("password"))

         if(!passwordValidity) return res.status(400).send({message:"Wrong Password"})

         let token = jwt.sign({ role: "Faculty", id: data.getDataValue("facultyId")  }, jwtDetails.secret, {
          expiresIn: jwtDetails.jwtExpiration,
        });
    
        return res
          .status(200)
          .send({ message: "Login success", accessToken: token });

      }

   }
   catch(err){
   console.log(err);
    return res.status(500).send({ message: "Server Error" });
   }

};

const adminLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const data = await Admin.findOne({
      where: {
        mail,
      },
    });

    if (!data)
      return res.status(400).send({ message: { mail: "Admin not Found" } });

    const passwordValidity = verifyPassword(password, data.password);

    if (!passwordValidity)
      return res.status(400).send({ message: { password: "Wrong Password" } });

    let token = jwt.sign({ role: "Admin", mail }, jwtDetails.secret, {
      expiresIn: jwtDetails.jwtExpiration,
    });

    return res
      .status(200)
      .json({ message: "Login success", accessToken: token });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error" });
  }
};

module.exports = {
  facultyLogin,
  studentLogin,
  adminLogin,
};
