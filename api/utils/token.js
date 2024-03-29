const jwt = require("jsonwebtoken");
const JWTDetails=require("../config/config").JWTDetails;

// get token present in rquest 
const getToken = (request) => {
  
  var token = null;
 
  request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
    
    var parts = cookie.match(/(.*?)=(.*)$/)

    if(parts && parts[1]=="accessToken") {
      token = parts[2]
    }
    
  });

  return token 

};



const verifyToken = (request) => {
  
  const token = getToken(request);

  console.log(token)

  if (!token) return null;
 
  try {
    
    const decoded = jwt.verify(token, JWTDetails.secret);
    
    return decoded
  }
  catch (err) {
    console.log(err)
    return null 
  }
  
}


module.exports = {
  verifyToken
}