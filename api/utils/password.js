const bcrypt = require("bcrypt");
const saltRounds = 10;

const getHashPassword = async (plainPassword) => {
  const reg = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

  if (!reg.test(plainPassword))
    return new Promise((resolve, reject) => reject("Weak Password"));

  try {
    const salt = await bcrypt.genSalt(saltRounds);

    const hashPassword = await bcrypt.hash(plainPassword, salt);

    return new Promise((resolve, reject) => resolve(hashPassword));
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
};

const verifyPassword = async (plainPassword, encryptedPassword) => {
  try {
    console.log(encryptedPassword)
    const status = await bcrypt.compare(plainPassword, encryptedPassword);

    return status;
  } catch (err) {
    console.log(err)
    return new Promise((resolve, reject) => reject("Internal Server Error"));
  }
};

module.exports = {
  getHashPassword,
  verifyPassword,
};
