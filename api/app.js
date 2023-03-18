const express = require('express');
const app = express();
const cors=require('cors');
const utils = require("./utils");
const authroutes=require('./routes/auth');

// these routes doesn't need jwt token 
const unAuthRoutes = ["/api/auth/admin","/api/auth/student","/api/auth/signup-admin"]

// const adminRoutes = require('./routes/admin');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// DB-Connection 
utils.dbConnection.
  sync().
  then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


//filter authorised routes from unauthorised 
app.use((req, res, next) => {

  const flag = unAuthRoutes.includes(req.url)
  
  if (flag) next();
  
  else {

    // verify jwt and proceed 

    const data = utils.token.verifyToken(req);

    console.log(data)
    
    if (data) {

      if (req.url === "/api/auth/JWTVerify") {
       
        return res.status(200).send({ status:"success", data })
      }
      else {
        res.locals.role = data.role
        res.locals._id = data.id
        next();
      }
    }
    // token expired or invalid status code 
    else return res.status(498).send({ status:"failure" }) 

  }

})


app.use('/api/auth', authroutes);


// admin-only routes 
app.use('/api/admin', (req,res,next) => {
    
  if (res.locals.role == "Admin") next()
  
  return res.status(401).send({status:"failure",message:"Admin-only routes"})

} ,  (req,res)=> {
  return res.status(200).send({message:"admin routes to be implemented"})
} );


//student-only routes 

app.use('/api/student', (req,res,next) => {
    
  if (res.locals.role == "Student") next()
  
  return res.status(401).send({status:"failure",message:"Student-only routes"})

}, (req,res)=> {
    return res.status(200).send({message:"student routes to be implemented"})
} );


app.use(function(req, res, next) {
  return res.status(404)
});


app.listen(3001, (err) => {
  if (!err) console.log("App Started!!")
  else console.log("Error Starting") 
})
