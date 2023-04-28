import React,{useEffect, useState} from "react";
import { CustomContext } from "./utils/Context";
import Loader from "./components/Loader";
import CustomRouter from "./utils/Routes";
import Login from "./pages/login";
import "./App.scss"

function App() {
  
  
  const [loading,setLoading] = useState<Boolean>(true)
  const [data ,setData] = useState<any>([])
  const [auth,setAuth] = useState<Boolean>(false)

  const value = {
    data ,
    setData ,
    setAuth 
  }

  useEffect(()=>{

    (async ()=>{

      setLoading(false)

    })();

  },[])

   return (
    <CustomContext.Provider value={value}>
         
         <div className="App">
           
          {
            loading ? <span className="main-loader"> <Loader/> </span>
                    :  <div>
                          {
                              auth ? <CustomRouter/> : <Login/>
                          }
                       </div>
          }

          </div>

    </CustomContext.Provider>

  );
}

export default App;
