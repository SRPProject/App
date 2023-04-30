var logger=require("../utils/log")(module);

const express=require('express')
const router=express.Router()
const generaldetails=require('../controllers/students/addentries/generaldetails')
const  DetailsValidator=require("../validators/DetailsValidator");
const { validate } = require("../validators/index");
const {getstudentsem}=require("../controllers/students/getentries/getstudentsem");
const {updatesem,uploadMarkSheet}=require("../controllers/students/updateentries/semmark");
const {addintern,addplacement, addscholarship}=require("../controllers/students/addentries/addinterndetails");
const multer=require("multer");
const upload=multer({storage:multer.memoryStorage({})});


router.post("/general",
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
router.get("/studentsem",   
    getstudentsem)


router.post("/updateSemMark",
    DetailsValidator.SemMarkValidator,
    validate,
    updatesem

)
router.post("/uploadMarkSheet",
    upload.single('marksheet'),
    DetailsValidator.MarksheetValidator,
    uploadMarkSheet
)


router.use(function(req, res, next) {
    return res.status(404).send({message:"Not Found"});
});
module.exports=router;