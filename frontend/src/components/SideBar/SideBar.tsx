
import React from 'react'
import Styles from "./SideBar.module.css"
import { Link } from "react-router-dom"
import {useLocation} from "react-router-dom"
import { routes } from '../../data/student';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {IconButton} from "@mui/material"

interface Type {
 sideOpen?:any , 
 changeSideOpen?: any  
}

function SideBar({sideOpen,changeSideOpen}:Type) {
 
  const location = useLocation()
    
  return (
    <div className={Styles.sidebar}>
         
         <span className={Styles.closeButton}>
         {
            sideOpen&& 
              <IconButton  aria-label="close" onClick={()=>{changeSideOpen(false)}}>
                <MenuOpenIcon sx={{color:"white",height : "2rem" , width: "2rem" }}/>
              </IconButton>
        } 
        </span>
        <h2 className={Styles.logo}>MyDist</h2>

        <div className={Styles.navlist}>
            {
                routes.map((el:any)=>{
                    return (
                            <Link 
                            className={Styles.navitems +" " + (location.pathname==`/${el.link}`?Styles.currNav:"") }
                            to={el.link}>
                            {el.icon}
                            {el.title}</Link>
                    )
                })
            }      

        </div>
          
    </div>
  )
}

export default SideBar