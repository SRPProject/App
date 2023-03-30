import { BrowserRouter } from "react-router-dom";
import { useState,createContext ,useEffect } from "react";
import { CustomRouter } from "./Routes";
import { verifyLogin } from "./services/login.service";
import Loader from "./components/Loader";
import {Snackbar,Alert} from "@mui/material"

const Context = createContext({})

function App() {
  const [isAuth, changeAuth] = useState<Boolean>(false);
  const [isLoading, changeLoading] = useState<Boolean>(true);
  const [notify,changeNotify] = useState<Boolean>(true);
  const [data, changeData] = useState<any>({role:"student"})
  const [open, setOpen] = useState<boolean>(true);

  const handleClick = () => {
    setOpen(true);
  };


  useEffect(() => {
   
    (async () => {
      
      const data: any = await verifyLogin();
 
      const details:any = {
        message : "failure", 
        data :{name:"kumaran"}
      }
      
      if (details.message==="success") {
        changeAuth(true);
        changeData(details.data);
      }
  
      else changeLoading(false);
  
    })();
    
    
  },[])

  useEffect(() => {
    
    changeLoading(false) 

  },[data])

  return (
    <div className="App">
    
      <Context.Provider value={{ data }}>
        
          {isLoading ? <Loader width="100vw" height="100vh" /> :
          <BrowserRouter>
            <CustomRouter isAuth={isAuth} role={data.role} />
          </BrowserRouter>} 

          {
            notify&&<Snackbar open={open} autoHideDuration={6000} onClose={handleClick}>
            <Alert onClose={handleClick} severity="success" sx={{ width: '100%' }}>
              This is a success message!
            </Alert>
          </Snackbar>
          }
        
      </Context.Provider>
    </div>
  );
}

export default App;
