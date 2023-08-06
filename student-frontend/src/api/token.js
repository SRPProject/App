
function Token (){

    var service ; 
    //singlton pattern 
    function getService(){
    
        if(!service){
            service = this 
        }

        return service 
    
    }

    function getToken(){

        return localStorage.getItem("jwt-token")

    }

    function setToken(token){

        return localStorage.setItem('jwt-token',token)

    }

    function clearToken(){

        localStorage.removeItem('jwt-token')

    }

    return {
        getService ,
        clearToken ,
        setToken,
        getToken
    }

}

export default new Token()