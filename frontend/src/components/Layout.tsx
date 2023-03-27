import {useState} from 'react'
import AppBar from "@mui/material/AppBar"
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon  from '@mui/icons-material/Menu';

function Layout() {

  const [sideOpen, changeSideOpen] = useState<Boolean>(false);

  
  return (
    <div className="layout">
        {
         
        <div className={"side-nav" + (sideOpen?" open":" close") }>
            hi baby
        </div>
        }
      <AppBar sx={{ height: "max-content" }}  className={ sideOpen?"open-app":""} position="static">

            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick ={()=>{changeSideOpen(prev=>!prev)}}
            >
                <MenuIcon/>
            </IconButton> 

            </Toolbar>

        </AppBar>

    </div>
  )
}

export default Layout