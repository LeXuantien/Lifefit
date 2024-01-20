const db = require('../config/db');

const Account = {
  create: (accountData) => {
    return new Promise((resolve, reject) => {
      const { email, fullname, password } = accountData;
      const sql = 'INSERT INTO account (email, fullname, password) VALUES (?, ?, ?)';
      db.query(sql, [email, fullname, password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          // Assuming the result object has an "insertId" property for the new record's ID
          const newAccountId = result.insertId;
          resolve({ id: newAccountId, ...accountData });
        }
      });
    });
  },
};

module.exports = Account;