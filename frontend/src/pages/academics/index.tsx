

import React, { useContext,useState } from "react"
import {Select ,MenuItem,FormControl ,FormHelperText,Button} from '@mui/material';
import { CustomContext } from "../../utils/Context";
import Semester from "./Semester";

const Academics= ()=>{

    const ctx = useContext(CustomContext)

    const [sem,setSem] = useState(1)

    const [data,setData] = useState({})

    return(
        <div>
            <FormControl  style={{display:"flex"}}>

              <Select size="small" 
                    value={sem} 
                    onChange={(e:any)=>setSem(e.target.value)}  > 
                    {
                       Array.from(Array(ctx.data.total_sem+1).keys()).
                       map((el:any)=>{
                        if(el==0) return <div></div>
                        return (
                            <MenuItem selected={(el===1)} value={el}>{el}</MenuItem>
                        )
                       })

                    }
              </Select> 
            
                <FormHelperText>Select Semester</FormHelperText>

                <Button variant="contained" sx={{width:"max-content",margin:"1rem 0"}}>View</Button>
            </FormControl>
             
            <Semester sem={sem} data={data} setData={data} > </Semester>

        </div>
    )

}

export default Academics 