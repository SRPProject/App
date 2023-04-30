import { TextField ,Button, Checkbox, Card, Paper, Typography} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import {toast} from"react-toastify"
import CustomForm from "../../utils/custom-forms";

const endpoint = "/auth/student"

const Login = ()=>{


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

            <CustomForm  
                values ={
                    [
                        {
                            'label' : 'Email' ,
                            'disabled' : false ,
                             'required' : true ,
                             'type' : 'email',
                             'name' : 'mail' , 
                        },
                        {
                            'label' : 'password' ,
                            'disabled' : false ,
                             'required' : true ,
                             'type' : 'password',
                             'name' : 'password'
                        }
                    ]
                }
                finishAction ={(code:any,data:any)=>
                                    {
                                        if(code==200){

                                        }
                                        else {
                                            toast.warning(data.message)
                                        }
                                    }
                                }
                endpoint= {endpoint}
                buttonText={"Login"}
                formTitle={"Student Login"}
                ExtraElements={(formik:any)=>{
                    return (
                        <div>
                            <Checkbox required></Checkbox>
                            <Typography variant="caption"> Accept terms and conditions </Typography>
                        </div>
                    )
                }}
            />
            
            </Container>
            </Paper>
            

        </div>
    )
}

export default Login 