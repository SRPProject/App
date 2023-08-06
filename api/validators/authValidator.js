const { body, header, param, query } = require("express-validator");
const { validate, wrap } = require("../validators");

const studentSignupValidator = async (req, res, next) => {
  await body("total_sem")
    .notEmpty()
    .withMessage("sem no is not defined")
    .run(req);

  await body("batchId").notEmpty().withMessage("bacth is not defined").run(req);

  await body("name").notEmpty().withMessage("name not defined").run(req);

  await body("mail").notEmpty().withMessage("email not defined").run(req);

  await body("password")
    .notEmpty()
    .withMessage("Password not defined")
    .run(req);

  await body("regnum")
    .notEmpty()
    .withMessage("Register number not defined")
    .run(req);

  await body("distFacultyFacultyId")
    .notEmpty()
    .withMessage("faculty not defined")
    .isNumeric()
    .withMessage("faculty is not defined")
    .run(req);

  await body("student-proof")
    .custom(async (value, { req }) => {
      if (req.file === undefined) {
        throw new Error("Empty file");
      }
      if (req.file.mimetype !== "application/pdf") {
        throw new Error("Invalid file type");
      } else if (Number(req.file.size) > 1024 * 1024) {
        throw new Error("File size exceeds the limit greater than 1MB");
      }
    })
    .run(req);

  next();
};

const loginValidator = async (req, res, next) => {
  await body("mail")
    .notEmpty()
    .withMessage("Empty ")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid")
    .run(req);
  await body("password").notEmpty().withMessage("Empty").run(req);

  next();
};

const StdloginValidator = async (req, res, next) => {
  await body("regnum")
    .notEmpty()
    .withMessage("Empty")
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage("Invalid")
    .run(req);
  await body("password").notEmpty().withMessage("Empty").run(req);

  next();
};

const SetPasswordValidator = async (req, res, next) => {
  await body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("password length invalid")
    .bail()
    .withMessage("password not defined in body")
    .run(req);
  
  await body("linkCode")
    .notEmpty()
    .withMessage("link code not define in body")
    .run(req);

  next();
};
const ForgotPasswordValidator = async (req, res, next) => {
  await body("mail")
    .notEmpty()
    .withMessage("Email is required!")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid Email")
    .run(req);
  next();
};
const ForgotPasswordStdValidator = async (req, res, next) => {
  await body("regnum")
    .notEmpty()
    .withMessage("Roll Number invalid")
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage("Roll Number invalid")
    .run(req);
  next();
};
module.exports = {
  studentSignupValidator,
  loginValidator,
  SetPasswordValidator,
  ForgotPasswordValidator,
  ForgotPasswordStdValidator,
  StdloginValidator,
};
