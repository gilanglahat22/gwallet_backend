import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
const userModels = require("../models/user");
const walletModels = require("../models/wallet");
const transactionModels = require("../models/transaction");
const standardResponse = require("../helper/responseHandling");

// Transfer Controllers

const transferList = async (req: any, res: any, next: any) => {
  try {
    const sort = req.query.sort || "date";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const result = await transactionModels.listTransaction({
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await transactionModels.calculateTransaction();
    const { total } = calcResult[0];
    standardResponse.response(res, result, 200, "Data requests success!", {
      currentPage: page,
      limit: limit,
      totalTransaction: total,
      totalPage: Math.ceil(total / limit)
    });
  } catch (error: any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const transfer = async (req: any, res: any, next: any) => {
  try {
    const email = req.email;
    const amountTransfer = parseInt(req.body.amountTransfer);
    const { receiverName, receiverPhone, notes } = req.body;
    if (receiverPhone === null || receiverPhone === "") {
      return next({
        status: 403,
        message: "Receiver doesn't has phone number!"
      });
    }
    const [wallet] = await walletModels.searchWallet(email);
    const userId = wallet.user_id;
    const senderBalance = wallet.balance;
    const senderEmail = wallet.email;
    const transferDate = new Date();

    const [receiver] = await transactionModels.searchReceiver(receiverPhone);
    const receiverEmail = receiver.email;
    const receiverPicture = receiver.picture;

    if (email === receiverEmail) {
      return next({ status: 406, message: "Not Acceptable!" });
    } else if (senderBalance === 0) {
      return next({ status: 403, message: "Your Balance is empty" });
    } else if (senderBalance < 10000 || senderBalance < amountTransfer) {
      return next({
        status: 403,
        message: "I'm sorry, your Balance is not enough for transaction"
      });
    } else if (amountTransfer <= 0) {
      return next({
        status: 403,
        message: "Invalid input! Type the right amount of money!"
      });
    } else if (amountTransfer < 10000) {
      return next({ status: 403, message: "Minimum Transfer Rp10,000" });
    } else if (amountTransfer > 500000) {
      return next({ status: 403, message: "Maximum Transfer Rp500,000" });
    }

    const dataTransfer = {
      id: uuidv4(),
      user_id: userId,
      receiver_name: receiverName,
      receiver_phone: receiverPhone,
      receiver_picture: receiverPicture,
      amount_transfer: amountTransfer,
      notes: notes,
      date: transferDate
    };
    const transfer = await transactionModels.transfer(dataTransfer);
    standardResponse.response(
      res,
      dataTransfer,
      200,
      `Transfer ${amountTransfer} from ${senderEmail} to ${receiverEmail} successfully recorded!`
    );
    console.log(transfer);
  } catch (error:any) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const transferConfirmation = async (req:any, res:any, next:any) => {
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
    // console.log(account);
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
    const senderWalletId = wallet.id;
    const senderBalance = wallet.balance;
    const senderExpense = wallet.expense;
    const senderEmail = wallet.email;

    const [detailsTransfer] = await transactionModels.detailsTransferById(id);
    // console.log(detailsTransfer);
    const transferId = detailsTransfer.id;
    const receiverPhone = detailsTransfer.receiver_phone;
    const amountTransfer = detailsTransfer.amount_transfer;

    const [receiver] = await transactionModels.searchReceiver(receiverPhone);
    // console.log(receiver);
    const receiverWalletId = receiver.wallet_id;
    const receiverBalance = receiver.balance;
    const receiverIncome = receiver.income;
    const receiverEmail = receiver.email;

    const totalSenderBalance = senderBalance - amountTransfer;
    const totalSenderExpense = senderExpense + amountTransfer;

    const totalReceiverBalance = receiverBalance + amountTransfer;
    const totalReceiverIncome = receiverIncome + amountTransfer;

    const dataWalletSender = {
      balance: totalSenderBalance,
      expense: totalSenderExpense,
      updated_at: new Date()
    };
    const dataWalletReceiver = {
      balance: totalReceiverBalance,
      income: totalReceiverIncome,
      updated_at: new Date()
    };
    const dataTransfer = {
      status: "Success",
      date: new Date()
    };
    const walletSender = await walletModels.updateWallet(
      dataWalletSender,
      senderWalletId
    );
    const walletReceiver = await walletModels.updateWallet(
      dataWalletReceiver,
      receiverWalletId
    );
    const updateTransfer = await transactionModels.updateTransferById(
      dataTransfer,
      transferId
    );
    standardResponse.response(
      res,
      dataTransfer,
      200,
      `Transfer ${amountTransfer} from ${senderEmail} to ${receiverEmail} success!`
    );
  } catch (error:any) {
    console.log(error.message);
    console.log(error.stack);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const transferHistory = async (req:any, res:any, next:any) => {
  try {
    const userId = req.id;
    const sort = req.query.sort || "date";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;
    const result = await transactionModels.history({
      userId,
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await transactionModels.calculateTransactionByUserId(
      userId
    );
    const { total } = calcResult[0];
    standardResponse.response(
      res,
      result,
      200,
      `Data requests success! Total transactions from user with id: ${userId} are ${total}`,
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

module.exports = {
  transferList,
  transfer,
  transferConfirmation,
  transferHistory
};

export default module;
