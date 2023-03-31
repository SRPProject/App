<<<<<<< HEAD
const dbConnection = require("../config/dbconnection")
=======
const dbConnection = require("./dbconnection")
>>>>>>> origin/kumaran
const mail = require("./mail")
const token = require("./token")

module.exports = {
    
    dbConnection,
    mail,
    token 
}