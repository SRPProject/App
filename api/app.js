var logger=require("./utils/log")(module)
const express = require('express');
const app = express();
const cors=require('cors');
const con=require("./config/dbconnection")
const authroutes=require('./routes/auth');
const adminroutes=require('./routes/admin');
const studentroutes=require("./routes/students");
const  utils=require('./utils');

// these routes doesn't need jwt token 
const unAuthRoutes = ["/api/auth/admin","/api/auth/student","/api/auth/signup-admin/","/api/auth/set-password","/api/auth/forgot-password"]

// const adminRoutes = require('./routes/admin');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// DB-Connection 
con.
  sync().
  then(() => {
    logger.info("Synced db.");
  })
  .catch((err) => {
    logger.error(err);
    logger.info("Failed to sync db: " + err.message);
  });

const {Admin}=require("./models/roles");

//filter authorised routes from unauthorised 
app.use((req, res, next) => {

  logger.info(req.url);
  const flag = unAuthRoutes.includes(req.url);  
  if (flag) {next();}
  
  else {

    // verify jwt and proceed 
    const token = req.headers.authorization
    
    console.log("JWT : "+token)

    let data ;

    if(!token || token==="Bearer no_token") data= null 

    else data = utils.token.verifyToken(req.headers.authorization);
    
    if (data) {

      if (req.url === "/api/auth/JWTVerify") {
       
        return res.status(200).send({ message:"valid token", data })
      }
      else {
        res.locals.role = data.role
        res.locals._id = data.id
        next();
      }
    }
    // token expired or invalid status code 
    else return res.status(401).send({ message:"Un-Authorized ,need token to enter" }) 
  }
})


app.use('/api/auth', authroutes);


// admin-only routes 
app.use('/api/admin',
 (req,res,next) => {
  
  if (res.locals.role == "Admin") {next()}
  
 else{ return res.status(401).send({status:"failure",message:"Admin-only routes"})}

} , 
 adminroutes );

// app.use('/api/admin',adminroutes);

//student-only routes 

app.use('/api/student',
 (req,res,next) => {
    
  if (res.locals.role == "Student") next()
  
  else { return res.status(401).send({status:"failure",message:"Student-only routes"})}

},
 studentroutes);


app.use(function(req, res, next) {
  return res.status(404)
});



app.listen(3001, (err) => {
  if (!err) logger.info(`App Started at ${3001} `)
  else logger.error("Error Starting") ;
})
