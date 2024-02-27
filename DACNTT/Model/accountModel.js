const db = require('../config/db');

const Account = {
  create: (accountData) => {
    return new Promise((resolve, reject) => {
      const { email, fullname,birthday, password } = accountData;
      const sql = 'INSERT INTO account (email, fullname,birthday, password) VALUES (?, ?, ?, ?)';
      db.query(sql, [email, fullname,birthday, password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          const newAccountId = result.insertId;
          resolve({ id: newAccountId, ...accountData });
        }
      });
    });
  },
};

module.exports = Account;