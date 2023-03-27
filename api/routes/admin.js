const express=require('express')
const router=express.Router()
const admin=require('../controllers/admin')

router.put('/addDepartment',admin.addDepartments)

module.exports=router;