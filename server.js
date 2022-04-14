require("dotenv").config();
const cloudinary = require("./src/utils/cloudinary");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const commonHelper = require("./src/helper/notFoundHandling");
const errorHelper = require("./src/helper/errorHandling");

// routes
const userRoutes = require("./src/routes/user.routes");
const walletRoutes = require("./src/routes/wallet.routes");
const transactionRoutes = require("./src/routes/transaction.routes");

const app = express();
const PORT = process.env.PORT || 8000;

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
app.use("/users", userRoutes);
app.use("/wallet", walletRoutes);
app.use("/transaction", transactionRoutes);
// static picture routes
// app.use("/file", express.static("./src/uploads"));

// helpers
app.use(commonHelper.helperNotFoundMessage);

// error handling
app.use(errorHelper.errorHandling);

// will use PORT
app.listen(PORT, () => {
  console.log(`Server is running in PORT ${PORT}`);
});
