const fs = require("fs");
const { promisify } = require("util");

const writeFileAsync = promisify(fs.writeFile);

const saveFile = async (buffer, directory, fileName) => {
  fileName = Date.now() + "_" + fileName;

  await writeFileAsync(`./files/${directory}/${fileName}.pdf`, buffer, {
    flag: "wx",
  });

  return directory + "/" + fileName;
};

module.exports = saveFile;
