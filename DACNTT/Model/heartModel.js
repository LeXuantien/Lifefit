const db = require('../config/db');

const createheart = (account_id, heartData, callback) => {
  const { goal,date,heartbeat} =heartData;
  const sql = "INSERT INTO heart (goal,date,heartbeat, account_id) VALUES (?, ?, ?, ?)";

  db.query(sql, [goal, date,heartbeat, account_id], (err, result) => {
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
  const { goal,date,heartbeat} = updatedheartData;
  const sql = "UPDATE heart SET goal = ? , date = ? , heartbeat = ? , WHERE account_id = ?";

  db.query(sql, [goal,date,heartbeat, account_id], (err, result) => {
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
