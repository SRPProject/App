var logger=require("../utils/log")(module);

const express=require('express')
const router=express.Router()
const generaldetails=require('../controllers/students/generaldetails')
const  generalDetailsValidator=require("../validators/generalDetailsValidator");
const { validate } = require("../validators/index");
const {getstudentsem}=require("../controllers/students/getstudentsem")
router.post("/general",
    generalDetailsValidator.addDetailsValidator,
    validate,
    generaldetails.addgereralDetails
)
router.get("/studentsem",
// async(req,res,next)=>{
//     if(res.locals._id) {next()}
//     else {return res.status(400).send({message:"unauthorized"})}
// },
getstudentsem)
module.exports=router;