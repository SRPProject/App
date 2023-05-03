import { TextField ,Button, Checkbox, Stack, Paper, Typography, Collapse} from "@mui/material";
import { Container } from "@mui/system";
import { Formik, useFormik } from "formik";
import React,{useState} from "react";
import axiosObj from "../../api"
import {Link} from "react-router-dom"
import {toast} from "react-toastify"
import { ForgotPassword } from "../password";

const endpoint= "/auth/student"


const Login = ()=>{


    const formik = useFormik({
        initialValues : {
            "regnum" :'',
            "password" : ""
        },
        onSubmit : handler,
        initialStatus :{
            "regnum" : null ,
            "password" : null 
        }
    })
    
    async function handler(values:any){

        try {
    
            const resp = await axiosObj.post(endpoint,values)

            console.log(resp)
    
            if(resp.status===200){
    
            }
            else if(resp.status===400){
    
                const temp =  JSON.parse(resp.data.message)
                
                formik.setStatus({ password:null , regnum:null , ...temp})

              //  formik.errors[Object.keys(temp)[0]] = temp[  Object.keys(temp)[0] ]

                formik.setSubmitting(false)

            }
    
        }
    
        catch(err){
    
        }
        
    }
    

    return (
        
        <div style={{
            display : "flex" ,
            alignItems : "center",
            justifyContent : "center"  ,
            height : "100vh",
            width : "100vw"
        }}>

            <Paper
                sx={
                    {
                        width :"max-content",
                        padding: "2rem 0",
                        borderRadius : "10px"
                    }
                }
            >
            <Container>

            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                
                <Typography sx={{alignSelf:"center"}} variant="h5">Student Login</Typography>
                
            
                    <TextField 
                        label = {"Roll Number" }
                        type = {"number"}
                        variant="standard"
                        name= {"regnum"}
                        required = {true}
                        value = {formik.values.regnum}
                        onChange={formik.handleChange}
                        error={ formik.status.regnum?true:false }
                        helperText ={ formik.status.regnum?formik.status.regnum:"" }
                        />

                    <TextField

                        label = {"Password" }
                        type = {"password"}
                        variant="standard"
                        name= {"password"}
                        required = {true}
                        value = {formik.values.password}
                        onChange={formik.handleChange}
                        />

                <Button
                    style={{marginTop:"2rem"}}
                    disableElevation
                    variant="contained"
                    color ="primary"
                    type="submit"
                    disabled={formik.isSubmitting}

                >
                    {formik.isSubmitting?"Submitting" : "Login"}

                </Button>


                        <div>
                            <div>
                            <Checkbox required></Checkbox>
                            <Typography variant="caption"> Accept terms and conditions </Typography>
                        </div>
                            
                        </div>
                        </Stack>
                </form> 

                <ForgotPassword/>
            
            </Container>
            </Paper>
            

        </div>
        
    )
}

export default Login 