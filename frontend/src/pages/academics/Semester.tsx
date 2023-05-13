
import React,{useEffect,useState} from "react"
import {Button, Select ,  Typography,Card, Skeleton, MenuItem, TextField, FormControl, InputLabel, IconButton, InputAdornment, Collapse, Tabs,Tab} from "@mui/material"
import VerifiedIcon from '@mui/icons-material/Verified';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import axiosObj from "../../api"
import Loader from "../../components/Loader";
import { FileUpload } from "@mui/icons-material";



const endpoint = "/student/studentsem"

const util = (obj:any)=>{

    let temp = {"Core Subjects" :[] ,
    "Professional Electives" :[] ,
    "Open-Elective" :[] ,
    "Humanities" :[],
    "Audit-course" :[]} 

    obj.map((el:any)=>{
        
        switch(el.typeofsub){
            case 1 :
                temp["Core Subjects"].push(el)
                break; 
            case 2 : 
                temp["Professional Electives"].push(el)
                break ;
            case 3:
                temp["Humanities"].push(el)
                break ;
            case 4 : 
                temp["Open-Elective"].push(el)
                break ;
            case 5: 
                temp["Audit-course"].push(el)
        }

    })

    return temp 

}

const Semester =({sem,data,setData}:{sem:any,data:any,setData:any})=>{
    
    const [permission,setPermission] = useState(false)
    const [verified,setVerified] = useState(true)
    const [loading,setLoading] = useState(false)

    console.log(data)

    useEffect(()=>{

       
        if(sem in data ) {
           ; 
        }
        else {
            
            //request for getting student sem marks 
            (
                async ()=>{
                    
                    setLoading(true)

                    const resp = await axiosObj.get(endpoint)

                    const obj = resp.data.message

                    const normalized = util(obj)  // spilt based on type of subjects 
    
                    setData((prev:any)=>({...prev, [sem]:normalized}))

                    setLoading(false)
                }
            )()

        }

       

    },[sem])

    

    return(
        <form className="semester">

            <div className="header">

                <div>

                    <Typography variant="h5">
                        Semester  - {sem} 
                    </Typography>

                    <Typography variant="caption">April 2022 - May 2022</Typography>

                </div>

                <Typography>
                    GPA Obtained -  <span style={{fontWeight:"bolder"}}>9.8</span> 
                </Typography> 

            </div>

            <VerficationFile/>

            {
                 loading ? 
                 <Skeleton width="1000" height ="100vh" variant="rectangular" animation="wave"></Skeleton> 
                 : 
                 data[sem]&&<Container sem={sem}  data={data[sem]} />
            }

            
        </form>
    )
}

const Container = ({data,sem}:{data:any,sem:number})=>{

    const [value,setValue] = useState(0)

    console.log(data)

    const tabs = [
        "Core Subjects" ,
        "Professional Electives" ,
        "Open-Elective" ,
        "Humanities",
        "Audit-course"
    ]

    return(
        <div className="main">
            
            <Tabs
                onChange={(e,val)=>setValue(val)}
                value={value}
                sx={{display:"flex",flexDirection:"column"}}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
            >
                {
                    tabs.map((el:string,index:number)=>{
                        return(
                            <Tab value={index} label={el}/>
                        )
                    })
                }
            </Tabs>
            
            <Button style={{width :"max-content"}} onClick={()=>updateMark()} variant="contained">Update Marks</Button>

            <div className="sub-types">
                <Typography style={{margin:"0 1rem"}} variant="h5">{tabs[value]}</Typography>
                <SubjectType data={data[tabs[value]]}></SubjectType>
            </div>
            

        </div> 
    )
}



const SubjectType = ({data}:{data:any})=>{

    console.log(data)
    if(data.length===0){
        return (
            <div>
                <Typography variant="h6" padding={"2rem 1rem"}>
                    No Subjects Where Added 
                </Typography>
            </div>
        )
    }

    return(
        <div>
        {
            data.map((el:any)=>{
                
                return (
                    <div className="subjects">
                        <Card sx={{padding:"1rem"}}>  
                            <Typography variant="h6">{el.subname} 
                                <Typography variant="body1">{el.subcode}</Typography>
                            </Typography>
                            <Typography variant="caption">
                                Total Credit : {el.credit}
                            </Typography>
                            <select style={{display:"block"}}>
                                <option selected disabled>
                                    Select Grade Obtained
                                </option>
                                {[10,9,8,7].map((item:any)=>{
                                    return(
                                        <option selected={(item===el.scoredgrade)} >
                                            {item}
                                        </option>
                                )
                                })}   
                            </select>
                            <div >
                                <Typography margin="1rem 0" variant="caption">Number of attempts </Typography>
                                <br/>
                                <input type="number" style={{padding:".25rem"}} min={0} max={3}></input>
                            </div>
                           
                            <div style={{margin:"1rem 0"}}>
                                <Typography margin="1rem 0" variant="caption">Month and Year Of passing</Typography>
                                <br/>
                                <input type="month"  style={{padding:".25rem"}} ></input>
                            </div>
                        </Card> 
                    
                    </div>
                )
            })
            
        }
        
        </div>
    )

}

const AddSubject = ()=>{
    return(
        <div className="sub-types">
                <Typography variant="h5" sx={{textDecoration:"underline",padding:"1rem"}}>Add Subjects</Typography>
                <div>
                    <Card sx={{padding:"1rem"}}>
                        <Typography variant="caption"> **Not this is not applicable for core subjects**</Typography>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        placeholder="Enter Subject Code"
                        size="small"
                        sx={{margin:"1rem 0"}}
                        ></TextField>
                       <Button size="small"  variant="contained">Search</Button>
                    </Card>
                  
                </div>
            </div>
    )
}

const VerficationFile = ()=>{
    return(
        <div className="file-upload"  >

                <form>
                <Typography>Verification File</Typography>
                <TextField 
                    required
                    size="small"
                    fullWidth
                    type="file"
                    sx={{margin:"1rem 0"}}
                 >
                
               </TextField>

               <Button 
                endIcon={<FileUpload/>}
                variant="contained"
                disableElevation
                type="submit"
                >Save File</Button>
                </form>
                <Typography variant="caption" style={{margin:"2rem 0"}}> 
                    Note : Update Marks first if you have not 
                </Typography>
        </div>
    )
}

/*

*/

export default Semester 