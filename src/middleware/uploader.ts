import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
    cb(null, "./src/uploads");
  },
  filename: function (req:any, file:any, cb:any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  }
});

const fileFilter = function (req:any, file:any, cb:any) {
  const ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return cb(
      new Error(
        "File extension is invalid! Make sure to change your file extension to '.png', '.jpg', or '.jpeg'."
      )
    );
  }
  cb(null, true);
};

const limits = { fileSize: 1024 * 1024 };

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});

module.exports = upload;

export default module;
