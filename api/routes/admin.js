const express=require('express')
const router=express.Router()
const admin=require('../controllers/admin')
const {verifyAdminToken}=require('../utils/commonfns');

//add student 
//map student-faculty
//add regulation and subject 
//download reports  

router.put('/addDepartment',verifyAdminToken,admin.addDepartments)

module.exports=router;