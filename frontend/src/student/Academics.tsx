
import {useParams} from "react-router-dom"
import {Select,MenuItem} from '@mui/material';

export default function Academics(){
    
    const sem = [ 1,2,3,4,5,6 ]
    return(
        <div className="body-inner">
            academics 
            <Select>
                {
                    sem.map((el:any)=>{
                        return (
                            <MenuItem>  </MenuItem>
                        )
                    })
                }
            </Select>
        </div>
    )
    
}

export const  Semester =  ({num}:{num:number})=>{
    return(
        <div>
            this is semester {num}
        </div>
    )
}