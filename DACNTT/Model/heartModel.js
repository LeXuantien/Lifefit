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
const getheartbydate = (date,account_id, callback) => {
  
  const formattedDate = new Date(date).toISOString().slice(0, 10);

  const sql = "SELECT * FROM heart WHERE account_id = ? AND DATE(date) = ?";
  
  db.query(sql, [account_id,formattedDate], (err, result) => {
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
const updateheart = (id,account_id, updatedheartData, callback) => {
  const { date,heartbeat} = updatedheartData;
  const sql = "UPDATE heart SET   date = ? , heartbeat = ? WHERE account_id = ? AND id = ?";

  db.query(sql, [date,heartbeat, account_id,id], (err, result) => {
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
const deleteheart = (id, account_id, callback) => {

  const sql1 = "DELETE FROM heart WHERE id = ? AND account_id = ?";

  db.query(sql1, [id,account_id], (err, result) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    callback(null, result);
  });

};
module.exports = {
  createheart,
  getheart,
  updateheart,
  deleteheart,
  getheartbydate
};
