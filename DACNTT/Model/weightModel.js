const db = require('../config/db');

const creatweight = (account_id, weightData,Date, callback) => {
  const { goal} = weightData;
  const sql = "INSERT INTO weight (goal, Date, account_id) VALUES (?, ?, ?)";

  db.query(sql, [goal, Date, account_id], (err, result) => {
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
const getweight = (account_id, callback) => {
  const sql = "SELECT * FROM weight WHERE account_id = ?";
  
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
const updateweight = (account_id, updatedProfileData, callback) => {
  const { goal, Date } = updatedProfileData;
  const sql = "UPDATE weight SET goal = ?, Date = ?  WHERE account_id = ?";

  db.query(sql, [goal, Date, account_id], (err, result) => {
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
const deleteweighthistory = (weight_id, callback) => {
  const sql = "DELETE * FROM weight_history WHERE weight_id = ?";
  
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
module.exports = {
  creatweight, 
  getweight,
  updateweight,
  deleteweighthistory
};
