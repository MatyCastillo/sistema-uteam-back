const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

// const storage = multer.diskStorage({
//   destination: path.join(__dirname, "../images"),

//   filename: (req, file, cb) => {
//     let currentDate = Date.now();
//     cb(null, uuid.v4() + path.extname(file.originalname).toLocaleLowerCase());
//   },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
