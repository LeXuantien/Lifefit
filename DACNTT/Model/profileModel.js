const db = require('../config/db');

const saveProfile = (account_id, profileData, callback) => {
  const { gender, height, wakeup_time, sleeping_time } = profileData;
  const sql = "INSERT INTO profile (gender, height, account_id, wakeup_time, sleeping_time) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [gender, height, account_id, wakeup_time, sleeping_time], (err, result) => {
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
const getProfile = (account_id, callback) => {
  const sql = "SELECT * FROM profile WHERE account_id = ?";
  
  db.query(sql, [account_id], (err, result) => {
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
const updateProfile = (account_id, updatedProfileData, callback) => {
  const { gender, height, wakeup_time, sleeping_time } = updatedProfileData;
  const sql = "UPDATE profile SET gender = ?, height = ?, wakeup_time = ?, sleeping_time = ? WHERE account_id = ?";

  db.query(sql, [gender, height, wakeup_time, sleeping_time, account_id], (err, result) => {
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
  saveProfile,
  getProfile,
  updateProfile
};
