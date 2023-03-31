const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.post(
  "/admin",
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
  authValidator.loginValidator,
  validate,
  (req, res,next) => {
    res.locals.role = "Student";
    next()
  },
  auth.login
);
  
router.post("/signup-admin",auth.signup) //no need just for testing

router.post("/forgot-password", 
    authValidator.ForgotPasswordValidator,
    validate,
    auth.password.ForgotPassword,
  );

router.post("/set-password", 
    authValidator.SetPasswordValidator,
    validate,
    auth.password.SetPassword);


module.exports=router;
