import {Route,Routes} from "react-router-dom"
import Admin from "./admin"
import SuperAdmin from "./super-admin"
import Student from "./student"
import Login from "./components/Login/Login"


export function CustomRouter ({isAuth,role}:{isAuth:Boolean,role:string}){

    //authorised user

    if (isAuth) {

        if (role ==="admin") return <Admin />
            
        else if (role === "super-admin") return <SuperAdmin />
            
        else return <Student/> 

    }

    // un-authorised user 
    return (
        <Routes>
            <Route path="/" element={<Login/>}></Route>  
            {/*<Route path="/set-password"></Route>*/}
        </Routes>
    )

}