import Academics from "../student/academics/index"
import Intern from "../student/intern/index"
import DashBoard from "../student/dashboard/index"
import Semester from "../student/placement/index"
import CoCurricular from "../student/co-curricular"
import Placement from "../student/placement/index"
//icons 
import BusinessIcon from '@mui/icons-material/Business';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import StarsIcon from '@mui/icons-material/Stars';

export const routes = [
    { title: "dashboard" ,link:"dashboard", icon:<DashboardIcon style={{marginRight:"10px"}}/> ,component : <DashBoard/> },
    { title: "academics" ,link:"academics", icon:<LibraryBooksIcon style={{marginRight:"10px"}}/> ,component : <Academics/>},
    { title: "co-Curricular" ,link:"co-curricular", icon:<SportsBasketballIcon style={{marginRight:"10px"}}/>,component:<CoCurricular/>},
    { title: "Intern/Project" ,link:"intern_project", icon:<StarsIcon style={{marginRight:"10px"}}/>,component:<Intern/>},
    { title: "Placement" ,link:"placement", icon:<BusinessIcon style={{marginRight:"10px"}}/>,component:<Placement/>}
]