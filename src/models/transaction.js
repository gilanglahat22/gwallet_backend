const connection = require("../config/dbConfig");

const calculateTransaction = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM transactions",
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const calculateTransactionByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM transactions WHERE user_id = ?",
      userId,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const searchReceiver = (receiverPhone) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT users.id, users.email, users.phone, users.picture, wallets.id as wallet_id, wallets.balance, wallets.income, wallets.expense FROM users INNER JOIN wallets ON users.id = wallets.user_id WHERE users.phone = ?",
      [receiverPhone],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const transfer = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO transactions SET ?",
      data,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const detailsTransferById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM transactions WHERE id = ?",
      id,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const updateTransferById = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE transactions SET ? WHERE id = ?",
      [data, id],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const history = ({ userId, sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT transactions.id, transactions.user_id, users.email, users.phone, wallets.balance as balance_left, transactions.receiver_name, transactions.receiver_phone, transactions.receiver_picture, transactions.amount_transfer, transactions.notes, transactions.date, transactions.status FROM transactions INNER JOIN users ON transactions.user_id = users.id INNER JOIN wallets ON wallets.user_id = users.id WHERE transactions.user_id = ? ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
      [userId, sort, limit, offset],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const listTransaction = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT transactions.id, users.email, users.phone, transactions.user_id, transactions.receiver_name, transactions.receiver_phone, transactions.amount_transfer, transactions.notes, transactions.status, transactions.date FROM transactions INNER JOIN users ON transactions.user_id = users.id INNER JOIN wallets ON wallets.user_id = users.id ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
      [sort, limit, offset],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = {
  calculateTransaction,
  calculateTransactionByUserId,
  searchReceiver,
  listTransaction,
  transfer,
  detailsTransferById,
  updateTransferById,
  history
};
