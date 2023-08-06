const express = require("express");
const router = express.Router();
const facultyUpdate = require("../controllers/faculty/updateentries");
const facultyGetter = require("../controllers/faculty/getentries")

const validator = require("../validators/facultyValidator")
const { validate } = require("../validators/index");

router.get("/get-batches",facultyGetter.getBatches) // get all batches handled by a faculty 

router.post("/get-students", validator.getStudentValidator , validate , facultyGetter.getStudent); // get verification details of my students with this academic year

router.post("/verify", validator.updateStudentValidator, validate,  facultyUpdate.updateStudent); // update status of students in bulk for this verification type

router.post("/get-students/semester",validator.getAcademicsValidator,validate, facultyGetter.getAcademics); // get verification details of my students with this academic year

router.post("/verify/semester",validator.updateAcademicsValidator,validate, facultyUpdate.updateAcademics); // get verification details of my students with this academic year

router.post("/get-students/auth", validator.getStudentValidator ,  validate,facultyGetter.getStudentAuth)

router.post("/verify/auth" , validator.updateStudentValidator ,  validate, facultyUpdate.updateStudentAuth)

module.exports = router;
