const { body, header, param, query } = require("express-validator");
const { validate } = require(".");
var  logger=require("../utils/log")(module);

const addDetailsValidator=async(req,res,next)=>{
    console.log(req.body.admittedon);
	
	await body("cutoffmark")
		.notEmpty()
		.withMessage("cutoffmark not defined")
		.run(req)

    await body("admittedon")
        .notEmpty()
		.withMessage("admittedon not defined")
        .bail()
        .isDate()
        .withMessage("Must be a valid date")
		.run(req)       
    await body("bloodgroup")
        .notEmpty()
        .withMessage("blood group invalid")
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

const internDetailsValidator=async(req,res,next)=>{
    console.log(req.body.details);
    await body("inname")
        .notEmpty()
		.withMessage("Intern name not defined")
        .trim()
        .toUpperCase()
		.run(req)
    await body("fromperiod")
        .notEmpty()
        .withMessage("From period not defined")
        .bail()
        .isDate()
        .withMessage("Must be a valid date")
        .run(req)
    await body("toperiod")
        .notEmpty()
        .withMessage("To period not defined")
        .bail()
        .isDate()
        .withMessage("Must be a valid date")
        .run(req)
    await body("details")
        .notEmpty()
        .withMessage("Description of the intern not defined in body")
        .run(req)
    next()
}
const placementDetailsValidator=async(req,res,next)=>{
    await body("compname")
        .notEmpty()
		.withMessage("Company name not defined")
        .trim()
        .toUpperCase()
		.run(req)
    await body("selection")
        .notEmpty()
        .withMessage("Selection not defined")
        .bail()
        .isBoolean()
        .withMessage("Selection not boolean")
        .run(req) 
    await body("salary")
        .notEmpty()
        .withMessage("Salary not defined")
        .bail()
        .isNumeric()
        .withMessage("Salary invalid")
        .run(req)
    await body("comptype")
        .notEmpty()
        .withMessage("Company type invalid")
        .run(req)
    
    next()


}
const scholarshipvalidator=async(req,res,next)=>{
    await body("name")
        .notEmpty()
        .withMessage("Scholarship name not defined")
        .trim()
        .toUpperCase()
        .run(req)
    await body("ryear")
        .notEmpty()
        .withMessage("Received year not defined")
        .bail()
        .isNumeric()
        .withMessage("Received year invalid")
        .run(req)
    await body("amount")
        .notEmpty()
        .withMessage("Received amount not defined")
        .bail()
        .isNumeric()
        .withMessage("Received amount invalid")
        .run(req)
    await body("scholarshipproof")
       
        .custom(async(value,{req})=>{
            if(req.file===undefined ){
                throw new Error("Empty file")
            }  
            if(req.file.mimetype !== 'application/pdf'){
                throw new Error("Invalid file type") 
            }
            else if(Number(req.file.size)>(1024*1024)){
                throw new Error("File size exceeds the limit greater than 1MB")
            }
        })
        .run(req)
    next()

}
const SemMarkValidator=async(req,res,next)=>{
   
    await body("marks")
        //marks should  be array of json eg:  [{"subjectSubid":32 ,"scoredgrade":10,"monthyrpass":"2020/1/1"}]
        .custom(async (value) => {
        
            if(value===undefined ){
                throw new Error("Empty field")
            }   
            else{
                const uniquesubid=new Set();
                res.locals.marks=JSON.parse(req.body.marks);
                for(let i =0;i<res.locals.marks.length;i++){
                    uniquesubid.add(res.locals.marks[i]["subjectSubid"]);
                }
                if(res.locals.marks.length!==uniquesubid.size){
                    throw new Error("Invalid subject id's")
                }
               
            }
        })
        .run(req)
    next()
}
const MarksheetValidator=async(req,res,next)=>{
    await body("semno")
        .notEmpty()
        .withMessage("Sem no not defined")
        .bail()
        .isNumeric()
        .withMessage("Sem no Invalid")
        .run(req)
    await body('marksheet')     
   
        .custom(async(value,{req})=>{
            if(req.file===undefined ){
                throw new Error("Empty file")
            }  
            if(req.file.mimetype !== 'application/pdf'){
                throw new Error("Invalid file type") 
            }
            else if(Number(req.file.size)>(1024*1024)){
                throw new Error("File size exceeds the limit greater than 1MB")
            }
        })
        .run(req)
    next()


}
const addSubElectivesValidator=async(req,res,next)=>{
    await body("subjectSubid")
        .notEmpty()
        .withMessage("Subject id not defined in body")
        .bail()
        .isNumeric()
        .withMessage("Invalid Subject id")
        .run(req)
        
    await body("semsubbelongs")
        .notEmpty()
        .withMessage("Semester no not defined in body")
        .bail()
        .isNumeric()
        .withMessage("Invalid Semester")
        .run(req)
    next()
}

const addWorkshopValidator=async(req,res,next)=>{
    await body("name")
        .notEmpty()
        .withMessage("Workshop name not defined in body")
        .trim()
        .toUpperCase()
        .run(req)

    await body("heldby")
        .notEmpty()
        .withMessage("Organisation name not defined in body")
        .trim()
        .run(req)

    await body("dateattended")
        .notEmpty()
        .withMessage("Date attended not defined in body")
        .trim()
        .bail()
        .isDate()
        .withMessage("Must be a valid date")
		.run(req)    
    
    await body('worshopcertificate')
        .custom(async(value,{req})=>{
            if(req.file===undefined ){
                throw new Error("Empty file")
            }  
            if(req.file.mimetype !== 'application/pdf'){
                throw new Error("Invalid file type") 
            }
            else if(Number(req.file.size)>(1024*1024)){
                throw new Error("File size exceeds the limit greater than 1MB")
            }
        })
        .run(req)

    next()
}

const addExtraCoursesValidator=async(req,ress,next)=>{
    await body("name")
        .notEmpty()
        .withMessage("ExtraCourse name not defined in body")
        .trim()
        .toUpperCase()
        .run(req)

    await body('certificate')
        .custom(async(value,{req})=>{
            if(req.file===undefined ){
                throw new Error("Empty file")
            }  
            if(req.file.mimetype !== 'application/pdf'){
                throw new Error("Invalid file type") 
            }
            else if(Number(req.file.size)>(1024*1024)){
                throw new Error("File size exceeds the limit greater than 1MB")
            }
        })
        .run(req)

    await body("duration")//should be in months
        .notEmpty()
        .withMessage("Duration not defined in body")
        .bail()
        .isNumeric()
        .withMessage("Invalid Duration")
        .run(req)

    await body("typeofcourse")
        .notEmpty()
        .withMessage("typeofcourse not defined in body")
        .trim()
        .toUpperCase()
        .run(req)
    next()
}

const PaperPublishingValidator=async(req,res,next)=>{
    await body("authors")
        .notEmpty()
        .withMessage("Authors not defined in body")
        .trim()
        .toUpperCase()
        .run(req)

    await body("title")
        .notEmpty()
        .withMessage("title not defined in body")
        .trim()
        .toUpperCase()
        .run(req)

    await body("journalname")
        .notEmpty()
        .withMessage("journalname not defined in body")
        .trim()
        .toUpperCase()
        .run(req)

    await body("doilink")
        .notEmpty()
        .withMessage("doilink not defined in body")
        .trim()
        .run(req)

     await body("Category")//- (SCI-E / SCI / Scopus / WOS / National / International Conference / Workshop / Symposium) - (1,2,3,4,5,6,7,8)
        .notEmpty()
        .withMessage("Category not defined in body")
        .bail()
        .isNumeric()
        .withMessage("Invalid Category")
        .run(req)
    next()
}
const HigherEducationValidator=async(req,res,next)=>{
    await body("universityname")
        .notEmpty()
        .withMessage("universityname not defined in body")
        .trim()
        .toUpperCase()
        .run(req)
    
    await body("yearofadmission")
        .notEmpty()
        .withMessage("yearofadmission not defined in body")
        .bail()
        .trim()
        .isNumeric()
        .withMessage("Invalid Year of Admission")
        .run(req)

    await body("specialization")
        .notEmpty()
        .withMessage("specialization not defined in body")
        .bail()
        .trim()
        .run(req)

    await body("degreename")
        .notEmpty()
        .withMessage("specialization not defined in body")
        .bail()
        .trim()
        .run(req)

    next()
}

const EventHackathonValidator=async(req,res,next)=>{
    await body("name")
        .notEmpty()
        .withMessage("ExtraCourse name not defined in body")
        .trim()
        .toUpperCase()
        .run(req)
    await body("role")//( Organized/ Participated/ Won) - (1,2,3)
        .notEmpty()
        .withMessage("role not defined in body")
        .bail()
        .trim()
        .isNumeric()
        .withMessage("Invalid role")
        .run(req)
    
    await body("organizedBy")
        .notEmpty()
        .withMessage("Organisation name not defined in body")
        .trim()
        .run(req)
    
    await body("dateattended")
        .notEmpty()
        .withMessage("Date attended not defined in body")
        .trim()
        .bail()
        .isDate()
        .withMessage("Must be a valid date")
		.run(req)   
        
    await body("participationlevel")// (International/National/State/University/College)- (1,2,3,4,5)
        .notEmpty()
        .withMessage("role not defined in body")
        .bail()
        .trim()
        .isNumeric()
        .withMessage("Invalid role")
        .run(req)

    await body('certificate')
        .custom(async(value,{req})=>{
            if(req.file===undefined ){
                throw new Error("Empty file")
            }  
            if(req.file.mimetype !== 'application/pdf'){
                throw new Error("Invalid file type") 
            }
            else if(Number(req.file.size)>(1024*1024)){
                throw new Error("File size exceeds the limit greater than 1MB")
            }
        })
        .run(req)

    next();
}

const ProjectsValidator=async(req,res,next)=>{
    await body("title")
        .notEmpty()
        .withMessage("Title not defined in body")
        .trim()
        .toUpperCase()
        .run(req)

    await body("guidename")
        .notEmpty()
        .withMessage("Guide Name not defined in body")
        .trim()
        .toUpperCase()
        .run(req)

    await body("fromperiod")
        .notEmpty()
        .withMessage("fromperiod not defined")
        .bail()
        .isDate()
        .withMessage("fromperiod must be a valid date")
        .run(req)   
    await body("toperiod")
        .notEmpty()
        .withMessage("toperiod not defined")
        .bail()
        .isDate()
        .withMessage("toperiod must be a valid date")
        .run(req)   

    await body("toperiod")
        .custom(async(value,{req})=>{
            if(req.body.toperiod && req.body.fromperiod){
                if(new Date(req.body.toperiod)<= new Date(req.body.fromperiod)){
                    throw new Error("toperiodd should be greater than from period");
                }
            }
           
        })
        .run(req)

    await body("sourcecodelink")
        .notEmpty()
        .withMessage("sourcecodelink not defined")
        .bail()
        .isURL()
        .withMessage("sourcecodelink not valid")
        .run(req)  

    await body('certificate')
        .custom(async(value,{req})=>{
            if(req.file===undefined ){
                throw new Error("Empty file")
            }  
            if(req.file.mimetype !== 'application/pdf'){
                throw new Error("Invalid file type") 
            }
            else if(Number(req.file.size)>(1024*1024)){
                throw new Error("File size exceeds the limit greater than 1MB")
            }
        })
        .run(req)
    
    next()

}
module.exports={
    addDetailsValidator,
    internDetailsValidator,
    placementDetailsValidator,
    scholarshipvalidator,
    SemMarkValidator,
    MarksheetValidator,
    addSubElectivesValidator,
    addWorkshopValidator,
    addExtraCoursesValidator,
    PaperPublishingValidator,
    HigherEducationValidator,
    EventHackathonValidator,
    ProjectsValidator

}