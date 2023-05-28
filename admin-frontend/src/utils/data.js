import Student from "../pages/student"
import Subjects from "../pages/subjects"
import Report from "../pages/report"
import Regulation from "../pages/regulation"
import Batch from "../pages/Batch"

import {PersonAddAlt1Outlined,SummarizeOutlined,SubjectOutlined,AddBoxOutlined,AddchartOutlined} from "@mui/icons-material"

const data = [
  
  {
    'title' : 'Add Students' ,
    'icon' :  PersonAddAlt1Outlined,
    'to' : '/manage-student',
    'element' : Student 
  },
  {
    'title' : 'Batch' ,
    'icon' :  AddBoxOutlined,
    'to' : '/batch',
    'element' : Batch
  },
  {
    'title' : 'Subjects' ,
    'icon' : SubjectOutlined,
    'to' : '/subjects',
    'element' : Subjects
  },
  {
    'title' : 'Regulation' ,
    'icon' :  SummarizeOutlined,
    'to' : '/regulation',
    'element' : Regulation 
  },
  {
    'title' : 'Create Report' ,
    'icon' :  AddchartOutlined,
    'to' : '/report',
    'element' : Report 
  },

  ]

export default data