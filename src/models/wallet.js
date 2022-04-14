const connection = require("../config/dbConfig");

const createWallet = (wallet) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO wallets SET ?", wallet, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const searchWallet = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT wallets.user_id, wallets.id, users.email, users.phone, wallets.balance, wallets.income, wallets.expense, wallets.amount_topup, wallets.created_at, wallets.updated_at FROM wallets INNER JOIN users ON wallets.user_id = users.id WHERE email = ?",
      [email],
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

const topUp = (data, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE wallets SET ? WHERE user_id = ?",
      [data, userId],
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

const updateWallet = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE wallets SET ? WHERE id = ?",
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

// Query Lainnya

const listWallets = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM wallets ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
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

const deleteWallet = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM wallet WHERE id = ?", id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const detailsWallet = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM wallets WHERE id = ?",
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

const calculateWallet = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM wallets",
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
  createWallet,
  searchWallet,
  topUp,
  updateWallet,

  detailsWallet,
  listWallets,
  calculateWallet,
  deleteWallet
};
