const express=require('express')
const router=express.Router()
const admin=require('../controllers/admin')
const {verifyAdminToken}=require('../utils/commonfns');

router.put('/addDepartment',verifyAdminToken,admin.addDepartments)

module.exports=router;