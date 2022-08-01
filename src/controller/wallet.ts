import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const walletModels = require("../models/wallet");
const topupModels = require("../models/topup");
const userModels = require("../models/user");
const standardResponse = require("../helper/responseHandling");

// wallet's controller
const listWallets = async (req:any, res:any, next:any) => {
  try {
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const result = await walletModels.listWallets({
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await walletModels.calculateWallet();
    const { total } = calcResult[0];
    standardResponse.response(
      res,
      result,
      200,
      `Data requests success! Total Wallets: ${total}`,
      {
        currentPage: page,
        limit: limit,
        totalWallet: total,
        totalPage: Math.ceil(total / limit)
      }
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

//   top up controllers
const topUpMethod = async (req: any, res: any, next: any) => {
  try {
    const email = req.email;
    const topupMethod = req.body.topup_method;

    const [wallet] = await walletModels.searchWallet(email);
    const userId = wallet.user_id;
    const topUpId = uuidv4();
    const topUpDate = new Date();

    const dataTopUp = {
      id: topUpId,
      user_id: userId,
      topup_method: topupMethod,
      date: topUpDate
    };

    const result:any = await topupModels.topUp(dataTopUp);
    standardResponse.response(
      res,
      dataTopUp,
      200,
      `Top Up record successfully created by user: ${userId}. Top Up Method: ${topupMethod}`
    );
  } catch (error:any) {
    console.log(error.message);
    console.log(error.stack);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const topUpInput = async (req:any, res:any, next:any) => {
  try {
    const email:any = req.email;
    const id = req.params.id;
    const amountTopUp = parseInt(req.body.amount_topup);

    const [topUpRecord] = await topupModels.getTopUpRecord(id);
    const topUpId = topUpRecord.id;
    const topUpDate = topUpRecord.date;

    if (amountTopUp <= 0) {
      return next({
        status: 403,
        message: "Invalid input! Type the right amount of money!"
      });
    } else if (amountTopUp < 10000) {
      return next({ status: 403, message: "Minimum Top Up Rp10,000" });
    } else if (amountTopUp > 200000) {
      return next({ status: 403, message: "Maximum Top Up Rp200,000" });
    }

    const dataTopUpInput = {
      amount_topup: amountTopUp,
      date: topUpDate
    };

    const result:any = await topupModels.updateTopUpRecord(dataTopUpInput, topUpId);

    standardResponse.response(
      res,
      dataTopUpInput,
      200,
      `Top Up ${amountTopUp} successfully recorded!`
    );
  } catch (error:any) {
    console.log(error.message);
    console.log(error.stack);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const topUpConfirmation = async (req:any, res:any, next:any) => {
  try {
    const email = req.email;
    const id = req.params.id;
    const { PIN } = req.body;

    const convertedPIN = PIN.toString();
    if (convertedPIN === "") {
      return next({ status: 403, message: "Please input your PIN!" });
    } else if (convertedPIN.length < 6) {
      return next({
        status: 403,
        message: "Please input 6 Digits of your PIN!"
      });
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
      return next({ status: 403, message: "Your PIN is wrong!" });
    }

    const [wallet] = await walletModels.searchWallet(email);
    const walletId = wallet.id;
    const balance = wallet.balance;
    const income = wallet.income;
    const updatedAt = new Date();

    const [topUpRecord] = await topupModels.getTopUpRecord(id);
    const topUpId = topUpRecord.id;
    const amountTopUp = topUpRecord.amount_topup;

    const totalBalance = parseInt(balance + amountTopUp);
    const totalIncome = parseInt(income + amountTopUp);

    const dataWallet = {
      balance: totalBalance,
      income: totalIncome,
      updated_at: updatedAt
    };
    const dataTopUpRecord = {
      status: "Success",
      updated_at: updatedAt
    };

    const walletAfterTopUp:any = await walletModels.updateWallet(
      dataWallet,
      walletId
    );
    const updateTopUpRecord:any = await topupModels.updateTopUpRecord(
      dataTopUpRecord,
      topUpId
    );

    standardResponse.response(
      res,
      dataTopUpRecord,
      200,
      `Account with email: ${email} successfully Top Up!`
    );
  } catch (error:any) {
    console.log(error.message);
    console.log(error.stack);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const topUpHistory = async (req:any, res:any, next:any) => {
  try {
    const userId = req.id;
    const sort = req.query.sort || "date";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;
    const result = await topupModels.topUpHistory({
      userId,
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await topupModels.calculateTopUpRecordsByUserId(userId);
    const { total } = calcResult[0];
    standardResponse.response(
      res,
      result,
      200,
      `Data requests success! Total top up records from user with id: ${userId} are ${total}`,
      {
        currentPage: page,
        limit: limit,
        totalTransaction: total,
        totalPage: Math.ceil(total / limit)
      }
    );
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const topUpList = async (req:any, res:any, next:any) => {
  try {
    const sort = req.query.sort || "date";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const result = await topupModels.topUpList({
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await topupModels.calculateTopUpRecords();
    const { total } = calcResult[0];
    standardResponse.response(res, result, 200, "Data requests success!", {
      currentPage: page,
      limit: limit,
      totalTransaction: total,
      totalPage: Math.ceil(total / limit)
    });
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

module.exports = {
  listWallets,

  topUpMethod,
  topUpInput,
  topUpConfirmation,
  topUpHistory,
  topUpList
};

export default module;