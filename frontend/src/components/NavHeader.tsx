import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Avatar,Chip} from "@mui/material"

interface Type {
    desktop: Boolean,
    toggleOpen: any
    className :any 
    sideOpen : any 
  }


// styles for this component is present in layout.module.css 
// referenced by passing className as props 
function NavHeader({className , desktop ,toggleOpen,sideOpen}:Type){


    return(
      <div className={className}>
            
            {
            
                !desktop&&!sideOpen?
  
               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleOpen}
              >
                <MenuIcon />
              </IconButton> 
              : 
              <div></div>
  
            } 
            
          
               <Chip
                  avatar={<Avatar/>}
                  label="kumaran"
                  variant="outlined"
              />
            
            
        </div> 
    )
  
  }
  
export default NavHeader 