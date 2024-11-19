const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/contracts/"); 
  },
  filename: (req, file, cb) => {
    
    cb(null, req.body.loanId + path.extname(file.originalname));
  },
});


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, 
  },
});

module.exports = upload;
