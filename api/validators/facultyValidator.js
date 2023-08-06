
const { body, header, param, query } = require("express-validator");
const { validate } = require(".");

const getStudentValidator =  async (req, res, next)=>{

    await body("status")
    .notEmpty()
    .withMessage("status is required")
    .isBoolean()
    .withMessage("status should be boolean")
    .run(req);

    await body("batchId")
    .notEmpty()
    .withMessage("Batch Id is required")
    .run(req);

    await body("type")
    .notEmpty()
    .withMessage("Type is required")
    .run(req);

    next() 

}

const getAcademicsValidator = async(req,res,next)=>{
   
  
  await body("batchId")
  .notEmpty()
  .withMessage("batchId is required")
  .run(req);
  

  await body("sem")
  .notEmpty()
  .withMessage("semester no is required")
  .run(req)

  next() 

}

const updateAcademicsValidator = async ( req,res,next)=>{
  await body("status")
  .notEmpty()
  .withMessage("status is required")
  .isBoolean()
  .withMessage("status should be boolean")
  .run(req);

  await body("isRejected")
  .notEmpty()
  .withMessage("isRejected is required")
  .isBoolean()
  .withMessage("isRejected should be boolean")
  .run(req);

  await body("id")
    .notEmpty()
    .withMessage("id is required")
    .custom((value) => {
        if (!Array.isArray(value)) {
          throw new Error('Input data is not an array');
        }
      
        // Check if all elements in the array are integers
        const isValid = value.every((element) => Number.isInteger(element));
        if (!isValid) {
          throw new Error('Array contains non-integer elements');
        }
      
        // Return the validated value
        return value;
      })
    .run(req);

    next()

}

const updateStudentValidator =  async (req, res, next)=>{

    await body("status")
    .notEmpty()
    .withMessage("status is required")
    .isBoolean()
    .withMessage("status should be boolean")
    .run(req);

    await body("isRejected")
    .notEmpty()
    .withMessage("isRejected is required")
    .isBoolean()
    .withMessage("isRejected should be boolean")
    .run(req);
    

    await body("id")
    .notEmpty()
    .withMessage("id is required")
    .custom((value) => {
        if (!Array.isArray(value)) {
          throw new Error('Input data is not an array');
        }
      
        // Check if all elements in the array are integers
        const isValid = value.every((element) => Number.isInteger(element));
        if (!isValid) {
          throw new Error('Array contains non-integer elements');
        }
      
        // Return the validated value
        return value;
      })
    .run(req);

    next() 

}

module.exports ={
    getStudentValidator ,
    updateStudentValidator ,
    getAcademicsValidator ,
    updateAcademicsValidator 
}