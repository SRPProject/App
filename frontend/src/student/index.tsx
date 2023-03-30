
import React from 'react'
import Layout from '../components/Layout/Layout'
import {BrowserRouter,Routes,Route,useLocation} from "react-router-dom"
import {Breadcrumbs,Link} from "@mui/material"

import Academics,{Semester} from "./Academics"
import CoCurricular from "./CoCurricular"
import Dashboard from "./Dashboard"
import Intern from "./Intern"
import Placement from "./Placement"

function Student() {

  return (
  
    <Layout Body={<Body/>}/>
  
  )
}



function Body(){
  
  const location = useLocation()     
  const numSem = [1,2,3,4,5,6]

  return (
        <div>
          <Breadcrumbs>
                  {
                    
                  }
          </Breadcrumbs>
          <Routes>
              <Route path="/academics" element={<Academics/>}>
                  {
                     numSem.map((i)=>{
                       return(
                         <Route path={`${i}`} element= {<Semester num={i} />} />
                       )
                     })
                  }
              </Route>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/co-curricular" element={<CoCurricular/>}/>
              <Route path="/intern_project" element={<Intern/>}/>
              <Route path="/placement" element={<Placement/>}/>
              <Route/>
          </Routes>
       </div>
  )
}

export default Student 