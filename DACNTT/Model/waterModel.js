const db = require('../config/db');

const createwater = (account_id, waterData, callback) => {
  const { watergoal, dategoal} = waterData;
  const sql = "INSERT INTO watertracker (watergoal, dategoal, account_id) VALUES (?, ?, ?)";

  db.query(sql, [watergoal, dategoal, account_id], (err, result) => {
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
const getwater = (account_id, callback) => {
  const sql = "SELECT * FROM watertracker WHERE account_id = ?";
  
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
const updatedwater = (account_id, updatedwaterData, callback) => {
  const { watergoal} = updatedwaterData;
  const sql = "UPDATE watertracker SET watergoal = ? WHERE account_id = ?";

  db.query(sql, [watergoal, account_id], (err, result) => {
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
  createwater,
  getwater,
  updatedwater
};
