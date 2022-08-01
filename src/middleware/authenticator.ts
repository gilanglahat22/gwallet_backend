import jwt from "jsonwebtoken";

const isAdmin = async (req: any, res: any, next: any) => {
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
      issuer: "gwallet"
    };
    const secretKey:any = process.env.SECRET_KEY_JWT;
    const decoded: any = jwt.verify(token, secretKey, verifyOptions);
    if (decoded.role !== "admin") {
      next({
        status: 400,
        message: "You are not authorized to do this action!"
      });
    } else {
      req.id = decoded.id;
      req.email = decoded.email;
      req.role = decoded.role;
      next();
    }
  } catch (error:any) {
    if (error && error.name === "JsonWebTokenError") {
      return next({ status: 400, message: "Invalid Token!" });
    } else if (error && error.name === "TokenExpiredError") {
      return next({ status: 400, message: "Token Expired!" });
    } else {
      return next({ status: 400, message: "Token Inactive!" });
    }
  }
};

const verifyAccess = async (req: any, res: any, next: any) => {
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
      issuer: "gwallet"
    };
    const secretKey:any = process.env.SECRET_KEY_JWT;
    const decoded:any = jwt.verify(token, secretKey, verifyOptions);
    req.id = decoded.id;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (error:any) {
    if (error && error.name === "JsonWebTokenError") {
      return next({ status: 400, message: "Invalid Token!" });
    } else if (error && error.name === "TokenExpiredError") {
      return next({ status: 400, message: "Token Expired!" });
    } else {
      return next({ status: 400, message: "Token Inactive!" });
    }
  }
};

const verifyEmail = (req: any, res: any, next: any) => {
  const token = req.params.token;

  try {
    const privateKey:any = process.env.SECRET_KEY_JWT;
    const decoded:any = jwt.verify(token, privateKey);
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (error:any) {
    if (error && error.name === "JsonWebTokenError") {
      return next({ status: 400, message: "Invalid Token!" });
    } else if (error && error.name === "TokenExpiredError") {
      return next({ status: 400, message: "Token Expired!" });
    } else {
      return next({ status: 400, message: "Token Inactive!" });
    }
  }
};

const resetPasswordEmailTokenVerification = async (req: any, res: any, next:any) => {
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
      issuer: "gwallet"
    };
    const secretKey:any = process.env.SECRET_KEY_JWT;
    const decoded = jwt.verify(token, secretKey, verifyOptions);
    req.decoded = decoded;
    next();
  } catch (error:any) {
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
  verifyAccess,
  verifyEmail,
  resetPasswordEmailTokenVerification
};

export default module;
