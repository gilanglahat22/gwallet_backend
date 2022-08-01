import connection from "../config/dbConfig";

const createWallet = (wallet: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query("INSERT INTO wallets SET ?", wallet, (error: any, result: any) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const searchWallet = (email: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      "SELECT wallets.user_id, wallets.id, users.email, users.phone, wallets.balance, wallets.income, wallets.expense, wallets.amount_topup, wallets.created_at, wallets.updated_at FROM wallets INNER JOIN users ON wallets.user_id = users.id WHERE email = ?",
      [email],
      (error: any, result: any) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const topUp = (data: any, userId: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      "UPDATE wallets SET ? WHERE user_id = ?",
      [data, userId],
      (error: any, result: any) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const updateWallet = (data: any, id: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      "UPDATE wallets SET ? WHERE id = ?",
      [data, id],
      (error: any, result: any) => {
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

const listWallets = ( { sort, order, limit, offset}: any ) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      `SELECT * FROM wallets ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
      [sort, limit, offset],
      (error: any, result: any) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const deleteWallet = (id: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query("DELETE FROM wallets WHERE id = ?", id, (error: any, result: any) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const detailsWallet = (id: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      "SELECT * FROM wallets WHERE id = ?",
      id,
      (error: any, result: any) => {
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
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM wallets",
      (error: any, result: any) => {
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

export default module;
