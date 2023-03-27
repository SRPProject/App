import {Route,Routes} from "react-router-dom"
import Admin from "./admin"
import Student from "./student"
import Login from "./components/Login/Login"


export function CustomRouter ({isAuth,role}:{isAuth:Boolean,role:string}){

    //authorised user

    if (isAuth) {

        if (role ==="admin") return <Admin />
            
        else if (role === "student") return <Student/>

    }

    // un-authorised user 
    return (
        <Routes>
            <Route path="/student" element={<Login role="student" />}></Route>  
            <Route path="/admin" element={<Login role="admin" />}></Route> 
            {/*<Route path="/set-password"></Route>*/}
        </Routes>
    )

}