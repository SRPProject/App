var logger=require("../utils/log")(module);

const express=require('express')
const router=express.Router()
const auth=require('../controllers/auth')
const  authValidator=require("../validators/authValidator");
const { validate } = require("../validators/index");

router.get('/JWTVerify',auth.JWTVerify) ; 

router.post(
  "/admin",
  authValidator.loginValidator,
  validate,
  (req, res,next) => {
    res.locals.role = "Admin";
    next()
  },
  auth.login
);
  
router.post(
  "/faculty",
  authValidator.loginValidator,
  validate,
  (req, res,next) => {
    res.locals.role = "Faculty";
    next()
  },
  auth.login
);

router.post(
  "/student",
  authValidator.StdloginValidator,
  validate,
  (req, res,next) => {
  
    res.locals.role = "Student";
    next()
  },
  auth.login
);
  
// router.post("/signup-admin",auth.signup) //no need just for testing

router.post("/forgot-password", 
    authValidator.ForgotPasswordValidator,
    validate,
    auth.password.ForgotPassword,
  );

router.post("/forgot-password-student", 
  authValidator.ForgotPasswordStdValidator,
  validate,
  (req,res,next)=>{
    res.locals.stdauthkey=1;
    next();
  },
  auth.password.ForgotPassword,
);

router.post("/set-password", 
    authValidator.SetPasswordValidator,
    validate,
    auth.password.SetPassword);

router.post("/set-password-student", 
    authValidator.SetPasswordValidator,
    validate,
    (req,res,next)=>{
      res.locals.stdauthkey=1;
      next();
    },
auth.password.SetPassword);

router.use(function(req, res, next) {
    return res.status(404).send({message:"Not Found"});
});

module.exports=router;
