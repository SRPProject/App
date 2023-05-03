import Projects from "../pages/projects"
import Details from "../pages/general"
import Academics from "../pages/academics"
import Dashboard from "../pages/dashboard" 
import Cocurricular from "../pages/cocurricular"
import Placements from "../pages/placements"
import Intern from "../pages/internships"

import DashboardIcon from '@mui/icons-material/Dashboard'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import DetailsIcon from '@mui/icons-material/Details'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import WorkspacesIcon from '@mui/icons-material/Workspaces'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import SchoolIcon from '@mui/icons-material/School'

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
       'title' : 'Projects' ,
       'icon' : LibraryBooksIcon,
        'to' : '/projects',
        'element' : Projects
    },
    {
        'title' : 'Extra-Curricular',
        'icon' : EmojiEventsIcon,
        'to' : '/cocurricular' ,
        'element' : Cocurricular
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
    }
  ]

export default data