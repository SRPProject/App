var logger = require("../../../utils/log")(module);
const { Students, StudentSem, MarksheetProofs } = require("../../../models/students");

const { Subjects } = require("../../../models/comod");

const sequelize = require("../../../config/dbconnection");
const { studentVerification } = require("../../../models/roles");

// to be implemented : get all subjects of students of semester !!

const getstudentsem = async (req, res) => {
  try {
    
      const studentStId = res.locals._id;
      
      const semester_no = req.body.sem;

      const data = await StudentSem.findAll({
          where :{
             studentStId,
             semester_no 
          },
          include : {
            model : Subjects ,
          },
          raw : true ,
      })

      let newData = {};

      //send based on subjects type 
      data.forEach(item=>{
        
        let type= item['subject.typeofsub'] 

        if(!(type in newData)){
            newData[type] = []  
        }

        newData[type].push(item)

      })

      console.log(newData)

    return res.status(200).send({ message: newData });
    
    
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error Try again." });
  }
};

// returns marksheets 
const getVerificationData = async(req,res)=>{

  try {

      const studentStId = res.locals._id , semester_no = req.body.semester_no  

      const sem = await MarksheetProofs.findOne({
        where : {
          studentStId ,
          semester_no 
        },
        include : {
          model : studentVerification 
        },
        raw : true 
      })

      return res.json({message:sem})

  }
  catch(err){
      return res.status(400).json({message:"Server Error"})
  }

}

module.exports = { getstudentsem ,getVerificationData };
