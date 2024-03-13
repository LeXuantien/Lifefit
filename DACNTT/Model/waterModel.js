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
const getwaterbydate = (dategoal,account_id, callback) => {
  const formattedDate = new Date(dategoal).toISOString().slice(0, 10);
  const sql = "SELECT * FROM watertracker WHERE account_id = ? AND DATE(dategoal) = ?";
  
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
const updatedwater = (id,account_id, updatedwaterData, callback) => {
  const { watergoal, dategoal} = updatedwaterData;
  const sql = "UPDATE watertracker SET watergoal = ? AND dategoal = ? WHERE account_id = ? AND id= ? ";

  db.query(sql, [watergoal,dategoal, account_id,id], (err, result) => {
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
const deletewater = (id, account_id, callback) => {

  const sql1 = "DELETE FROM watertracker WHERE id = ? AND account_id = ?";

  db.query(sql1, [id,account_id], (err, result) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    callback(null, result);
  });

};

module.exports = {
  createwater,
  getwater,
  updatedwater,
  deletewater,
  getwaterbydate
};
