const { body, header, param, query } = require("express-validator");
const { validate } = require("../validators");

const addStudValidator=async  (req,res,next)=>{
    await body("mail")
        .notEmpty()
        .withMessage("Email is required!")
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
    .run(req);
  next()
}

module.exports={addStudValidator}