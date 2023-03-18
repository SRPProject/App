
import React from 'react'
import Layout from '../components/Layout/Layout'
import {BrowserRouter,Routes,Route} from "react-router-dom"

function Student() {

  return (
  
    <Layout/>
  
  )
}

function NavContent(){
  return(
    <div>
      <BrowserRouter>
        
        <Routes>
        
        </Routes>
      
      </BrowserRouter>
    </div>
  )
}

function Body() {
  return (
    <div>
      this is body 
    </div>
  )
}

export default Student 