const express=require('express')
const router=express.Router()
const admin=require('../controllers/admin')
const {addStudValidator}=require("../validators/addStudValidators");
const { validate } = require("../validators/index");
const {addStudent}=require("../controllers/admin/addStudent");

router.put('/addDepartment',admin.addDepartments)
router.post('/addStudent',
    addStudValidator,
    validate,
    addStudent

)
module.exports=router;