
import React from 'react'
import Styles from "./SideBar.module.css"
import { Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu";
import {useLocation} from "react-router-dom"
import { routes } from '../../data/student';

function SideBar() {
 
  const location = useLocation()
  
  console.log(location.pathname)
    
  return (
    <div className={Styles.sidebar}>
          
        <h1 className={Styles.logo}>MyDist</h1>

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