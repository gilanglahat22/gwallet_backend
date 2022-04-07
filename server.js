require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const commonHelper = require("./src/helper/notFoundHandling");
const errorHelper = require("./src/helper/errorHandling");

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
// app.use("/users", userRoutes);

// helpers
app.use(commonHelper.helperNotFoundMessage);

// error handling
app.use(errorHelper.errorHandling);

// will use PORT 3300
app.listen(PORT, () => {
  console.log(`Server is running in PORT ${PORT}`);
});
