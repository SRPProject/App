const {
  Departments,
  Regulation,
  Degree,
  Batch,
} = require("../../../models/comod");
var logger = require("../../../utils/log")(module);
const getDepartments = async (req, res) => {
  try {
    const getDepts = await Departments.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (getDepts) {
      return res.status(200).send({ message: getDepts });
    } else {
      return res.status(400).send({ message: "No entries found .." });
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error Try again" });
  }
};

const getRegulations = async (req, res) => {
  try {
    const getRegs = await Regulation.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (getRegs) {
      return res.status(200).send({ message: getRegs });
    } else {
      return res.status(400).send({ message: "No entries found .." });
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error Try again" });
  }
};

const getDegrees = async (req, res) => {
  try {
    const getDegs = await Degree.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (getDegs) {
      return res.status(200).send({ message: getDegs });
    } else {
      return res.status(400).send({ message: "No entries found .." });
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error Try again" });
  }
};

const getBatches = async (req, res) => {
  try {
    const getBatches = await Batch.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (getBatches) {
      return res.status(200).send({ message: getBatches });
    } else {
      return res.status(400).send({ message: "No entries found .." });
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error Try again" });
  }
};
module.exports = { getDepartments, getRegulations, getDegrees, getBatches };
