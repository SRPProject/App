const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const {jwtDetails}=require("../config/config")
var logger=require("./log")(module)
=======
const JWTDetails=require("../config/config").JWTDetails;

>>>>>>> origin/kumaran
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
<<<<<<< HEAD
  logger.info(request.url);
  const token = getToken(request);

  logger.info(token)
=======
  
  const token = getToken(request);

  console.log(token)
>>>>>>> origin/kumaran

  if (!token) return null;
 
  try {
    
<<<<<<< HEAD
    const decoded = jwt.verify(token, jwtDetails.secret);
=======
    const decoded = jwt.verify(token, JWTDetails.secret);
>>>>>>> origin/kumaran
    
    return decoded
  }
  catch (err) {
<<<<<<< HEAD
    logger.info(err)
=======
    console.log(err)
>>>>>>> origin/kumaran
    return null 
  }
  
}


module.exports = {
  verifyToken
}