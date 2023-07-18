const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../uploads/"),
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

const multerUpload = multer({ storage });

module.exports = multerUpload;
