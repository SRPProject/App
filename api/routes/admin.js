const express=require('express')
const router=express.Router()
const admin=require('../controllers/admin/addentries/admin')
const {addStudValidator,addFacultyValidator}=require("../validators/adminValidators");
const { validate } = require("../validators/index");
const {addStudent}=require("../controllers/admin/addentries/student");
const {addFaculty}=require("../controllers/admin/addentries/faculty");

router.put('/addDepartment',admin.addDepartments)

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


router.use(function(req, res, next) {
  return res.status(404).send({message:"Not Found"});
});

module.exports=router;