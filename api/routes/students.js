var logger=require("../utils/log")(module);

const express=require('express')
const router=express.Router()
const generaldetails=require('../controllers/students/updateentries/generaldetails')
const  DetailsValidator=require("../validators/DetailsValidator");
const { validate } = require("../validators/index");
const {getstudentsem}=require("../controllers/students/getentries/getstudentsem");
const {updatesem,uploadMarkSheet,getmarksheet}=require("../controllers/students/updateentries/semmark");
const {addintern,addplacement, addscholarship}=require("../controllers/students/addentries/adddetails");
const {getInterndetails,getplacement,getPersonalDetails,getScholarship,studentsemscount}=require("../controllers/students/getentries/getdetails")

const multer=require("multer");
const upload=multer({storage:multer.memoryStorage({})});


router.post("/updateStudentPersonal",
    DetailsValidator.addDetailsValidator,
    validate,
    generaldetails.addgereralDetails
)
router.post("/addinterndetails",
    DetailsValidator.internDetailsValidator,
    validate,
    addintern
)
router.post("/addplacements",
    DetailsValidator.placementDetailsValidator,
    validate,
    addplacement
)
router.post("/addscholarhip",
    upload.single('scholarshipproof'),
    DetailsValidator.scholarshipvalidator,
    validate,
    addscholarship
)
router.post("/updateSemMark",
    DetailsValidator.SemMarkValidator,
    validate,
    updatesem

)


router.post("/uploadMarkSheet",
    upload.single('marksheet'),
    DetailsValidator.MarksheetValidator,
    validate,
    uploadMarkSheet
)

router.get("/studentsemcount",studentsemscount);
router.get("/getPersonalDetails",getPersonalDetails)

router.get("/studentsem", getstudentsem)

router.get("/getinterndetails",getInterndetails)

router.get("/getplacementdetails",getplacement);
router.get("/getscholarshipdetails",getScholarship);
router.use(function(req, res, next) {
    return res.status(404).send({message:"Not Found"});
});
module.exports=router;