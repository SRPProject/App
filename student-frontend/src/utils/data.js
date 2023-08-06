import ExtraCurricular from "../pages/extra-curricular"
import Details from "../pages/general"
import Academics from "../pages/academics"
import DetailsIcon from '@mui/icons-material/Details'

import SchoolIcon from '@mui/icons-material/School'
  

export const  schema = [
  {
    'title' : 'General Details' ,
    'icon' :  DetailsIcon,
    'to' : '/general',
    'element' : Details,
    'queryType': ''
  },
  {
    'title' : 'Academics' ,
    'icon' :   SchoolIcon,
    'to' : '/academics',
    'element' : Academics,
    'queryType': ''
  },
   {
      'title' : 'Scholarship',
      'to' : '/scholarship',
      'element' : ExtraCurricular,
      'queryType': 'SCHOLARSHIPS',
      'getter' : '/student/getscholarshipdetails',
      'schema' :[{ type:'text',label:'name'},{ type:'number',label:'ryear'},
      { type:'number',label:'amount'}]
   },{
     'title' : 'Placement' ,
     'to' :'/placement' ,
     'element' : ExtraCurricular,
     'queryType': 'PLACEMENTS' ,
     'getter' : '/student/getplacementdetails',
     'schema' :[{ type:'text',label:'compname'},{ type:'select',label:'ryear',options:[{
       'value' : 0 ,
       'label' : 'On-Campus'
     } , {
       'value' : 1 ,
       'label' : 'Off-Campus'
     }]},
     { type:'number',label:'salary'},
    { type:'select',label:'Company-Type',options:[{
      'value' : 0 ,
      'label' : 'Service-Based'
    } , {
      'value' : 1 ,
      'label' : 'Product-Based'
    }]
  }
]}
   ,{
     'title' : 'Internships',
     'to' : '/internships',
     'element' : ExtraCurricular,
     'queryType': 'INTERSHIPS' , 
      'getter' : '/student/getinterndetails',
      'schema' : [
         {
           type: 'text',
           label : 'inname'
         },
         {
           type : 'Date',
           label : 'fromperiod'
         },{
          type : 'Date',
          label : 'toperiod'
         },
         {
           type : 'text',
           label : 'details'
         }
      ]
   },
   {
     'title' :'Higher Education',
     'to' :'/higher_education',
     'element' : ExtraCurricular,
     'queryType': 'HIGHER_EDUCATION',
     'getter' : '/student/getHigherEducation'

   },
   {
     'title' :'Extra Courses',
     'to' : '/extra_courses',
     'element' : ExtraCurricular,
     'queryType': 'EXTRA_COURSES',
     'getter' : '/student/getextracourses'

   },{
     'title' : 'Sports Events/Hackathons',
     'to' : '/events',
     'element' : ExtraCurricular,
     'queryType': 'EVENTS_HACKATHON',
     'getter' : '/student/getEventHackathon'
   },{
     'title' : 'Paper Published' ,
     'to' : '/paper_published',
     'element' : ExtraCurricular,
     'queryType': 'PAPER_PUBLISHED',
     'getter' : '/student/getPaperPublishing'

   },
   {
     'title' : 'Workshops' , 
     'to' :'/workshops',
     'element' : ExtraCurricular,
     'queryType': 'WORKSHOPS',
     'getter' : '/student/getworkshops'

   }
]


