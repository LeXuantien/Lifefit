const db = require('../config/db');

const creatediet = (account_id, dietData, callback) => {
  const { goal,date} = dietData;
  const sql = "INSERT INTO diet (goal,date, account_id) VALUES (?, ?, ?)";

  db.query(sql, [goal, date, account_id], (err, result) => {
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
const getdiet = (account_id, callback) => {
  const sql = "SELECT * FROM diet WHERE account_id = ?";
  
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
const updatediet = (account_id, updateddietData, callback) => {
  const { goal,date} = updateddietData;
  const sql = "UPDATE diet SET goal = ? , date = ? WHERE account_id = ?";

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
  creatediet,
  getdiet,
  updatediet
};
