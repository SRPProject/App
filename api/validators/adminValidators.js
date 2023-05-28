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
      .isNumeric()
      .withMessage("Department is required!")
      .run(req);
  
  await body("batchId")
      .notEmpty()
      .isNumeric()
      .withMessage("Batch is required!")
      .run(req);

  await body("degreeDegid")
      .notEmpty()
      .isNumeric()
      .withMessage("Degree is required!")
      .run(req);

  await body("regulationRegid")
      .notEmpty()
      .withMessage("Regulation is required!")
      .run(req);

  await body("regnum")
    .notEmpty()
    .isNumeric()
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

const addDeptValidator=async(req,res,next)=>{
  await body("deptName")
    .notEmpty()
    .withMessage("Department Name is required!")
    .run(req)
  next()
}

const addRegValidator=async(req,res,next)=>{
  await body("regyear")
    .notEmpty()
    .isInt()
    .withMessage("Regulation year invalid!")
    .run(req)
  next()
}

const addDegreeValidator=async(req,res,next)=>{
  await body("degreename")
    .notEmpty()
    .withMessage("Degree Name is required!")
    .run(req)

  await body("noofsems")
    .notEmpty()
    .isNumeric()
    .withMessage("no of semester is required!")
    .run(req)

  next()

}

const addBulkStdsValiadtor=async(req,res,next)=>{

  // degreeDegid,distDepartmentDeptid,regulationRegid,facultyFacid,batchId
 
  await body("degreeDegid")
    .notEmpty()
    .withMessage("Degree id not defined in body")
    .bail()
    .isNumeric()
    .withMessage("Invalid Degree id")
    .run(req)
  
  await body("distDepartmentDeptid")
    .notEmpty()
    .withMessage("Department id not defined in body")
    .bail()
    .isNumeric()
    .withMessage("Invalid Department id")
    .run(req)

  await body("regulationRegid")
    .notEmpty()
    .withMessage("Regulation id not defined in body")
    .bail()
    .isNumeric()
    .withMessage("Invalid Regulation id")
    .run(req)

  await body("facultyFacid")
    .notEmpty()
    .withMessage("Faculty id not defined in body")
    .bail()
    .isNumeric()
    .withMessage("Invalid Faculty id")
    .run(req)

  await body("batchId")
    .notEmpty()
    .withMessage("Batch id not defined in body")
    .bail()
    .isNumeric()
    .withMessage("Invalid Batch id")
    .run(req)

  await body('studentslist')     
        .custom(async(value,{req})=>{
          let arr=['application/vnd.ms-excel','application/msexcel',
            'application/x-msexcel','application/x-ms-excel','application/x-excel',
            'application/x-dos_ms_excel','application/xls','application/x-xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv'
          ]
            if(req.file===undefined ){
                throw new Error("Empty file")
            }  
            if(req.file.mimetype in arr ){
                throw new Error("Invalid file type") 

            }
            else if(Number(req.file.size)>(1024*1024)){
                throw new Error("File size exceeds the limit greater than 1MB")
            }
        })
        .run(req)

  next()
}
const addSubjectValidator=async(req,res,next)=>{
  // subcode , subname ,typeofsub ,regulationRegid ,degreeDegid,distDepartmentDeptid,semsubbelongs

  //semsubbelongs should contain if typeofsub ===1
  await body("credit")
    .notEmpty()
    .withMessage("Credit not defined in body")
    .bail()
    .isNumeric()
    .withMessage("Credit Invalid")
    .run(req)

  await body("degreeDegid")
    .notEmpty()
    .withMessage("Degree id not defined in body")
    .bail()
    .isNumeric()
    .withMessage("Invalid Degree id")
    .run(req)
  
  await body("distDepartmentDeptid")
    .notEmpty()
    .withMessage("Department id not defined in body")
    .bail()
    .isNumeric()
    .withMessage("Invalid Department id")
    .run(req)

  await body("regulationRegid")
    .notEmpty()
    .withMessage("Regulation id not defined in body")
    .bail()
    .isNumeric()
    .withMessage("Invalid Regulation id")
    .run(req)

  await body("subcode")
    .notEmpty()
    .withMessage("Subject Code Invalid")
    .run(req)
  
  await body("subname")
    .notEmpty()
    .trim()
    .withMessage("Subject Name Invalid")
    .run(req)
    
  await body("typeofsub")
    .notEmpty()
    .withMessage("Type of Subject Invalid")
    .bail()
    .isNumeric()
    .withMessage("Type of Subject Invalid")
    .run(req)

  next()

}

const addBatchValidator=async(req,res,next)=>{
  await body("startyr")
    .notEmpty()
    .withMessage("start year invalid")
    .bail()
    .isNumeric()
    .withMessage("start year invalid")
    .run(req)
  await body("endyr")
    .notEmpty()
    .withMessage("end year invalid")
    .bail()
    .isNumeric()
    .withMessage("end year invalid")
    .run(req)
  
  await body('endyr')     
    .custom(async(value,{req})=>{  
      if(req.body.endyr && req.body.startyr ){
        if(Number(req.body.endyr) <= Number(req.body.startyr) ){ throw new Error("End year should be greater than start year")} 
      }  
    
    })
    .run(req)
  
  next()
}
module.exports={addStudValidator,addFacultyValidator,addDeptValidator,addRegValidator,addDegreeValidator,addBulkStdsValiadtor,addSubjectValidator,addBatchValidator}