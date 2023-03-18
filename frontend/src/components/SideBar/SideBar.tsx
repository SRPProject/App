
import React from 'react'
import Styles from "./SideBar.module.css"
import { Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu";

function SideBar() {

  const data = [ "dashboard" , "general details" , "Academics" , "co-Curricular" , "Intern/Project" , "Placement Details"]

    
  return (
    <div className={Styles.sidebar}>
          
        <h1 className={Styles.logo}>MyDist</h1>

        <div className={Styles.navlist}>
            {
                data.map((el:any)=>{
                    return (
                            <Link 
                            className={Styles.navitems}
                            to="none">
                            <MenuIcon style={{marginRight:"10px"} }/>
                            {el}</Link>
                    )
                })
            }      

        </div>
          
    </div>
  )
}

export default SideBar