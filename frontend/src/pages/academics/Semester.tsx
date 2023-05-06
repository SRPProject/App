
import React,{useEffect} from "react"

const Semester =({sem,data,setData}:{sem:any,data:any,setData:any})=>{
    
    useEffect(()=>{

        if(sem in data ) {
            console.log("data")
        }
        else {
            //request for mrak !!
            console.log("data not found")
        }

    },[sem])

    return(
        <div>
            {sem} 
        </div>
    )
}

export default Semester 