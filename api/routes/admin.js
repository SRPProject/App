const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage({}) });

const admin = require("../controllers/admin/addentries/admin");

const {
  addStudValidator,
  addFacultyValidator,
  addDeptValidator,
  addRegValidator,
  addDegreeValidator,
  addBulkStdsValiadtor,
  addSubjectValidator,
  addBatchValidator,
} = require("../validators/adminValidators");

const { validate } = require("../validators/index");

const {
  addStudent,
  addBulkStudents,
} = require("../controllers/admin/addentries/student");
const {
  getSampleExcel,
  getStudentScholarship,
  getProjectReport,
  getPlacementReport,
  getInternshipsReport,
} = require("../controllers/admin/getentries/student");
const { addFaculty } = require("../controllers/admin/addentries/faculty");

const {
  getDepartments,
  getRegulations,
  getDegrees,
  getBatches,
} = require("../controllers/admin/getentries/admin");

router.post("/addDepartment", addDeptValidator, validate, admin.addDepartments);

router.post("/addRegulation", addRegValidator, validate, admin.addRegulation);

router.post("/addDegree", addDegreeValidator, validate, admin.addDegree);

router.post(
  "/addSubjects",
  addSubjectValidator,
  validate,
  admin.addingSubjects,
);
router.post("/addStudent", addStudValidator, validate, addStudent);

router.post("/addFaculty", addFacultyValidator, validate, addFaculty);

router.post(
  "/addBulkStudents",
  upload.single("studentslist"),
  addBulkStdsValiadtor,
  validate,
  addBulkStudents,
);

router.post("/addBatches", addBatchValidator, validate, admin.addBatches);

router.get("/getscholarship", getStudentScholarship);
router.get("/getProjectReport", getProjectReport);
router.get("/getPlacementReport", getPlacementReport);
router.get("/getInternshipsReport", getInternshipsReport);

router.get("/getbulkStudentssheet", getSampleExcel);

router.get("/getDepartments", getDepartments);
router.get("/getRegulations", getRegulations);
router.get("/getDegrees", getDegrees);
router.get("/getBatches", getBatches);

router.use(function (req, res, next) {
  return res.status(404).send({ message: "Not Found" });
});

module.exports = router;
