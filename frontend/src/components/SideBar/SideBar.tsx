
import React from 'react'
import Styles from "./SideBar.module.css"
import { Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu";
import {useLocation} from "react-router-dom"

import BusinessIcon from '@mui/icons-material/Business';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import StarsIcon from '@mui/icons-material/Stars';


function SideBar() {

  const data = [ 
    { title: "dashboard" ,link:"dashboard", icon:<DashboardIcon style={{marginRight:"10px"}}/>},
    { title: "academics" ,link:"academics", icon:<LibraryBooksIcon style={{marginRight:"10px"}}/>},
    { title: "co-Curricular" ,link:"co-curricular", icon:<SportsBasketballIcon style={{marginRight:"10px"}}/>},
    { title: "Intern/Project" ,link:"intern_project", icon:<StarsIcon style={{marginRight:"10px"}}/>},
    { title: "Placement" ,link:"placement", icon:<BusinessIcon style={{marginRight:"10px"}}/>}
  ]
 
  const location = useLocation()
  
  console.log(location.pathname)
    
  return (
    <div className={Styles.sidebar}>
          
        <h1 className={Styles.logo}>MyDist</h1>

        <div className={Styles.navlist}>
            {
                data.map((el:any)=>{
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