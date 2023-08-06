const e = require("express");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const { jwtDetails } = require("../config/config");

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.status(401).send({ message: "Unauthorized!" });
};
const verifyAdminToken = async (req, res, next) => {
  // var token=req.body.accessToken;
  try {
    console.log("inside logger");
    var token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
      // return false;
    } else {
      jwt.verify(token, jwtDetails.secret, (err, decoded) => {
        if (err) {
          return catchError(err, res);
        }
        req.body.role = "AdMiN";
        next();
      });
    }
  } catch (err) {
    return res.sendStatus(500).send({ message: "Server Error." });
  }
};

module.exports = { verifyAdminToken };
