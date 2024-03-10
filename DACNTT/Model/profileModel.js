const db = require('../config/db');

const getProfile = (id, callback) => {
  const sql = "SELECT * FROM account WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
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
  })
};
const getPassword = (id, callback) => {
  const sql = "SELECT password FROM account WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
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
  })
};
const updateProfile = (id, updatedProfileData, callback) => {
  const {email, fullname,birthday, gender,weight, height, wakeup_time, sleeping_time } = updatedProfileData;
  const sql = "UPDATE account SET email = ?, fullname = ?,birthday = ?, gender = ?, weight = ?, height = ?, wakeup_time = ?, sleeping_time = ? WHERE id = ?";

  db.query(sql, [email, fullname,birthday, gender,weight, height, wakeup_time, sleeping_time, id], (err, result) => {
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
