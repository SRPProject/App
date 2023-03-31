const { body, header, param, query } = require("express-validator");
const { validate } = require("../validators");

const addDetailsValidator=async(req,res,next)=>{
    await body("mail")
		.notEmpty()
		.withMessage("Email is required!")
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage("Invalid Email")
		.run(req);

    await body("regnum")
		.notEmpty()
        .withMessage("rollnum invalid")
        .bail()
		.isLength({ min: 10,max:10 })
		.withMessage("rollnum length invalid")
		.run(req);

	await body("sex")
		.notEmpty()
        .withMessage("gender field invalid")
        .bail()
		.isLength({ min: 1,max:1 })
		.withMessage("gender field invalid")
		.run(req);

	await body("cutoffmark")
		.notEmpty()
		.withMessage("cutoffmark not defined")
		.run(req)

    await body("admittedon")
        .notEmpty()
		.withMessage("admittedon not defined")
		.run(req)

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

    await body("bloodgroup")
        .notEmpty()
        .withMessage("dob invalid")
        .run(req);

    await body("specialcategory")
        .notEmpty()
        .withMessage("specialcategory invalid")
        .run(req);

    await body("community")
        .notEmpty()
        .withMessage("community invalid")
        .run(req);

    await body("volunteer")
        .notEmpty()
        .withMessage("volunteer invalid")
        .run(req);

    await body("accomodation")
        .notEmpty()
        .withMessage("accomodation invalid")
        .run(req);

    await body("fathername")
        .notEmpty()
        .withMessage("fathername invalid")
        .run(req);

    await body("fatherjob")
        .notEmpty()
        .withMessage("fatherjob invalid")
        .run(req);

    await body("fatherincome")
        .notEmpty()
        .withMessage("fatherincome invalid")
        .run(req);
    

    await body("mothername")
        .notEmpty()
        .withMessage("mothername invalid")
        .run(req);

    await body("motherjob")
        .notEmpty()
        .withMessage("motherjob invalid")
        .run(req);

    await body("motherincome")
        .notEmpty()
        .withMessage("motherincome invalid")
        .run(req);

    await body("parentaddress")
        .notEmpty()
        .withMessage("parentaddress invalid")
        .run(req);

    await body("parentemail")
        .notEmpty()
        .withMessage("Parent Email is required!")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("Invalid Parent Email")
        .run(req);
    
    await body("parentphonenum")
        .notEmpty()
        .withMessage("parent phone number invalid")
        .bail()
        .isLength({ min: 10,max:10 })
        .withMessage("parent phone number length invalid")
        .run(req);

    await body("localgname")
        .notEmpty()
        .withMessage("parentaddress invalid")
        .run(req);
    
    await body("localgaddr")
        .notEmpty()
        .withMessage("localguardian address invalid")
        .run(req);
    
    await body("localgphone")
        .notEmpty()
        .withMessage("local guard phone number invalid")
        .bail()
        .isLength({ min: 10,max:10 })
        .withMessage("local guard phone number length invalid")
        .run(req);
    
    await body("localgmail")
        .notEmpty()
        .withMessage("local guard Email is required!")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("local guard Email invalid")
        .run(req);

	next();
}

module.exports={
    addDetailsValidator
}