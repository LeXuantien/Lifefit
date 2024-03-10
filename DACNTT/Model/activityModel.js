const db = require('../config/db');

const create = (account_id, activityData, callback) => {
  const { goal,date} = activityData;
  const sql = "INSERT INTO activity (goal,date, account_id) VALUES (?, ?, ?)";

  db.query(sql, [goal,date , account_id], (err, result) => {
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
const getactivity = (account_id, callback) => {
  const sql = "SELECT * FROM activity WHERE account_id = ?";
  
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
const updateactivity = (account_id, activityData, callback) => {
  const { goal,date} = activityData;
  const sql = "UPDATE activity SET goal = ?, date = ? WHERE account_id = ?";

  db.query(sql, [goal,date, account_id], (err, result) => {
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
  create,
  getactivity,
  updateactivity
};
