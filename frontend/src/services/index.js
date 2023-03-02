import axios from "axios"


const instance = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
        "Content-Type": "application/json",
      },    
})


instance.interceptors.request.use((config) => {
    
    //if token is not present don't send request 
    

}, (error) => {
    
})


instance.interceptors.response.use((config) => {
    
    // if token is not valid logout user !!

}, (error) => {
    
})

export default instance 