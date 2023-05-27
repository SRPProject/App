

import React,{useState} from "react"
import { Select, InputLabel, MenuItem, Button, TextField, Typography, FormControl } from "@mui/material"
import {toast} from "react-toastify"
import axiosObj from "../../api"



const endpoint = "/student/addplacements"



const Placements = ()=>{

    const [selection,setSelection] = useState("")

    const [CompanyType,setCompanyType] = useState("")

    const submit = async(event:any)=>{

        event.preventDefault()
    
        const data = {
            "compname" :  document.getElementById("compname")!.value,
            "selection" : selection==='0'?true:false, 
            "salary" : Number( document.getElementById("salary")!.value),
            "comptype" :  CompanyType,
        }
        
        console.log(data)
    
        const resp = await axiosObj.post(endpoint,data)
    
        if(resp.status===200){
            toast.success(resp.data.message)
        }
        
    
    }

    return(
        <form onSubmit={submit}
              style={{
                display:"flex" ,
                flexDirection : "column",
                gap:"2rem",
               
              }}
        >
            <Typography variant="h5">Placement Details</Typography>
            
            <TextField 
                required
                type="text" 
                placeholder="Company Name"
                aria-label="company-label"
                id = "compname"
                size="small"
                variant='standard'
                //label="Company Name"
            ></TextField> 
           

            <FormControl>

                <InputLabel id="selection-label">Mode of Selection</InputLabel>
            
                <Select
                    value={selection}
                    onChange ={(e:any)=>setSelection(e.target.value)}
                    required
                    variant="standard"
                    labelId="selection-label"
                    id="selection"
                    size="small"
                >
                    <MenuItem value="off-campus">Off campus</MenuItem>
                    <MenuItem value="on-campus">On Campus</MenuItem>
                </Select>
            </FormControl>
            
            <TextField
                required
                label="CTC Offered"
                variant='standard'
                size="small"
                id="salary"
                inputProps={{ type: 'number'}}
                placeholder="CTC (in lakhs)"
            >
            </TextField>
            
            <FormControl>
                <InputLabel  id="type-selection">
                    Type of Company
                </InputLabel>

                <Select
                    value={CompanyType}
                    onChange={(e:any)=>setCompanyType(e.target.value)}
                    required
                    labelId="type-selection"
                    id="comptype"
                    size="small"
                    variant="standard"
                >
                    <MenuItem value="0">Service-based</MenuItem>
                    <MenuItem value="1">Product-based</MenuItem>
                </Select>

            </FormControl>

            <Button 
                sx={{marginTop:"2rem"}}
                disableElevation
                type="submit"
                variant="contained"
            > 
                Save 
            </Button>

        </form>
    )
}

export default Placements 