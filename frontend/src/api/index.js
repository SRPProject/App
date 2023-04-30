
import axios from "axios"
import tokenFunc from "./token"
import {toast} from "react-toastify"

const token = tokenFunc.getService()

const axiosObj  = axios.create({
    baseURL: `http://localhost:3001/api`,
    headers : {
        'accept' : 'application/json' 
    },
    validateStatus: function (status) {
        return status<500; // default
    },    
}) 

// insert token before send

axiosObj.interceptors.request.use (

    function(config){

        const jwt = token.getToken()

        if(!jwt) {

            config.headers.Authorization = "Bearer " + "no_token" 

        }

        else {

            config.headers.Authorization = "Bearer "+jwt 

        }

        return config 

    },
    function(error){
        return Promise.reject(error);
    }
)



// look for errors in response 
axiosObj.interceptors.response.use(

    function(config){
        return config  
    },
    function(error){
        
        console.log("error:")
        
        console.log(error)

        if(error.response && error.response.status===500) toast.error("Internal Server Error")

        if(!error.response) toast.error("Check Your internet ")

        return Promise.reject(error)
    }

)

export default axiosObj 