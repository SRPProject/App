import { TextField ,Button, Checkbox, Card, Paper, Typography} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import {useFormik,FormikProps} from "formik"
import axiosObj from "../../api"

console.log(axiosObj.post)
interface valueType {
    label :String ,
    type :String ,
    disabled:Boolean ,
    required : Boolean ,
    name  :String 
}

interface CustomFormType {
    values : Array<valueType> , 
    endpoint : String,
    finishAction : any ,
    buttonText : String ,
    formTitle ?:String ,
    ExtraElements?: any 
}


const capitalizeString = (str:String)=>{
    
    const words = str.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(' ')
}

const convertToObject = (arr:any)=>{
    
    var obj  = {}

    arr.map((el:any)=>obj[el]='')

    return obj 

}

const CustomForm = ({values,endpoint,finishAction,formTitle,ExtraElements,buttonText}:CustomFormType)=>{

    const initialValues = convertToObject(values.map((el:any)=>el.name ))


    const formik:FormikProps<any> = useFormik({
        initialValues ,
        onSubmit : async(values:any)=>{
            
            // console.log(values)
            try {
                
                const resp = await axiosObj.post(endpoint,values) 

                console.log(finishAction)
                
                const code = resp.status 

                const data = resp.data

                finishAction(code,data)

            }
            catch(err:any){
                ;
            }

        }
    })

    return(

        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                
                {formTitle&&<Typography sx={{alignSelf:"center"}} variant="h5">Student Login</Typography>}
                
                {
                    values.map((el:any)=>{

                        return (
                             <TextField 
                                label = { capitalizeString(el.label) }
                                type = {el.type}
                                variant="standard"
                                name= {el.name}
                                required = {el.required}
                                value = {formik.values[el.name]}
                                onChange={formik.handleChange}
                            />
                        )

                    })
                }
                
                 { ExtraElements&& <ExtraElements formik={formik} /> } 

                <Button
                    disableElevation
                    variant="contained"
                    color ="primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting?"Submitting" : buttonText}

                </Button>

            </Stack>
        </form>

    )

}

export default CustomForm 