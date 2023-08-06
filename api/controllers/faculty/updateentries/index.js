const { studentVerification } = require("../../../models/roles")
const {Students, StudentSem} = require("../../../models/students")
const {Op}= require("sequelize")
const sequelize = require("../../../config/dbconnection");
const { Subjects, Batch, Regulation, Degree } = require("../../../models/comod");
const getModel = require("../../../utils/types_table_mappings");



const updateAcademics = async(req,res)=>{

    try {
        const {status,isRejected,id} = req.body 

        await studentVerification.update({
            status ,
            isRejected 
        },{
            where :{
                id : {
                    [Op.in] : id 
                }
            }
        })

        return res.status(200).send({message:"updated sucesfully"})

     }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Server Error"})
    }

}

//on board a new student 

const updateStudentAuth = async(req,res)=>{

    try {

        //send verificartions id 
        const {status, isRejected,id} = req.body 

        const t = await sequelize.transaction();

        const data = await Students.findAll({
            where: {
                studentVerificationId : {
                    [Op.in] : id 
                }
            }, 
            include : {
                model : Batch 
            }
        })

        //list of student ids 
        const student = data.map(el=>el.getDataValue("st_id"))

        const regulationRegid = data[0].getDataValue("batch").getDataValue("regulationRegid")

        const degreeDegid =  data[0].getDataValue("batch").getDataValue("degreeDegid")

        console.log(degreeDegid)

        if(isRejected){

            //rejecting after accepeted 
            if(status){

                //remove from student sems 

                await StudentSem.destroy({
                    where : {
                        studentStId : {
                            [Op.in] : student
                        }
                    }
                },{
                    transaction:t 
                })

            }

            //remove from student 
            await studentVerification.destroy({
                where : {
                    id : {
                        [Op.in] : id 
                    }
                }
            },{
                transaction:t 
            })
            
            await Students.destroy({
                where :{
                    st_id :{
                        [Op.in] : student
                    }
                }
            },{
                transaction : t 
            })

            console.log("student deleted")

        }
        else {

            //create student !!

            const resp = await studentVerification.update(
                {
                    status:true,
                },
                {
                    where: {     
                    id : {
                        [Op.in] : id    
                    }
                },
                returning : true 
                
            },{
                transaction : t
             }
            )
             
 
            await Students.update({
                isCreated : true 
            },{
                where : {
                    st_id : {
                        [Op.in] : student 
                    }
                }
                ,returning:true 
            },{
                transaction:t  
            })

            console.log(resp)

            //create subjects  for student 
            
            const subjects = await Subjects.findAll({
                attributes : ['subid'] 
            },
            {
                where : {
                    degreeDegid,
                    regulationRegid 
                }
            })

            const subjectIds = subjects.map(el=>el.getDataValue('subid'))

            let data = []
            /*
            subjectSubid: getStudSubs[k].subid,
            studentStId:
            */

            // //for each student add subjects !!
            student.map((studentStId)=>{
                
                subjectIds.map((subjectSubid)=>{
                     data.push({
                        studentStId ,
                        subjectSubid 
                     })
                })
                
            })

            await StudentSem.bulkCreate(data,{transaction:t})
            
            console.log("student sems added")
            
        }

        await t.commit()

        return res.status(200).send({message: isRejected ? "Students rejected ": "Student Onboarded successfully!"})

    }
    catch(err){
        console.log(err)

        return res.status(500).send({message:err})
    }

}




//update one or many students !!

// status : true ->pending ;

// status: false , isRejected : true 
// staus : false , isRejected: false 

const updateStudent = async (req,res)=>{
    
    try {
        const {isRejected,id,type} = req.body
         
        console.log("inside router!!")

        console.log(id) 

        const t = await sequelize.transaction();

        //delete from table !!

        // isRejected : true , status : false 

        if(isRejected){
            
            await studentVerification.destroy({
                where :{
                    id: {
                        [Op.in] : id 
                    }
                }
            },{
                transaction : t 
            })
            
            //delete from data table 
            const Model = getModel(type)

            await Model.destroy({
                where:{
                    studentVerificationId : {
                        [Op.in]: id 
                    }
                }
            },{
                transaction:t
            })


        }

        else {
            //accept them !!
            await studentVerification.update(
                {
                    status:true ,
                },
                {
                    where: {     
                    id : {
                        [Op.in] : id    
                    }
                },
                returning : true 
                
            },{
                transaction :t 
            }
            )

        }

        await t.commit()

        return res.json({message:"Data Has Been Verified!"})
    }
    catch(err){
        
        res.status(500).json({message:"Server Error"})
    }
    
}

module.exports = {

    updateStudent ,
    updateStudentAuth ,
    updateAcademics 
    
}