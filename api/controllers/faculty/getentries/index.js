const { studentVerification } = require("../../../models/roles")
const {Students, StudentSem, MarksheetProofs} = require("../../../models/students")
const {Op}= require("sequelize")
const sequelize = require("../../../config/dbconnection");
const { Subjects, Batch, Regulation, Degree } = require("../../../models/comod");
const getModel = require("../../../utils/types_table_mappings");



//get all students data 

// 1) update all validators 
// 2) finish student and faculty Login !!

/*
  get all batches handled by faculty 
*/
const getBatches = async (req,res)=>{
    
    try {

        console.log("batches")
        const distFacultyFacultyId = res.locals._id 

        const data = await Students.findAll({
            where: {
                distFacultyFacultyId 
            },
            attributes : [
                sequelize.fn('DISTINCT', sequelize.col('batchId')) ,'batchId'
            ],
            
        })

        let batches = data.map((el)=>el['batchId']) 

        const batchDetails = await Batch.findAll({
            where : {
                id : {
                    [Op.in] : batches 
                }
            },
            include : [
                Regulation,
                Degree 
            ],
            raw:true 
        })
        

        return res.status(200).json({message:batchDetails})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Server Error"})
    }

}

// get student acdemics details 
const getAcademics = async(req,res)=>{
  
    try {

        const distFacultyFacultyId = res.locals._id 

        const {sem,batchId,status} = req.body 

        console.log(sem)

        console.log(batchId)

        //get data 
        //cases to be handled : what if marksheet proof row is not created !? 

        const data = await sequelize.query( `
         
        select * from studentsems 
        inner join students on students."st_id" = studentsems."studentStId"
        inner join marksheets on marksheets."studentStId" = students."st_id" 
        inner join subjects on subjects."subid" = studentsems."subjectSubid"
        inner join student_verifications on student_verifications."id" = marksheets."studentVerificationId"
        where students."distFacultyFacultyId" = ${distFacultyFacultyId} and 
        students."batchId" = ${batchId}  and marksheets."semester_no" = ${sem}
        and student_verifications."status"=${status} and student_verifications."isRejected"=${false} 
        `)

        let students = Object()

        //data decorations !! student rollnum : {
        //  proofLink : , data : '' 
        // }
        data[0].forEach(item=> {
            
            const {subname,scoregrade,attempts,monthyrpass,proofLink,regnum,studentVerificationId} = item 

            if(!( regnum in students)) students[regnum] = Object()

            students[regnum]['proofLink'] = proofLink 

            students[regnum]['verifyId'] = studentVerificationId
            
            students[regnum]['data'] = students[regnum]['data'] ||  []

            students[regnum]['data'].push({
                subname ,
                scoregrade,attempts,
                monthyrpass 
            })
        })
console.log("data")
        console.log(students)

        return res.status(200).json({message:students})


    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Server Error"})
    }

}



// get all students login verification bending details 

const getStudentAuth = async(req,res)=>{

    try {

        const distFacultyFacultyId = res.locals._id 

        const {status,batchId} = req.body 

        const data = await Students.findAll({
            where : {
                distFacultyFacultyId  ,
                batchId  ,
            },
            attributes:["mail","regnum"],
            include : {
                model : studentVerification ,
                attributes : ['status','isRejected', 'proofLink','id'], 
                where :{
                    status 
                },
            }
        })
        
        return res.status(200).json({message:data})

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"})
    }

}


// get student verification proofs 

const getStudent = async (req,res)=>{

    try {
    
    const distFacultyFacultyId = res.locals._id 

    const {status,batchId} = req.body 

    const Model = getModel('INTERSHIPS')

    //get all student ids;

    const tableName = Model.getTableName()

    // query verification table
    const data = await sequelize.query(`
    select * from student_verifications
    inner join ${tableName} on "student_verifications"."id" = ${tableName}."studentVerificationId" and  
    "student_verifications"."id" in (select st_id from students where "students"."batchId"=${batchId} AND "students"."distFacultyFacultyId"=${distFacultyFacultyId})
    and "student_verifications"."status"= ${status}
        
    `)
    
    
    return res.status(200).json({message:data[0]})
}
catch(err){
    console.log(err)
    res.status(500).json({message:"Server Error"})
}

}

module.exports = {
    getAcademics ,
    getBatches,
    getStudent ,
    getStudentAuth 
}