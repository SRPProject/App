const {transporter}=require("../config/config");


const sendMail = async (html,subject,to) => {
    
    var mailOptions={
        to ,
        subject,  
        html 
    };

    return new Promise((resolve, reject) => {
        
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) reject();
            else resolve();
        })

    }); 

}


module.exports = {
    sendMail
}