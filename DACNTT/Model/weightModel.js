const db = require('../config/db');

const creatweight = (account_id, weightData, callback) => {
  const { goal} = weightData;
  const sql = "INSERT INTO weight (goal, account_id) VALUES (?, ?)";

  db.query(sql, [goal,  account_id], (err, result) => {
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
const updateweight = (id,account_id, updatedProfileData, callback) => {
  const { goal } = updatedProfileData;
  const sql = "UPDATE weight SET goal = ?  WHERE id = ? AND account_id = ?";

  db.query(sql, [goal, Date, id,account_id], (err, result) => {
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
const deleteweighthistory = (id,account_id, callback) => {
  const sql = "DELETE * FROM weight_history WHERE account_id= ? AND id = ?";
  
  db.query(sql, [account_id,id], (err, result) => {
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
