import React,{useEffect, useState} from "react";
import { CustomContext } from "./utils/Context";
import Loader from "./components/Loader";
import CustomRouter from "./utils/Routes";
import Login from "./pages/login";
import { ToastContainer } from 'react-toastify';
import "./App.scss"
import 'react-toastify/dist/ReactToastify.css';
import axiosObj from "./api"
const endpoint = "/auth/JWTVerify"

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
      
      try {
        
        const resp = await axiosObj.head(endpoint)
        
        console.log(resp)
        
        if(resp.status===200) {
          setData(resp.data.data)
        }

      }
      catch(err:any){
          ;
      }

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

        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
          </div>

    </CustomContext.Provider>

  );
}

export default App;
