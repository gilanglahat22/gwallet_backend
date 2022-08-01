import multer from "multer";
import path from "path";

const limits = { fileSize: 1024 * 1024 };

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req:any, file:any, cb:any) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
  limits: limits
});

export default module;
