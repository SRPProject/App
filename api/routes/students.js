var logger = require("../utils/log")(module);

const express = require("express");
const router = express.Router();
const generaldetails = require("../controllers/students/updateentries/generaldetails");
const DetailsValidator = require("../validators/DetailsValidator");
const { validate } = require("../validators/index");
const {
  getstudentsem,getVerificationData
} = require("../controllers/students/getentries/getstudentsem");
const {
  updatesem,uploadMarkSheet
} = require("../controllers/students/updateentries/semmark");
const {
  addintern,
  addplacement,
  addscholarship,
  addSubElectives,
  addWorkshops,
  addExtraCourses,
  addPaperPublishing,
  addHigherEducation,
  addEventHackathon,
  addProjects,
} = require("../controllers/students/addentries/adddetails");
const {
  getInterndetails,
  getplacement,
  getPersonalDetails,
  getScholarship,
  studentsemscount,
  getSubjects,
  getMarkSheet,
  getWorkshops,
  getExtraCourses,
  getPaperPublishing,
  getHigherEducation,
  getEventHackathon,
  getProjects,
} = require("../controllers/students/getentries/getdetails");
const multer = require("multer");
const { Internships } = require("../models/students");
const upload = multer({ storage: multer.memoryStorage({}) });

// newly added

router.post(
  "/addSubElectives",
  DetailsValidator.addSubElectivesValidator,
  validate,
  addSubElectives,
);

router.post(
  "/updateStudentPersonal",
  DetailsValidator.addDetailsValidator,
  validate,
  generaldetails.addgereralDetails,
);

router.post(
  "/addinterndetails",
  upload.single("proof"), 
  DetailsValidator.internDetailsValidator,
  validate,
  addintern,
);

router.post(
  "/addplacements",
  DetailsValidator.placementDetailsValidator,
  validate,
  addplacement,
);

router.post(
  "/addscholarhip",
  upload.single("proof"),
  DetailsValidator.scholarshipvalidator,
  validate,
  addscholarship,
);

router.post(
  "/updateSemMark",
  DetailsValidator.SemMarkValidator,
  validate,
  updatesem,
);

//send marksheet along with statsu 
router.post('/marksheets',getVerificationData)

router.post(
  "/uploadMarkSheet",
  upload.single("proof"),
  DetailsValidator.MarksheetValidator,
  validate,
  uploadMarkSheet,
);


router.post(
  "/addWorkshops",
  upload.single("proof"), 
  DetailsValidator.addWorkshopValidator,
  validate,
  addWorkshops,
);
router.post(
  "/addExtracourses",
  upload.single("proof"), 
  DetailsValidator.addExtraCoursesValidator,
  validate,
  addExtraCourses,
);

router.post(
  "/addPaperPublishing",
  upload.single("proof"), 
  DetailsValidator.PaperPublishingValidator,
  validate,
  addPaperPublishing,
);
router.post(
  "/addHigherEducation", 
  DetailsValidator.HigherEducationValidator,
  validate,
  addHigherEducation,
);

router.post(
  "/addEventHackathon",
  upload.single("proof"), 
  upload.single("certificate"),
  DetailsValidator.EventHackathonValidator,
  validate,
  addEventHackathon,
);

router.post(
  "/addProjects",
  upload.single("proof"), 
  DetailsValidator.ProjectsValidator,
  validate,
  addProjects,
);


router.get("/getPersonalDetails", getPersonalDetails);
router.post("/studentsem", getstudentsem);
router.get("/getMarkSheet", getMarkSheet);
router.get("/getinterndetails", getInterndetails);
router.get("/getplacementdetails", getplacement);
router.get("/getscholarshipdetails", getScholarship);
router.get("/getsubjects", getSubjects);
router.get("/getworkshops", getWorkshops);
router.get("/getextracourses", getExtraCourses);
router.get("/getPaperPublishing", getPaperPublishing);
router.get("/getHigherEducation", getHigherEducation);
router.get("/getEventHackathon", getEventHackathon);
router.get("/getProjects", getProjects);


module.exports = router;
