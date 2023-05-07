var logger = require("../../../utils/log")(module);
var {StuPersonalDetails,Students}=require("../../../models/students");

const addgereralDetails=async (req,res)=>{
    try{
        const getStd = await StuPersonalDetails.findOne({
          where: {
            studentStId: res.locals._id,
        }})

        if(getStd && !getStd.isfilled){
          const entry = {
            cutoffmark: Number(req.body.cutoffmark),
            admittedon: new Date(req.body.admittedon),
            bloodgroup: req.body.bloodgroup,
            specialcategory: req.body.specialcategory,
            community: req.body.community,
            volunteer: req.body.volunteer,
            accomodation: Number(req.body.accomodation),//0=dayscholar //1=Hosteller
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
            isfilled:true,
           
          };
          await getStd.update(entry);
          return res.status(200).send({message:"Added successfully!"});
        }
        else {
          return res
            .status(400)
            .send({
              message: "invalid",
            });
        }
      }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:err});
    }
}
module.exports={addgereralDetails}

