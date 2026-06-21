const multer = require("multer");
const path = require("path");

// Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

// File Validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;