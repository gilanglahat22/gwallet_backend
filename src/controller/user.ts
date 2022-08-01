import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
const userModels = require("../models/user");
const walletModels = require("../models/wallet");
const standardResponse = require("../helper/responseHandling");
const commonHelper = require("../helper/common");

// cloudinary
const cloudinary = require("../utils/cloudinary");

// User's Authentication
const signUp = async (req: any, res: any, next: any) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userId = uuidv4();
    const user = await userModels.searchAccount(email);
    if (user.length > 0) {
      return next({ status: 403, message: "This account is already exist!" });
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const account = {
      id: userId,
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashPassword
    };
    const wallet = {
      id: uuidv4(),
      user_id: userId
    };

    const payload:any = {
      id: account.id,
      name: `${account.first_name} ${account.last_name}`,
      email: account.email
    };
    const token = commonHelper.generateToken(payload);
    payload.token = token;
    console.log(token);

    commonHelper.sendEmailVerification(email, token);

    const result:any = await userModels.createNewAccount(account);
    const createWallet:any = await walletModels.createWallet(wallet);
    standardResponse.response(
      res,
      payload,
      200,
      `Registration Success! New account with email: ${account.email} has been created.`
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const login = async (req:any, res:any, next:any) => {
  try {
    const { email, password } = req.body;
    const [account] = await userModels.searchAccount(email);
    if (!account) {
      return next({
        status: 403,
        message: "Please check your email or password!"
      });
    }
    const loginData:any = {
      id: account.id,
      email: account.email,
      role: account.role
    };
    const checkPassword = await bcrypt.compare(password, account.password);
    if (!checkPassword) {
      return next({
        status: 403,
        message: "Please check your email or password!"
      });
    }
    const payload = loginData;
    const token = commonHelper.generateToken(payload);
    loginData.token = token;
    standardResponse.response(
      res,
      loginData,
      200,
      `Account with email: ${account.email} successfully login!`
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const verifyAccount = async (req:any, res:any, next:any) => {
  try {
    const email = req.email;
    const updatedAt = new Date();
    const data = {
      verified: "verified",
      updated_at: updatedAt
    };
    const result = await userModels.updateAccount(data, email);
    res.redirect(
      "http://localhost:3000/auth/signup/success?account=verified&status=success"
    );
    console.log(result);
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const createPinById = async (req:any, res:any, next:any) => {
  try {
    const id = req.params.id;
    const { PIN } = req.body;
    const convertedPIN = PIN.toString();
    const updatedAt = new Date();
    if (convertedPIN.length < 6) {
      return next({
        status: 403,
        message: "Please input 6 Digits number to create PIN!"
      });
    }
    const saltRounds = 10;
    const hashedPIN = await bcrypt.hash(convertedPIN, saltRounds);
    const data = {
      PIN: hashedPIN,
      updated_at: updatedAt
    };
    const dataCreatePIN = {
      id: id,
      updated_at: updatedAt
    };
    // eslint-disable-next-line no-unused-vars
    const result = await userModels.updateAccountById(data, id);
    standardResponse.response(
      res,
      dataCreatePIN,
      200,
      "PIN successfully created!"
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

//   User's Profile
const profile = async (req:any, res:any, next:any) => {
  try {
    const email = req.email;
    const [account] = await userModels.detailsAccount(email);

    standardResponse.response(
      res,
      account,
      200,
      `Profile with email: ${email} successfully requested!`
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const addProfilePicture = async (req:any, res:any, next:any) => {
  try {
    const email = req.email;
    const picture = req.file;
    const resultClodinary = await cloudinary.uploader.upload(picture.path);

    // console.log(req.file.path);
    // console.log(picture);
    // console.log(resultClodinary);

    const updatedAt = new Date();
    const data = {
      picture: resultClodinary.secure_url,
      updated_at: updatedAt
    };
    const result:any = await userModels.updateAccount(data, email);
    standardResponse.response(
      res,
      data,
      200,
      `Profile picture with email: ${email} successfully updated!`
    );
  } catch (error:any) {
    console.log(error.message);
    console.log(error.stack);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const addPhoneNumber = async (req:any, res:any, next:any) => {
  try {
    const email = req.email;
    const dataProfile = req.body;
    const updatedAt = new Date();
    const data = {
      phone: dataProfile.phone,
      updated_at: updatedAt
    };
    // eslint-disable-next-line no-unused-vars
    const result:any = await userModels.updateAccount(data, email);
    standardResponse.response(
      res,
      data,
      200,
      `Profile phone: ${dataProfile.phone} successfully updated!`
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const deletePhoneNumber = async (req:any, res:any, next:any) => {
  try {
    const email = req.email;
    const updatedAt = new Date();
    const data = {
      phone: null,
      updated_at: updatedAt
    };
    // eslint-disable-next-line no-unused-vars
    const result = await userModels.updateAccount(data, email);
    standardResponse.response(
      res,
      data,
      200,
      `Phone number with email: ${email} has been deleted!`
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const changePassword = async (req:any, res:any, next:any) => {
  try {
    const email = req.email;
    const { currentPassword, newPassword, repeatNewPassword } = req.body;
    const [account] = await userModels.searchAccount(email);
    if (!account) {
      return next({
        status: 401,
        message: "Your account is not registered!"
      });
    }
    const checkPassword = await bcrypt.compare(
      currentPassword,
      account.password
    );
    if (!checkPassword) {
      return next({
        status: 401,
        message: "Please check again your current password!"
      });
    }
    if (
      currentPassword === newPassword ||
      currentPassword === repeatNewPassword
    ) {
      return next({
        status: 400,
        message:
          "Your new password can not be the same as your current password!"
      });
    } else if (newPassword !== repeatNewPassword) {
      return next({
        status: 400,
        message: "Password isn't match! Please check your new password!"
      });
    }
    const updatedAt = new Date();
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);
    const data = {
      password: hashPassword,
      updated_at: updatedAt
    };
    const dataChangePassword = {
      email: email,
      updated_at: data.updated_at
    };
    // eslint-disable-next-line no-unused-vars
    const result:any = await userModels.updateAccount(data, email);
    standardResponse.response(
      res,
      dataChangePassword,
      200,
      `Password with email: ${email} successfully updated!`
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const createPIN = async (req:any, res:any, next:any) => {
  try {
    const email = req.email;
    const { PIN } = req.body;
    const updatedAt = new Date();
    const convertedPIN = PIN.toString();
    if (convertedPIN === "") {
      return next({ status: 403, message: "Please input your PIN!" });
    } else if (convertedPIN.length < 6) {
      return next({
        status: 403,
        message: "Please input 6 Digits number to create PIN!"
      });
    }
    const saltRounds = 10;
    const hashedPIN = await bcrypt.hash(convertedPIN, saltRounds);
    const data = {
      PIN: hashedPIN,
      updated_at: updatedAt
    };
    const dataCreatePIN = {
      email,
      updated_at: updatedAt
    };
    // eslint-disable-next-line no-unused-vars
    const result:any = await userModels.updateAccount(data, email);
    standardResponse.response(
      res,
      dataCreatePIN,
      200,
      `Account with email: ${email} successfully created PIN!`
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const confirmationPIN = async (req:any, res:any, next:any) => {
  try {
    const email = req.email;
    const { PIN } = req.body;
    const convertedPIN = PIN.toString();
    if (convertedPIN === "") {
      return next({ status: 403, message: "Please input your PIN!" });
    }
    const [account] = await userModels.searchAccount(email);
    if (!account) {
      return next({ status: 403, message: "Your account is not registered!" });
    } else if (!account.PIN) {
      return next({
        status: 403,
        message: "You hasn't created a PIN. Please create PIN now!"
      });
    }
    const checkedPIN = await bcrypt.compare(convertedPIN, account.PIN);
    if (!checkedPIN) {
      return next({ status: 403, message: "You input the wrong current PIN!" });
    }
    standardResponse.response(res, null, 200, "Your PIN is match!");
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

// Admin's Authorization and others
const listAccounts = async (req:any, res:any, next:any) => {
  try {
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const result = await userModels.listAccounts({
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await userModels.calculateAccount();
    const { total } = calcResult[0];
    standardResponse.response(
      res,
      result,
      200,
      `Data requests success! Total accounts: ${total}`,
      {
        currentPage: page,
        limit: limit,
        totalAccount: total,
        totalPage: Math.ceil(total / limit)
      }
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const detailsAccount = async (req:any, res:any, next:any) => {
  try {
    const userId = req.params.id;
    const [result] = await userModels.searchAccountById(userId);
    standardResponse.response(
      res,
      result,
      200,
      `Data Request Success! Details account with id: ${userId}`
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const deleteAccount = async (req:any, res:any, next:any) => {
  try {
    const userId = req.params.id;
    const result = await userModels.deleteAccount(userId);
    console.info(result);
    standardResponse.response(
      res,
      null,
      200,
      `Account with id: ${userId} has been deleted.`
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const searchUsers = async (req:any, res:any, next:any) => {
  try {
    const search = req.query.name;
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "asc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;

    const result = await userModels.searchUsers({
      search: search,
      sort: sort,
      order: order,
      limit,
      offset
    });
    const calcResult = await userModels.calculateAccount();
    const { total } = calcResult[0];
    standardResponse.response(res, result, 200, "Data requests success!", {
      currentPage: page,
      limit: limit,
      totalAccount: total,
      totalPage: Math.ceil(total / limit)
    });
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

module.exports = {
  signUp,
  verifyAccount,
  createPinById,
  login,

  profile,
  addProfilePicture,
  addPhoneNumber,
  deletePhoneNumber,
  changePassword,
  createPIN,
  confirmationPIN,

  listAccounts,
  deleteAccount,
  detailsAccount,
  searchUsers
};

export default module;
