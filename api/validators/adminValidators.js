const { body, header, param, query } = require("express-validator");
const { validate } = require(".");

const addStudValidator=async  (req,res,next)=>{
    await body("mail")
        .notEmpty()
        .withMessage("Email is required!")
        .bail()
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("Invalid Email")
        .run(req);

  await body("distDepartmentDeptid")
      .notEmpty()
      .withMessage("Department is required!")
      .run(req);
  
  await body("batchId")
      .notEmpty()
      .withMessage("Batch is required!")
      .run(req);

  await body("degreeDegid")
      .notEmpty()
      .withMessage("Degree is required!")
      .run(req);

  await body("regulationRegid")
      .notEmpty()
      .withMessage("Regulation is required!")
      .run(req);

  await body("regnum")
    .notEmpty()
    .withMessage("rollnum invalid")
    .run(req);

	await body("sex")
		.notEmpty()
    .withMessage("gender field invalid")
		.run(req);

  await body("firstname")
		.notEmpty()
		.withMessage("firstname invalid")
		.run(req);

  await body("lastname")
		.notEmpty()
		.withMessage("firstname invalid")
		.run(req);

  await body("dob")
    .notEmpty()
    .withMessage("dob invalid")
    .bail()
    .isDate()
    .withMessage("Must be a valid date")
    .run(req);
  await body("facultyFacid")
    .notEmpty()
    .withMessage("Faculty id not defined in body")
    .bail()
    .isNumeric()
    .withMessage("Invalid Faculty id")
    .run(req)
  next()
}
const addFacultyValidator=async(req,res,next)=>{
  await body("mail")
    .notEmpty()
    .withMessage("Email is required!")
    .bail()
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid Email")
    .run(req);

  await body("distDepartmentDeptid")
    .notEmpty()
    .withMessage("Department is required!")
    .run(req);

  next()
}
module.exports={addStudValidator,addFacultyValidator}