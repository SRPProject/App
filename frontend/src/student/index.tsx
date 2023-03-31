

import Layout from '../components/Layout/Layout'
import {Routes,Route} from "react-router-dom"
import { routes } from '../data/student'


function Student() {

  return (
  
    <Layout Body={<Body/>}/>
  
  )
}



function Body(){


  return (
  
        <Routes>
            {
               routes.map((el:any)=>{
                  return(
                    <Route element={el.component} path={el.link}/>
                  )
               })
            }
        </Routes>


  )
}

export default Student 