import connection from "../config/dbConfig";

const searchAccount = (email: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      email,
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

const createNewAccount = (account: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query("INSERT INTO users SET ?", account, (error: any, result: any) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const listAccounts = ({ sort, order, limit, offset }: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      `SELECT users.id, users.first_name, users.last_name, users.email, users.phone, users.picture, users.role, users.verified, wallets.balance, users.created_at, users.updated_at FROM users INNER JOIN wallets ON wallets.user_id = users.id ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
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

const calculateAccount = () => {
  return new Promise((resolve: any, reject: any) => {
    connection.query("SELECT COUNT(*) AS total FROM users", (error: any, result: any) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const detailsAccount = (email: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      "SELECT users.id, users.first_name, users.last_name, users.email, users.phone, users.PIN, users.picture, users.role, users.verified, wallets.balance, wallets.income, wallets.expense, users.created_at, users.updated_at FROM users INNER JOIN wallets ON wallets.user_id = users.id WHERE email = ?",
      email,
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

const updateAccount = (data: any, email: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      "UPDATE users SET ? WHERE email = ?",
      [data, email],
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

const updateAccountById = (data: any, id: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      "UPDATE users SET ? WHERE id = ?",
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

const deleteAccount = (id: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query("DELETE FROM users WHERE id = ?", id, (error: any, result: any) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const searchUsers = ({ search, sort, order, limit, offset }: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      `SELECT id, first_name, last_name, email, phone, picture, role, verified, created_at, updated_at FROM users WHERE first_name LIKE '%${search}%' ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
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

const searchAccountById = (userId: any) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(
      "SELECT id, first_name, last_name, email, phone, picture, role, created_at FROM users WHERE id = ?",
      userId,
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
  searchAccount,
  createNewAccount,
  listAccounts,
  calculateAccount,
  detailsAccount,
  updateAccount,
  updateAccountById,
  deleteAccount,

  searchUsers,
  searchAccountById
};

export default module;