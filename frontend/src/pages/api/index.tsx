
import React from "react"

const data =  {
    
    "Authentication" : {
        "jwt-verify" :[
            {
                "endpoint" : "/api/auth/JWTVerify" ,
                "method" : "ANY",
                "data" : "None",
                "response" : {
                    "200" : { message :"", data :""} ,
                    "498" :  {message : ""}
                }
            }
        ] , 
        "login" : [
            {
                "endpoint" : "/api/auth/admin",
                "method" :"POST" ,
                 "data" : { mail :"" , password :"" },
                 "response" : {
                    "200" : {message:"" ,accessToken:""},
                    "401" : {message :""} 
                 }
            },
            {
                "endpoint" : "/api/auth/student" ,
                 "method" : "POST" ,
                 "data" : { mail:"" , password:"" },
                 "response" : {
                    "200" : {message:"" ,accessToken:""},
                    "400" : {message :""} 
                 }
            }
        ],
        "password" : [
             {
                "endpoint" : "/api/auth/set-password" ,
                 "method" : "POST" ,
                 "data" :  { userId :"", password:"" , confirmpassword:"", linkCode:"" },
                "response" : {
                    "200" : {message :""},
                    "400" : {message :""}
                }
            },
             {
                "endpoint" : "/api/auth/forgot-password",
                "method" : "POST" ,
                "data" : { mail:"" },
                "response" : {
                    "200" : {message :""},
                    "400" : {message:""}
                }
             }  
        ]
        ,
        "signup" : [
             {
                "endpoint" : "/api/auth/signup-admin" 
             }
        ]
    } 

}





export default function Api(){

    return(
        <div  style={{
            backgroundColor : "#ebf6f7" ,
            color :"black" ,
            padding : "2rem",
            borderRadius :"10px",
            fontFamily:"monospace"
        }}>
            {

                Object.keys(data).map((el:any)=>{

                    const obj = data[el] 

                    return(

                        <div >
                            <h3 style={{margin:"1rem 0"}}>{el}</h3>
                            {
                                Object.keys(obj).map((el:any)=>{
                                    return(
                                        <div style={{margin:"1rem 0"}}>
                                            <h4 style={{margin:"1rem 0",textTransform:"uppercase"}}>{el}</h4>
                                            {
                                        
                                                obj[el].map((item:any)=>{
                                                    return(
                                                        <div style={{margin:"2rem 0" ,backgroundColor:"ButtonFace",padding:"1rem"}}>
                                                             {
                                                                
                                                                Object.keys(item).map((el:any)=>{
                                                                    return(
                                                                        <div 
                                                                            style={{margin:"1rem 0",
                                                                                    }}
                                                                        ><span style={{color:'blue',textTransform:"capitalize"}}>{el}</span>:{JSON.stringify(item[el])}</div>
                                                                    )
                                                                })
                                                             }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                    )

                })

            }
        </div>

    )

}