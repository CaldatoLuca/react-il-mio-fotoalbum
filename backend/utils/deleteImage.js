const path = require("path");
const fs = require("fs");

const deleteImage = (fileName, dir) => {
  let filePath = path.join(__dirname, `../public/${dir}`, fileName);
  console.log(__dirname);
  console.log(fileName);
  console.log(filePath);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`File ${filePath} was deleted successfully.`);
    } catch (err) {
      console.error(`Error deleting file ${filePath}:`, err);
    }
  } else {
    filePath = path.join(__dirname, `../public/${dir}`, fileName);
    fs.unlinkSync(filePath);
  }
};

module.exports = deleteImage;
