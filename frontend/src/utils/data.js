import ExtraCurricular from "../pages/extra-curricular"
import Details from "../pages/general"
import Academics from "../pages/academics"
import Dashboard from "../pages/dashboard" 
import Scholarships from "../pages/scholarship"
import Placements from "../pages/placements"
import Intern from "../pages/internships"


import DashboardIcon from '@mui/icons-material/Dashboard'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import DetailsIcon from '@mui/icons-material/Details'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import WorkspacesIcon from '@mui/icons-material/Workspaces'
import SchoolIcon from '@mui/icons-material/School'
import  Sports  from "@mui/icons-material/Sports"


const data = [
    {
      'title' : 'Dashboard' , 
      'icon' : DashboardIcon,
      'to' : '/dashboard' ,
      'element' : Dashboard
    },
    {
      'title' : 'Academics' ,
      'icon' :   SchoolIcon,
      'to' : '/academics',
      'element' : Academics
    },
    {
      'title' : 'General Details' ,
      'icon' :  DetailsIcon,
      'to' : '/general',
      'element' : Details
    },
    {
        'title' : 'Scholarships',
        'icon' : EmojiEventsIcon,
        'to' : '/scholarhship' ,
        'element' : Scholarships
    },
    {
      'title' : 'Extra Curricular' ,
      'icon' : Sports,
      'to' : '/extra-curricular', 
      'element' : ExtraCurricular ,
   },
    {
      'title' : 'Internships',
      'icon' : WorkspacePremiumIcon,
      'to' : '/intern' ,
      'element' : Intern
    },
    {
       'title' : 'Placement' ,
       'icon' : WorkspacesIcon,
       'to' : '/placement', 
       'element' : Placements
    },
    
  ]

export const ExtraCurricularData = [
   'Nptel' ,
   'Sports' ,
   'Culturals' ,
   'Workshops' ,
]
export default data