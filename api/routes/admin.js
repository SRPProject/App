const express=require('express')
const router=express.Router()
const multer=require("multer");
const upload=multer({storage:multer.memoryStorage({})});

const admin=require('../controllers/admin/addentries/admin')

const {addStudValidator,addFacultyValidator,addDeptValidator,
  addRegValidator,addDegreeValidator,addBulkStdsValiadtor}=require("../validators/adminValidators");

const { validate } = require("../validators/index");

const {addStudent,addBulkStudents}=require("../controllers/admin/addentries/student");

const {addFaculty}=require("../controllers/admin/addentries/faculty");



router.post('/addDepartment',addDeptValidator,validate,admin.addDepartments);

router.post('/addRegulation',addRegValidator,validate,admin.addRegulation);

router.post("/addDegree",addDegreeValidator,validate,admin.addDegree);


router.post('/addStudent',
    addStudValidator,
    validate,
    addStudent
)

router.post('/addFaculty',
  addFacultyValidator,
  validate,
  addFaculty
)

router.post('/addBulkStudents',
  upload.single('studentslist'),
  addBulkStdsValiadtor,
  validate,
  addBulkStudents
)


router.use(function(req, res, next) {
  return res.status(404).send({message:"Not Found"});
});

module.exports=router;