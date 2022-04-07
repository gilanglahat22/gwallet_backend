const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const commonHelper = require("../helper/common");

const isAdmin = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next({
        status: 401,
        message: "Unauthorized account! Please login to verify your identity."
      });
    }
    const verifyOptions = {
      issuer: "ankasa"
    };
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey, verifyOptions);
    if (decoded.role !== "admin") {
      next({ status: 400, message: "You are not authorized to continue" });
    } else {
      req.decoded = decoded;
      next();
    }
  } catch (error) {
    if (error && error.name === "JsonWebTokenError") {
      return next({ status: 400, message: "Invalid Token!" });
    } else if (error && error.name === "TokenExpiredError") {
      return next({ status: 400, message: "Token Expired!" });
    } else {
      return next({ status: 400, message: "Token Inactive!" });
    }
  }
};

const userTokenVerification = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next({
        status: 401,
        message: "Unauthorized account! Please login to verify your identity."
      });
    }
    const verifyOptions = {
      issuer: "ankasa"
    };
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey, verifyOptions);
    req.decoded = decoded;
    next();
  } catch (error) {
    if (error && error.name === "JsonWebTokenError") {
      return next({ status: 400, message: "Invalid Token!" });
    } else if (error && error.name === "TokenExpiredError") {
      return next({ status: 400, message: "Token Expired!" });
    } else {
      return next({ status: 400, message: "Token Inactive!" });
    }
  }
};

const emailTokenVerification = async (req, res, next) => {
  try {
    const emailToken = req.params.token;
    const secretKey = process.env.SECRET_KEY;
    const verifyOptions = {
      issuer: "ankasa"
    };
    const decoded = jwt.verify(emailToken, secretKey, verifyOptions);
    const fullname = decoded.fullname;
    const email = decoded.email;
    const activateUser = await userModel.updateVerifiedUser(fullname, email);
    // res.redirect("somewhere")
    commonHelper.response(
      res,
      activateUser,
      200,
      `User with email ${email} is verified`,
      null
    );
  } catch (error) {
    if (error && error.name === "JsonWebTokenError") {
      return next({ status: 400, message: "Invalid Token!" });
    } else if (error && error.name === "TokenExpiredError") {
      return next({ status: 400, message: "Token Expired!" });
    } else {
      return next({ status: 400, message: "Token Inactive!" });
    }
  }
};

const resetPasswordEmailTokenVerification = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next({ status: 403, message: "Server Need Token" });
    }
    const verifyOptions = {
      issuer: "ankasa"
    };
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey, verifyOptions);
    req.decoded = decoded;
    next();
  } catch (error) {
    if (error && error.name === "JsonWebTokenError") {
      return next({ status: 400, message: "Invalid Token!" });
    } else if (error && error.name === "TokenExpiredError") {
      return next({ status: 400, message: "Token Expired!" });
    } else {
      return next({ status: 400, message: "Token Inactive!" });
    }
  }
};

module.exports = {
  isAdmin,
  userTokenVerification,
  emailTokenVerification,
  resetPasswordEmailTokenVerification
};
