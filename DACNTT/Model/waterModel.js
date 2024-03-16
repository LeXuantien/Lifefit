const db = require('../config/db');
const moment = require('moment-timezone');
const createwater = (account_id, waterData, callback) => {
  const { watergoal, dategoal} = waterData;
  const vietnamDateTime = moment(dategoal).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD HH:mm:ss");
  const sql = "INSERT INTO watertracker (watergoal, dategoal, account_id) VALUES (?, ?, ?)";

  db.query(sql, [watergoal, vietnamDateTime , account_id], (err, result) => {
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
        const vietnamDateTime = result.map(item => {
          return {
            ...item,
            dategoal: moment(item.dategoal).tz('Asia/Ho_Chi_Minh').format()
          };
        });
  
        callback(null, vietnamDateTime);
     
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
        const vietnamDateTime = result.map(item => {
          return {
            ...item,
            dategoal: moment(item.dategoal).tz('Asia/Ho_Chi_Minh').format()
          };
        });
  
        callback(null, vietnamDateTime);
     
      }
    } else {
      console.error('Callback is not a function');
    }
  })
};
const updatedwater = (id,account_id, updatedwaterData, callback) => {
  const { watergoal} = updatedwaterData;
  const sql = "UPDATE watertracker SET watergoal = ?  WHERE account_id = ? AND id= ? ";

  db.query(sql, [watergoal, account_id,id], (err, result) => {
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
