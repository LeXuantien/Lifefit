const db = require('../config/db');
const moment = require('moment-timezone');
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
  createProfile: (id,accountData) => {
    return new Promise((resolve, reject) => {
      const {gender,weight, height, wakeup_time, sleeping_time } = accountData;
      const vietnamDateTimewakeup_time = moment(wakeup_time).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD HH:mm:ss");
      const vietnamDateTimesleeping_time = moment(sleeping_time).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD HH:mm:ss");
      const sql = 'UPDATE  account SET gender =? ,weight = ? , height = ? , wakeup_time = ?, sleeping_time =? WHERE id = ?  ';
      db.query(sql, [gender,weight, height,vietnamDateTimewakeup_time  , vietnamDateTimesleeping_time,id], (err, result) => {
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