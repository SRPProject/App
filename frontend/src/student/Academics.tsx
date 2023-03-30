
import {useParams} from "react-router-dom"

export default function Academics(){
    
    return(
        <div>
            academics 
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