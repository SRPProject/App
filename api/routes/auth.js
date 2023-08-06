var logger = require("../utils/log")(module);

const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth/");
const authValidator = require("../validators/authValidator");
const { validate } = require("../validators/index");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage({}) });

//// newly addded
router.get("/get-data", auth.getData);

router.get("/JWTVerify", auth.JWTVerify);

router.post(
  "/student/signup",
  upload.single("student-proof"),
  authValidator.studentSignupValidator,
  validate,
  auth.signup.studentSignup,
);

router.post("/admin/signup", auth.signup.adminSignup);

router.post(
  "/admin",
  authValidator.loginValidator,
  validate,
  auth.login.adminLogin,
);

router.post(
  "/faculty",
  authValidator.loginValidator,
  validate,
  auth.login.facultyLogin,
);

router.post(
  "/student",
  authValidator.StdloginValidator,
  validate,
  auth.login.studentLogin,
);

// router.post("/signup-admin",auth.signup) //no need just for testing

router.post(
  "/forgot-password",
  authValidator.ForgotPasswordValidator,
  validate,
  auth.password.ForgotPassword,
);

router.post(
  "/forgot-password-student",
  authValidator.ForgotPasswordStdValidator,
  validate,
  (req, res, next) => {
    res.locals.stdauthkey = 1;
    next();
  },
  auth.password.ForgotPassword,
);


//enables faculty to set password !! 
router.post(
  "/set-password",
  authValidator.SetPasswordValidator,
  validate,
  auth.password.SetPassword,
);



router.use(function (req, res, next) {
  return res.status(404).send({ message: "Not Found" });
});

module.exports = router;
