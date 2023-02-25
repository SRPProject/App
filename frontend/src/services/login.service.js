import axios  from "axios"
import Cookies from 'js-cookie'

// /api/verifyJWT : HEAD
// /api/admin/login/ :POST 
// /api/student/login :POST 
// /api/forgot-password : POST 


const instance = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
        "Content-Type": "application/json",
      },    
})


// @HEAD : /verifyJWT 
// data is nothing , extract token from cookie 
// response : { message :"" ,data}
export const verifyLogin = async () => {
    
    const jwt = Cookies.get("JWT_TOKEN")

    if (!jwt) return { message:"fail", data: {} }

    const res = await instance.head("/verifyJWT");
    
    if(res.message==="success")  return res 

    Cookies.remove("JWT_TOKEN")

    return res 

}


// @POST : /admin/login   and  /student/login 
// request : {email:"" ,password :""}
// response : {message :"", jwtToken :"" }
export const login = async (endpoint, data) => {
    
    const res = await instance.post(endpoint, data)
    
    if (res.message === "success") {
        
        Cookies.set("JWT_TOKEN", res.jwtToken)

        return res 
    }
    
    return res 

}


// @POST /forgot-password 
// data :{email:""}
// response : {message:"" }
export const forgotPassword = async (data) => {
    
    const res = await instance.post("/forgot-password",data)

    return res 

}



