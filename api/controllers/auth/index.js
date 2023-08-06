const { Degree, Batch } = require("../../models/comod");
const { Faculty } = require("../../models/roles");
const { verifyToken } = require("../../utils/token");
const login = require("./login");
const password = require("./password");
const signup = require("./signup");

const JWTVerify = async (req, res) => {
  const token = req.headers.authorization;

  if (!token || token === "Bearer no_token")
    return res.status(401).send({ message: "token required" });

  const data = verifyToken(token);

  if (data === null) return res.status(401).send({ message: "invalid token" });

  return res.status(200).send({ message: "token is valid", data });
};


// send all faculty and bacthes avalibale 
const getData = async (req, res) => {
  try {

    const faculty = await Faculty.findAll({
      attributes: ["facultyId", "name"],
    });
    
    const batch = await Batch.findAll();

    console.log(batch)

    return res.status(200).send({
      data: {
        faculty,
        batch,
      },
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: "Server Error" });
  }
};

module.exports = {
  login,
  signup,
  password,
  JWTVerify,
  getData,
};
