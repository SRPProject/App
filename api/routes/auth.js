const express=require('express')
const router=express.Router()
const auth=require('../controllers/auth')

// router.put('/authsave',admin.authsave)

// router.post('/authlogin',admin.authlogin)

// router.post('/authotp',admin.authotp)

// router.post('/authverifyotp',admin.authverifyotp)

// router.post('/newstudent',admin.createnewstudent)
router.head('/verifyJWT',auth.VerifyToken)
router.post('/createAdmin',auth.AdminSave);
router.post('/adminLogin',auth.AdminLogin);
router.post('/forgot-password',auth.ForgotPassword);
router.post('/:userId/:linkCode',auth.SetPassword)


module.exports=router;