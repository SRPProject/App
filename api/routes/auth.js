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
    "/student",
    (req, res,next) => {
      res.locals.role = "Student";
      next()
    },
    auth.login
);

router.post("/signup-admin",auth.signup)
//router.post("/forgot-password", auth.password.ForgotPassword);

// router.post("/set-password/:userId/:linkCode", auth.password.SetPassword);

module.exports = router;
