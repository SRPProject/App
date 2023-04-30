var logger=require("./utils/log")(module)
const express = require('express');
const app = express();
const cors=require('cors');
const con=require("./config/dbconnection")
const authroutes=require('./routes/auth');
const adminroutes=require('./routes/admin');
const studentroutes=require("./routes/students");
const  utils=require('./utils');

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


app.use('/api/auth', authroutes); 

app.use((req, res, next) => {

    const data = utils.token.verifyToken(req);
    
    if (data) {

      if (req.url === "/api/auth/JWTVerify") {
       
        return res.status(200).send({ status:"success", data })
      }
      else {
        logger.info(data.role);
        logger.info(data.id)
        res.locals.role = data.role
        res.locals._id = data.id
        next();
      }
    }
    // token expired or invalid status code 
    else return res.status(498).send({ status:"failure" }) 
  // }
})





// admin-only routes 
app.use('/api/admin',
 (req,res,next) => {
  if (res.locals.role == "Admin") {next()}
  
 else{ return res.status(401).send({status:"failure",message:"Admin-only routes"})}

} , 
 adminroutes );

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
  if (!err) logger.info("App Started!!")
  else logger.error("Error Starting") ;
})
