

import React, { useState } from 'react'
import {useLocation,useNavigate} from "react-router-dom"
import { IconButton ,Drawer ,ListItemIcon , List ,ListItem,ListItemButton,ListItemText ,Paper } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'
import "./Sidebar.scss"
import data from "../utils/data"

export const Sidebar = ( {isMobile}:{isMobile:Boolean})=> {
  
  const location = useLocation() 

  const navigate = useNavigate() 

  const styles = {
     margin : "1rem" ,
     height:"95vh",
     maxHeight : "100vh" , 
     borderRadius:"15px" ,
     minWidth :"max-content" ,  
     width: (isMobile?"60vw":"18vw")
  }

  const handleNavigation = (to:String)=>{
      navigate(to)
  }

  return (
  
          <Paper sx={styles} elevation={isMobile?0:2}>
                
                <div className="logo">
                    MY DIST  
                </div>
                
                {
                   data.map((el:any)=>{

                    return(
                      <ListItem sx={{margin:0}} >

                            <ListItemButton sx={{padding:".5rem" , 
                                                backgroundColor :(location.pathname===el.to)?"#3E8EDE":"white",
                                                color : ((location.pathname===el.to)&&"white" ), 
                                                borderRadius:"10px" ,"&:hover" : {color:"black"} }}  
                
                                            onClick={()=>handleNavigation(el.to)}
                                            >
                              <ListItemIcon>
                                <el.icon  sx={{fontSize:"larger" , color :"#ADD8E6 " }}/>
                              </ListItemIcon>
                              <ListItemText>
                               {el.title}
                              </ListItemText>
                            </ListItemButton>

                      </ListItem>
                    )

                   })
                }

          </Paper>
    
  )
}


// for mobile 
export const SideToggle = ()=>{

  const [open,setOpen] = useState<Boolean>(false) 

  return (
    <div>
          <IconButton  sx={{margin:0}} onClick = {()=>setOpen(prev=>!prev)} >
              <MenuOutlined />
          </IconButton>
    
          <Drawer open={open} onClose={()=>setOpen(false)} >
              <Sidebar isMobile={true}/>
          </Drawer>

    </div>
  )
}

