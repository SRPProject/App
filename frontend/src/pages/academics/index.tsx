

import React from "react"
import {Select ,MenuItem,FormControl ,FormHelperText} from '@mui/material';

const Academics= ()=>{

    return(
        <div>
            <FormControl fullWidth>

                <Select size="small">
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            
                <FormHelperText>Select Semester</FormHelperText>
            </FormControl>
             
        </div>
    )

}

export default Academics 