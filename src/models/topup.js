const connection = require("../config/dbConfig");

const topUp = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO topups SET ?", data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getTopUpRecord = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM topups WHERE id = ?",
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

const updateTopUpRecord = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE topups SET ? WHERE id = ?",
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

const calculateTopUpRecords = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM topups",
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

const calculateTopUpRecordsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM topups WHERE user_id = ?",
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

const topUpHistory = ({ userId, sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT topups.id, users.id, users.first_name, users.last_name, users.email, users.phone, users.picture, topups.topup_method, topups.amount_topup, topups.date, topups.status, topups.updated_at FROM topups INNER JOIN users ON users.id = topups.user_id WHERE topups.user_id = ? ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
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

const topUpList = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT topups.id, users.email, users.phone, topups.user_id, topups.topup_method, topups.amount_topup, topups.status, topups.date, wallets.balance, topups.updated_at FROM topups INNER JOIN users ON topups.user_id = users.id INNER JOIN wallets ON wallets.user_id = users.id ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
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
  topUp,
  getTopUpRecord,
  updateTopUpRecord,
  calculateTopUpRecords,
  calculateTopUpRecordsByUserId,
  topUpHistory,
  topUpList
};
