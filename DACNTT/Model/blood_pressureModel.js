const db = require('../config/db');

const createblood_pressure = (account_id, blood_pressureData, callback) => {
  const { goal,date,blood_pressure} =blood_pressure;
  const sql = "INSERT INTO blood_pressure (goal,date,blood_pressure, account_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [goal, date,blood_pressure, account_id], (err, result) => {
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
const getblood_pressure = (account_id, callback) => {
  const sql = "SELECT * FROM blood_pressure WHERE account_id = ?";
  
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
const updateblood_pressure = (account_id, updatedblood_pressureData, callback) => {
  const { goal,date,blood_pressure} = updatedblood_pressureData;
  const sql = "UPDATE blood_pressure SET goal = ? , date = ? , blood_pressure = ? , WHERE account_id = ?";

  db.query(sql, [goal,date,blood_pressure, account_id], (err, result) => {
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
  createblood_pressure,
  getblood_pressure,
  updateblood_pressure
};
