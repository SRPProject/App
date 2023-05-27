

import React,{useEffect,useState} from "react"

import axiosObj from "../../api"
import { FormControl, InputLabel, Input, Typography, TextField, Skeleton } from "@mui/material"

const data = {
    "General Details" : [
        { name : "regnum" , type:"number" , label : "Register Number"},
        { name :"sex" , type:"text" ,label : "Gender" },   
        {name : "cutoffmark" ,type:"number",label:"Cut-off Mark"},  
        {name :"admittedon",type:"Date",label:"Admitted-On"},
        {name :"firstname" ,type:"text" , label :"First Name" } ,
        {name : "lastname" , type:"text" , label :"Last Name"},
        {name :"dob",type:"Date" ,label :"Date of birth"},
        {name :"bloodgroup",type:"text" ,label:"Blood Group"},
        {name :"specialcategory",type:"text",label :"Special Category"},
        {name :"community" ,type:"text" ,label : "Community"},
        {name : "volunteer" ,type:"text",label:"Volunteer"},
        {name : "accomdation",type:"text",label:"Accomdation"},
    ],
    
    "Parent Details" :[
        { name : "fathername" , type:"text" , label : "Father Name"},
        { name :"fatherjob" , type:"text" ,label : "Father Occupation" },   
        {name :"fatherincome" ,type:"number" , label :"Father Income" } ,
        {name : "mothername" ,type:"text",label:"Mother Name"},  
        {name :"motherjob",type:"text",label:"Mother Occupation"},
        {name :"motherincome" ,type:"number" , label :"Mother Income" } ,
        {name : "parentaddress" , type:"text" , label :"Parent Address"},
        {name :"parentemail",type:"email" ,label :"Parent Email"},
        {name :"parentphonenum",type:"number" ,label:"Parent Number"},
    ],

    "Guardian Details":[
        {name :"localgname",type:"text",label :"Guardian Name"},
        {name :"localgaddr" ,type:"text" ,label : "Guardian Address"},
        {name : "localgphone" ,type:"number",label:"Guardian Number"},
        {name : "localgmail",type:"email",label:"Guardian Email"},
    ]
    
}

const Details = ()=>{

    const [details,setDetails] = useState(null)

    useEffect(()=>{

        (
            async function(){
                const endpoint = "/student/getPersonalDetails"

                const resp = await axiosObj.get(endpoint)
                
                setDetails(resp.data.message)
                
            }
        )()

    },[])

    return(
        <div >
            
            {
               !details?  
               
               <Skeleton  animation="wave" height="100vh" width="1000"  variant="rounded"> </Skeleton>
               
               :Object.keys(data).map((el:any)=>{
                    return (
                        <div style={{margin:"1rem"}}>
                            <Typography color="blue" variant="h5">{el}</Typography>

                            {
                               data[el].map((item:any)=>{
                        
                                    return(
                                            <TextField
                                                size="small"
                                                style={{margin:"1rem 0"}}
                                                fullWidth
                                                label={item.label}
                                                value={details[item.name]}
                                                type={item.type}
                                            >
                                            </TextField>
                                       
                                    )
                                })
                            }
                            
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Details 