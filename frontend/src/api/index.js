
const axios = require("axios")
const token = require("./token")().getService()

const axiosObj  = axios.create({
    baseURL: `http://localhost:3001`,
    headers : {
        'accept' : 'application/json' 
    }
}) 

// insert token before send

const unAuthRoutes = [ 'login' , 'set-password' , 'jwt-verify' ]

axiosObj.interceptors.request.use (
    function(config){
        
        if(unAuthRoutes.includes(config.url)) return config 

        const jwt = token.getToken()

        console.log(jwt)

        return config 

    },
    function(error){
        return Promise.reject(error);
    }
)

axiosObj.get("docs/interceptors").
    then(resp=>console.log(resp))


// look for errors in response 
// axiosObj.interceptors.response = ()=>{

// }

module.exports = axiosObj 