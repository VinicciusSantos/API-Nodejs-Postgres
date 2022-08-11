const multer = require("multer");
const path = require("path");
const crypto = require("crypto")
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

// const storageTypes = {
//     local: multer.diskStorage({
//         destination: (req, file, cb) => {
//           cb(null, "./uploads");
//         },
//         filename: (req, file, cb) => {
//             const { originalname } = file
//             cb(null, `${uuid()}-${originalname}`)
//         },
//     }),
// };

const storage = multer.memoryStorage()

module.exports = {
  dest: "./uploads",
  storage: storage,
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};