const db = require('../config/db');
const moment = require('moment-timezone');
const getProfile = (id, callback) => {

  const sql = "SELECT email, fullname,birthday,gender,weight,height,wakeup_time,sleeping_time FROM account WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    
    const vietnamDateTime = result.map(item => {
      return {
        ...item,
        wakeup_time: moment(item.wakeup_time).tz('Asia/Ho_Chi_Minh').format(),
        sleeping_time: moment(item.sleeping_time).tz('Asia/Ho_Chi_Minh').format()
      };
    });

    callback(null, vietnamDateTime);
  });
};
const getPassword = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM account WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error:', err);
        reject(err);
      } else {
        if (results.length === 1) {
          resolve(results[0].password);
        } else {
          resolve(null);
        }
      }
    });
  });
};

const updateProfile = (id, updatedProfileData, callback) => {
  const {email, fullname,birthday, gender,weight, height, wakeup_time, sleeping_time } = updatedProfileData;
  const vietnamDateTimewakeup_time = moment(wakeup_time).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD HH:mm:ss");
  const vietnamDateTimesleeping_time = moment(sleeping_time).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD HH:mm:ss");
  const sql = "UPDATE account SET email = ?, fullname = ?,birthday = ?, gender = ?, weight = ?, height = ?, wakeup_time = ?, sleeping_time = ? WHERE id = ?";

  db.query(sql, [email, fullname,birthday, gender,weight, height, vietnamDateTimewakeup_time, vietnamDateTimesleeping_time, id], (err, result) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    } else {
      console.error('Callback is not a function');
    }
  });
};
const updatePassword = (id, updatedPasswordData, callback) => {
  const {password } = updatedPasswordData;
  const sql = "UPDATE account SET password = ? WHERE id = ?";

  db.query(sql, [password, id], (err, result) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    } else {
      console.error('Callback is not a function');
    }
  });
};

module.exports = {
 
  getProfile,
  updateProfile,
  updatePassword,
  getPassword
};
