
import React from 'react'
import Layout from '../components/Layout/Layout'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Academics from "./academics/Academics"

function Student() {

  return (
  
    <Layout Body={<Body/>}/>
  
  )
}



function Body(){
  return (
      <BrowserRouter>
        
        <Routes>
            <Route path="/academics" element={<Academics/>}/>
        </Routes>
      
      </BrowserRouter>
  )
}

export default Student 