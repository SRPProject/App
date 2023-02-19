import axios from "axios"

const URL = "https://localhost:8000/api/login/"

const isTokenExpire = () => {
    return false 
}

// verify jwt 
export const verifyLogin = async () => {
    
    const jwt = localStorage.getItem("JWT")

    if (!jwt || isTokenExpire()) return { isAuth: false, data: {} }
    
    return {isAuth:true,data:{}}

}






