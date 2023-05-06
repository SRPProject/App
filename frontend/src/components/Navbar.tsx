
import React, { useContext, useEffect } from "react"
import {  SideToggle } from "./Sidebar"
import {Link, useLocation} from "react-router-dom"
import { AppBar , Typography ,Breadcrumbs, Avatar, Button  } from "@mui/material"
import { LogoutRounded } from "@mui/icons-material"
import { CustomContext } from "../utils/Context"
import Token from "../api/token"

const Navbar = ({isMobile}:{isMobile:Boolean})=>{
    
    const ctx = useContext(CustomContext)

    console.log(ctx.data)

    const location = useLocation() 

    const handleLogout = ()=>{

        let token = Token.getService()

        token.clearToken()

        window.location = "/"

    }

    var pathnames = window.location.pathname.substring(1).split('/')

    useEffect(()=>{

        let tempUrl = window.location.pathname 

        if(tempUrl==="/") pathnames= []
        
        else pathnames = tempUrl.substring(1).split('/')
    
    
    },[location])

    const style = {
        position:(isMobile?"fixed":"relative"),
        padding:(isMobile?".5rem 1rem":"2rem 1rem"),
        borderRadius: (isMobile?"0":"10px"),
        backgroundColor : "white",
        paddingLeft:"0",
        display : "flex",
        flexDirection : "row" ,
        alignItems :"center" ,
        justifyContent:"space-between",
        marginBottom:(isMobile?"1rem":"2rem") , 
    }
    

    return(
        <div>
            <AppBar sx={style} elevation={isMobile?1:0}>
                
                <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>

                {isMobile&&<SideToggle/>}  

                <div style={{margin:0}}>

                    <Typography sx={{color:"#3E8EDE",
                                     textTransform:"capitalize",
                                     fontWeight:"bolder"}}  
                                     
                                variant={(isMobile?"h6":"h5")} 
                                gutterBottom> 

                                {pathnames.at(-1)} 

                    </Typography>

                    <Breadcrumbs aria-label="breadcrumb">

                        <Link  to="/">
                            Home 
                        </Link>
                        {
                            pathnames.slice(0,-1).map((el:any)=>{
                                return <Link  to={el}>{el}</Link>
                            })
                        }

                        <Typography sx={{textTransform:"capitalize"}} color="text.primary">{ (pathnames.length===0) ? "Dashboard": pathnames.at(-1)}</Typography>
                    </Breadcrumbs>
             </div>

             </div>
            
            {/* user photo || user name || logout button */}
            
             <div className="nav-account" style={{display:"flex" ,alignItems:"center",gap:(isMobile?".3rem":"1rem")}}>
                <Avatar></Avatar>
                 <Typography color="black" variant="overline"> {ctx.data.regnum} </Typography>
                 <Button size="small" 
                    startIcon={<LogoutRounded/>}
                    onClick={handleLogout}
                 >Logout</Button>
             </div>

            </AppBar>
            
        </div>
    )

}

export default Navbar 