require("dotenv").config();
const cloudinary = require("./src/utils/cloudinary");
import express from "express";
import morgan from "morgan";
import cors from "cors";
const commonHelper = require("./src/helper/notFoundHandling");
const errorHelper = require("./src/helper/errorHandling");

// routes
const userRoutes = require("./src/routes/user_routes");
const walletRoutes = require("./src/routes/wallet_routes");
const transactionRoutes = require("./src/routes/transaction_routes");

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
