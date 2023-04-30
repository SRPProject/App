var logger = require("../../../utils/log")(module);
var {StuPersonalDetails,Students}=require("../../../models/students");

const addgereralDetails=async (req,res)=>{
    try{
        var mail=req.body.mail;
        const data = await Students.findOne({
            where: {
            mail: mail,//change this id : res.locals.id
            },
        });
        if(data===null){
            return res.status(401).send({mail:mail,message:"Student account doesn't exists"});
        }
        else{
            const getStd = await StuPersonalDetails.findOne({
              where: {
                studentStId: data.st_id,
              },
            });
            if (getStd === null) {
                const entry = {
                  regnum: req.body.regnum,
                  sex: Number(req.body.sex),
                  cutoffmark: Number(req.body.cutoffmark),
                  admittedon: new Date(req.body.admittedon),
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  dob: new Date(req.body.dob),
                  bloodgroup: req.body.bloodgroup,
                  specialcategory: req.body.specialcategory,
                  community: req.body.community,
                  volunteer: req.body.volunteer,
                  accomodation: Number(req.body.accomodation),
                  fathername: req.body.fathername,
                  fatherjob: req.body.fatherjob,
                  fatherincome: Number(req.body.fatherincome),
                  motherjob: req.body.motherjob,
                  mothername: req.body.mothername,
                  motherincome: Number(req.body.motherincome),
                  parentaddress: req.body.parentaddress,
                  parentemail: req.body.parentemail,
                  parentphonenum: Number(req.body.parentphonenum),
                  localgname: req.body.localgname,
                  localgaddr: req.body.localgaddr,
                  localgphone: Number(req.body.localgphone),
                  localgmail: req.body.localgmail,
                  studentStId: data.st_id,
                };
                const addstd=await StuPersonalDetails.create(entry);
                return res.status(200).send({message:"Added successfully!"});
            } 
            else {
              return res
                .status(401)
                .send({
                  rollnum: getstd.regnum,
                  message: "Student details already exists",
                });
            }
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:err});
    }
}
module.exports={addgereralDetails}

