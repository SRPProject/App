import { BrowserRouter } from "react-router-dom";
import { useState,createContext ,useEffect } from "react";
import { CustomRouter } from "./Routes";
import { verifyLogin } from "./services/login.service";
import Loader from "./components/Loader";

const Context = createContext({})

function App() {
  const [isAuth, changeAuth] = useState<Boolean>(true);
  const [isLoading, changeLoading] = useState<Boolean>(true);

  const [data, changeData] = useState<any>({role:"student"})


  useEffect(() => {
   
    (async () => {

     // const details: any = await verifyLogin();
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
    console.log("hi")
    changeLoading(false) 

  },[data])

  return (
    <div className="App">
    
      <Context.Provider value={{ data }}>
        
          {isLoading ? <Loader width="100vw" height="100vh" /> :
          <BrowserRouter>
            <CustomRouter isAuth={isAuth} role={data.role} />
          </BrowserRouter>} 
        
      </Context.Provider>
    </div>
  );
}

export default App;
