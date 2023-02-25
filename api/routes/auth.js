const express=require('express')
const router=express.Router()
const auth=require('../controllers/auth')

// router.put('/authsave',admin.authsave)

// router.post('/authlogin',admin.authlogin)

// router.post('/authotp',admin.authotp)

// router.post('/authverifyotp',admin.authverifyotp)

// router.post('/newstudent',admin.createnewstudent)

router.post('/createAdmin',auth.AdminSave);
router.post('/adminLogin',auth.AdminLogin);


module.exports=router;