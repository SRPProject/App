const { body, header, param, query } = require("express-validator");
const { validate ,wrap } = require("../validators");


const loginValidator = async (req, res, next) => {
	await body("mail")
		.notEmpty()
		.withMessage("Empty ")
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage("Invalid")
		.run(req);
	await body("password")
		.notEmpty()
		.withMessage("Empty")
		.run(req);

	next();
}

const StdloginValidator=async (req, res, next) => {
	await body("regnum")
		.notEmpty()
        .withMessage("Empty")
        .bail()
		.isLength({ min: 10,max:10 })
		.withMessage("Invalid")
		.run(req);
	await body("password")
		.notEmpty()
		.withMessage("Empty")
		.run(req);

	next();
}

const SetPasswordValidator=async(req,res,next)=>{
	await body("password")
		.notEmpty()
		.isLength({ min: 6 })
		.withMessage("password length invalid")
		.bail()
		.withMessage("password not defined in body")
		.run(req);
	await body("confirmpassword")
		.notEmpty()
		.isLength({ min: 6 })
		.withMessage("password length invalid")
		.bail()
		.withMessage("confirm-password not defined in body")
		.bail()
		.run(req);
	await body("userId")
		.notEmpty()
		.withMessage("userID not defined")
		.run(req)
	await body("linkCode")
		.notEmpty()
		.withMessage("link code not define in body")
		.run(req)

	next();
}
const ForgotPasswordValidator=async(req,res,next)=>{
	await body("mail")
		.notEmpty()
		.withMessage("Email is required!")
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage("Invalid Email")
		.run(req);
	next()
}
const ForgotPasswordStdValidator=async(req,res,next)=>{
	await body("regnum")
		.notEmpty()
        .withMessage("Roll Number invalid")
        .bail()
		.isLength({ min: 10,max:10 })
		.withMessage("Roll Number invalid")
		.run(req);
	next()
}
module.exports = {
	loginValidator,
	SetPasswordValidator,
	ForgotPasswordValidator,
	ForgotPasswordStdValidator,
	StdloginValidator
}

