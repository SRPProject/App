
import React from "react";
import { Routes , Route ,BrowserRouter, Navigate } from "react-router-dom";
import {SideToggle,Sidebar} from "../components/Sidebar";
import {useMediaQuery} from "react-responsive"
import Dashboard from "../pages/dashboard";
import Navbar from "../components/Navbar";
import Data from "./data.js"
import Api from "../pages/api/index.js";

{/* refer App.scss for styling */}

const data = [
    ...Data 
    ,
    {
        'to' : "/api",
        'element' : Api ,
    },
    {
        'to' :"/" ,
        'element' : Navigate ,
        'props' : {
            'to' : '/dashboard'
        }
    }
    ,{
        'to' :"*" ,
        'element' : Navigate ,
        'props' : {
            'to' : '/dashboard'
        }
    },
]

const CustomRouter = ()=>{

    const isMobile = useMediaQuery({
        query: "(max-width:768px)"
    })

    return (
        <div className="main">
            
            <BrowserRouter>
                
                {!isMobile&&<Sidebar  isMobile={false}/>}  {/* don't show sidebar for desktop */}
               
                <div className="body" style={{marginTop:(isMobile?"20vh":"0")}}> 

                <Navbar isMobile={isMobile}/>  {/* isMobile is passed so as to make custom styling for mobile */}

                <Routes>
                    {
                        data.map((el:any)=>{
                            const El = el.element 
                            console.log(el.to)
                            return <Route path={el.to+"/*"} element={<El {...el.props!} />} ></Route>
                        })
                    }    
                </Routes>

                </div> 
            
            </BrowserRouter>
           

        </div>
    )

}

export default CustomRouter 
