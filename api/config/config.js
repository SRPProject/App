const dotenv = require('dotenv');
dotenv.config();
const nodemailer=require('nodemailer');
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: process.env.SOURCE_EMAIL,//use mail id
      pass: process.env.SOURCE_APPPASSWORD,//use app password for of gmail
    }
    
});

<<<<<<< HEAD
let jwtDetails={
  secret: process.env.JWT_SECRET_KEY,
  jwtExpiration: 3600,           // 1 hour
  jwtRefreshExpiration: 86400,   // 24 hours
=======
let JWTDetails={
  secret: process.env.JWT_SECRET_KEY,
  jwtExpiration: 3600*24,           // 1 hour
  // jwtRefreshExpiration: 86400,   // 24 hours
>>>>>>> origin/kumaran

  /* for test */
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes
};
module.exports = {
<<<<<<< HEAD

  transporter,
  jwtDetails
=======
  // sourcemail: process.env.source_emailid,
  // sourcepswd: process.env.source_passsword,
  transporter,
  JWTDetails
>>>>>>> origin/kumaran
};