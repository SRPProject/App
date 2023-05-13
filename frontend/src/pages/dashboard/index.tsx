

import {Button ,  Card, Container, Typography } from "@mui/material"
import React,{useEffect} from "react"
import EditIcon from '@mui/icons-material/Edit';

const Dashboard = ()=>{

    useEffect(()=>{

    },[])

    return(
        <div>

            <div  style={{
                display:"flex",
                justifyContent:"stretch",
                gap:"2rem"
            }}>
            <Card sx={{boxShadow:"none"}}>
                <Container sx={{padding:"2rem",display:"flex",gap:"1rem",justifyContent:"space-around"}}>
                    
                    <div style={{gap:"2rem",display:"flex",flexDirection:"column"}}>
                        <img 
                        
                        style={{borderRadius:"50%",height:"15rem",width:"15rem"}}
                        src="https://avatars.githubusercontent.com/u/86183777?s=400&u=ccf5bc0ab1937c5caf2ebbb328170499afae854a&v=4"></img>
                    
                        <Button

                            endIcon={<EditIcon/>}
                            variant="outlined"
                        >
                            Change
                        </Button>
                    </div>
                    
                    <div>
                        <Typography>

                            <table>
                                <tr>
                                    <td>Name</td>
                                    <td>Kumaran</td>
                                </tr>
                                <tr>
                                    <td>Degree Enrolled</td>
                                    <td>B.Tech</td>
                                </tr>
                                <tr>
                                    <td>Course Name</td>
                                    <td>Information Technology</td>
                                </tr>
                                <tr>
                                    <td>Academic Year</td>
                                    <td>2020 - 2024</td>
                                </tr>
                                <tr>
                                    <td>Faculty Advisor</td>
                                    <td>Kumaran</td>
                                </tr>
                            </table>

                        </Typography>
                        
                    </div>

                </Container>
            </Card>

            </div>

        </div>
    )

}

export default Dashboard 