import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from '@mui/icons-material/Logout';
import {Button} from "@mui/material"

interface Type {
    desktop: Boolean,
    toggleOpen: any
    className :any 
  }


// styles for this component is present in layout.module.css 
// referenced by passing className as props 
function NavHeader({className , desktop ,toggleOpen}:Type){


    return(
      <div className={className}>
            {
            
                !desktop?
  
               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleOpen}
              >
                <MenuIcon />
              </IconButton> 
              : 
              <div></div>
  
            } 
            
            <div>
               <span 
                  style = {
                    {
                        fontWeight:"bold",
                        color : "navy" 
                    }
                  }
               >Welcome Kumaran !!</span>
               <Button  
                  disableElevation
               ><LogoutIcon/>Logout</Button>
            </div>
            
        </div> 
    )
  
  }
  
export default NavHeader 