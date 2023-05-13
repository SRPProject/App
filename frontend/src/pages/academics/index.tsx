

import React, { useEffect , useContext,useState } from "react"
import {Select ,MenuItem,FormControl ,FormHelperText,Button, Typography} from '@mui/material';
import { CustomContext } from "../../utils/Context";
import Semester from "./Semester";
import "./index.scss"

const Academics= ()=>{

    const ctx = useContext(CustomContext)

    const [sem,setSem] = useState(1)

    const [data,setData] = useState({})

    return(
        <div>
            <Typography marginBottom={"1rem"}>Select a Semester</Typography>
            <FormControl  style={{display:"flex"}}>

              <Select size="small" 
                    value={sem} 
                    onChange={(e:any)=>setSem(e.target.value)}  > 
                    {
                       Array.from(Array(ctx.data.total_sem+1).keys()).
                       map((el:any)=>{
                        if(el==0) return <div></div>
                        return (
                            <MenuItem selected={(el===1)} value={el}>Semester - {el}</MenuItem>
                        )
                       })

                    }
              </Select> 

        
            </FormControl>
             
            <Semester sem={sem} data={data} setData={setData} > </Semester>

        </div>
    )

}

export default Academics 