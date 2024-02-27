const db = require('../config/db');

const savePeriod = (account_id, periodData, callback) => {
  const { datestarted, dateend, note} = profileData;
  const sql = "INSERT INTO period (datestarted, dateend, account_id, note) VALUES (?, ?, ?, ?)";

  db.query(sql, [datestarted, dateend, account_id, note], (err, result) => {
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
const getPeriod = (account_id, callback) => {
  const sql = "SELECT * FROM period WHERE account_id = ?";
  
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
const updatePeriod = (account_id, updatedPeriodData, callback) => {
  const { datestarted, dateend, note} = updatedPeriodData;
  const sql = "UPDATE period SET datestarted = ?, dateend = ?, account_id = ?, note = ? WHERE account_id = ?";

  db.query(sql, [datestarted, dateend, account_id, note, account_id], (err, result) => {
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
  savePeriod,
  getPeriod,
  updatePeriod
};
