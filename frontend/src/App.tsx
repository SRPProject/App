import { BrowserRouter } from "react-router-dom";
import { useState,createContext ,useEffect,useReducer } from "react";
import { CustomRouter } from "./Routes";
import { verifyLogin } from "./services/login.service";
import Loader from "./components/Loader";
import Notification from "./components/Notification";

export const Context = createContext({})

//reducer for notification manager 
const reducer = ({state, action}:{state:any,action:any}) => {

  switch(action.type){
    case "Success":
      return {
        status : "Success",
        message : action.message 
      }
    case "Failure" : 
      return {
        status : "Failure",
        message : action.message 
      }

    case "None" :
      return {
        status : "None",
        message : "None"
      }
    
    default : 
    return {
        status: "General",
        message : action.message 
    }
  }

} 

function App() {

  const [isAuth, changeAuth] = useState<Boolean>(true);
  const [isLoading, changeLoading] = useState<Boolean>(true);  
  const [notify, changeNotify] = useReducer<any>(reducer,{
    status : "None",
    message : "None" 
  })  
  const [data, changeData] = useState<any>({ role: "student" })


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
    
      <Context.Provider value={{ data,changeNotify }}>
        
          {isLoading ? <Loader width="100vw" height="100vh" /> :
          <BrowserRouter>
            <CustomRouter isAuth={isAuth} role={data.role} />
          </BrowserRouter>} 

        <Notification notify={ notify} />
        
      </Context.Provider>
    </div>
  );
}

export default App;
