// module.exports = {
//     secret: "au_sims-secret-key"
//   };

const dotenv = require('dotenv');
dotenv.config();
const nodemailer=require('nodemailer');



let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: 'mail@gmail.com',//use mail id
      pass: '',//use app password for of gmail
    }
    
});

let jwtDetails={
  secret: 'NHAvVUdSWz9UOSI2XUBmVShdMXA0bGxJYTAnc217J1whfWsiaWRZfnI4SXtrQHpuTzFvUD1Eci9QIUc2bjEiJ1BZXlJbPWowRl1TIyRrRHtVWyVxKSIybldwcydSaTpCTThGXz5uUSs8YHQle1BtL3JeXEFma2Jfe3JBaGQmVyw/KFxKLSpubFdmU0AqZXZ0PWAwbWEgZ05OXUo5NVRdYURhenxRflE2R1Z1JkV3QytKIEpBPyctViovWC4/JShsJ0EwXClRXjR7czN5WThMKVt2Kmwyfjo2XThEM0d8KlQ+PVd4RFckJThkXXtbQUU9XzBQL3FZTHZvaT4mejxhKGRrVj1kSSFCPTdwSjVaT3oyPjhTbTA1bnVnTEhrLXQ2',
  jwtExpiration: 3600,           // 1 hour
  jwtRefreshExpiration: 86400,   // 24 hours

  /* for test */
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes
};
module.exports = {
  // sourcemail: process.env.source_emailid,
  // sourcepswd: process.env.source_passsword,
  transporter,
  jwtDetails
};