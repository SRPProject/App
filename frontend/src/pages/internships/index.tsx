

import React,{useEffect, useState} from "react"
import { Button, Card, Dialog, Modal, TextField, Typography } from "@mui/material"
import { AddOutlined, DateRange, UploadFile } from "@mui/icons-material"
import {toast} from "react-toastify"
import axiosObj from "../../api"

const data = [
    {
        "title" : "Intern name" ,
        "name" : "inname" ,
        "type" : "text"
    },{
        "title" : "From" ,
        "name" :"fromperiod",
        "type" :"date"
    },
    {
        "title" : "To" ,
        "name" :"toperiod",
        "type" :"date"
    },
    {
        "title" : "Details" ,
        "name" :"details",
        "type" :"text" ,
        "multiline" : true 
    },

]

const styles = {

    'card' : {
        "padding" : "2rem",
        "display" : 'flex',
        "flexDirection" : "column"
    }

}

const endpoint = "/student/addinterndetails"

const submit = async(event:any)=>{

    event.preventDefault()

    let temp = {}
    
    data.forEach((el:any)=>{
        temp[el.name] = document.getElementById(el.name)!.value
    })

    const resp = await axiosObj.post(endpoint,temp)

    if(resp.status===200){
        toast.success(resp.data.message)
    }
    

}

const Intern = ()=>{

    const [internData,setInternData] = useState([])

    const [open,setOpen] = useState(false)

    useEffect(()=>{

        (
            async function(){
                const endpoint = "/student/getinterndetails"

                const resp = await axiosObj.get(endpoint)
                
                setInternData(resp.data.message)
                
            }
        )()

    },[])

    return(
        <div>
            
            <div >


                {
                    internData.map((el:any)=>{
                        return(
                            <Card sx={{padding:"2rem",margin:"1rem 0",gap:"2rem",display:"flex",flexDirection:"column"}}>
                                <Typography variant="h6">{el.inname}</Typography>
                                <Typography style={{display:"flex",alignItems:"center",gap:"1rem"}} variant="caption">
                                    <DateRange></DateRange>
                                    {el.fromperiod} - {el.toperiod}
                                </Typography>
                                <Typography variant="body1">
                                    {el.details}
                                </Typography>


                            </Card>
                        )
                    })
                }

            </div>

            <Button 
            onClick={()=>setOpen(true) }
            endIcon={<AddOutlined></AddOutlined>}
            >Add An Internship</Button>


            <Dialog open={open} 
                onClose={()=>setOpen(false)}
            >
                <form onSubmit={async(event)=>{
                    
                    await submit(event)

                    setOpen(false)
                    
                }}>

                <Card
                    sx={
                        styles.card
                    }
                >
                    
                    <Typography variant="h5">
                        Add an Intern Details 
                    </Typography>

                    {

                        data.map((el:any)=>{
                            
                            return (
                                <TextField
                                    multiline={el.multiline?true:false}
                                    required 
                                    style={{margin:"1rem 0"}}
                                    type={el.type}
                                    placeholder={el.title}
                                    id={el.name}
                                    variant ="standard"
                                    helperText={el.title}
                                >
                                </TextField>
                            )

                        })

                    }

                    <Button
                    type="submit"
                    disableElevation
                    variant="contained"
                    >Save</Button>

                </Card>
                </form>
            </Dialog>
            

        </div>
    )
}

export default Intern 