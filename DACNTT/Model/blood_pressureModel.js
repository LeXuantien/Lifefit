const db = require('../config/db');
const moment = require('moment-timezone');
const createblood_pressure = (account_id, blood_pressureData, callback) => {
  const {date,blood_pressure} =blood_pressureData;
  const vietnamDateTime = moment(date).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD HH:mm:ss");
  const sql = "INSERT INTO blood_pressure (date,blood_pressure, account_id) VALUES ( ?, ?, ?)";
  db.query(sql, [ vietnamDateTime ,blood_pressure, account_id], (err, result) => {
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
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    
    const vietnamDateTime = result.map(item => {
      return {
        ...item,
        date: moment(item.date).tz('Asia/Ho_Chi_Minh').format()
      };
    });

    callback(null, vietnamDateTime);
  });
};

const getblood_pressurebydate = (date,account_id, callback) => {
  const formattedDate = new Date(date).toISOString().slice(0, 10);
  const sql = "SELECT * FROM blood_pressure WHERE account_id = ? AND DATE(date) = ? ";
  
  db.query(sql, [account_id,formattedDate], (err, result) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    
    const vietnamDateTime = result.map(item => {
      return {
        ...item,
        date: moment(item.date).tz('Asia/Ho_Chi_Minh').format()
      };
    });

    callback(null, vietnamDateTime);
  });
};

const updateblood_pressure = (account_id,id, updatedblood_pressureData, callback) => {
  const { date,blood_pressure} = updatedblood_pressureData;
  const sql = "UPDATE blood_pressure SET   date = ? , blood_pressure = ?  WHERE account_id = ? AND id= ? ";

  db.query(sql, [date,blood_pressure, account_id,id], (err, result) => {
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
const deleteblood_pressure = (id, account_id, callback) => {

  const sql1 = "DELETE FROM blood_pressure WHERE id = ? AND account_id = ?";

  db.query(sql1, [id,account_id], (err, result) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    callback(null, result);
  });

};
module.exports = {
  createblood_pressure,
  getblood_pressure,
  getblood_pressurebydate,
  updateblood_pressure,
  deleteblood_pressure
};
