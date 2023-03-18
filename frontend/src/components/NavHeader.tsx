import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface Type {
    desktop: Boolean,
    toggleOpen: any
    className :any 
  }

function NavHeader({className , desktop ,toggleOpen}:Type){


    return(
      <div className={className}>
            {
  
                !desktop&& 
  
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
  
            } 
        </div> 
    )
  
  }
  
export default NavHeader 