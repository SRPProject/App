

import React,{useState} from "react"
import { TextField ,Button, Typography, Collapse} from "@mui/material";
import {toast} from "react-toastify"
import axiosObj from "../../api"

const endpoint = "/auth/forgot-password-student"


const handleForgotPassword = async(regnum:any)=>{

    try {

        const resp = await axiosObj.post(endpoint,{regnum})

        if(resp.status==200){
            toast.success(resp.data.message)
        }
        else {
            toast.error(resp.data.message)
        }

    }
    catch(err){

    }

}

export const ForgotPassword = ()=>{
    
    const [forgot,setForgot] = useState<Boolean>(false)


    return(
        <div style={{margin:"1.5rem 0"}}>
            
                                    <Typography style={{cursor:"pointer"}}  onClick={()=>setForgot(prev=>!prev)} color="blue" variant="caption">
                                        Forgot password ? 
                                    </Typography>
                                
                                   <Collapse style={{margin:"1rem 0"}} in={forgot}>
                                        <TextField 
                                            type="number"
                                            label="Roll Number" 
                                            name="regno"
                                            size="small"
                                            variant="standard"
                                            id="mail"
                                        />
                                        <Button onClick={()=>handleForgotPassword(
                                            document.getElementById("mail").value 
                                        )}>
                                            Send Mail
                                        </Button>
                                   </Collapse>
                            </div>
    )

}

export const SetPassword = ()=>{

    return (
        <div>
            set password 
        </div>
    )

}