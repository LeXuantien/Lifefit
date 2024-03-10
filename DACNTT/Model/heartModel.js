const db = require('../config/db');

const createheart = (account_id, heartData, callback) => {
  const { date,heartbeat} =heartData;
  const sql = "INSERT INTO heart (date,heartbeat, account_id) VALUES ( ?, ?, ?)";

  db.query(sql, [ date,heartbeat, account_id], (err, result) => {
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
const getheart = (account_id, callback) => {
  const sql = "SELECT * FROM heart WHERE account_id = ?";
  
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
const updateheart = (account_id, updatedheartData, callback) => {
  const { date,heartbeat} = updatedheartData;
  const sql = "UPDATE heart SET   date = ? , heartbeat = ? WHERE account_id = ?";

  db.query(sql, [date,heartbeat, account_id], (err, result) => {
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
  createheart,
  getheart,
  updateheart
};
