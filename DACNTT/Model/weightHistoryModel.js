const db = require('../config/db');
const moment = require('moment-timezone');
const creatweighthistory = (account_id, weightData, callback) => {
  const { weight, date_recorded } = weightData;
  const vietnamDateTime = moment(date_recorded, "YYYY-MM-DDZ").tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD ");

    const sql1 = "INSERT INTO weight_history (weight, date_recorded, account_id) VALUES (?, ?, ?)";
    db.query(sql1, [weight, vietnamDateTime, account_id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      
      callback(null, result);
    });
};

const getweighthistory = (account_id, callback) => {
  
  const sql1 = "SELECT * FROM weight_history WHERE account_id  = ?";
  
  db.query(sql1, [account_id ], (err, result) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const vietnamDateTime = result.map(item => {
          return {
            ...item,
            date_recorded: moment(item.date_recorded).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
          };
        });
  
        callback(null, vietnamDateTime);
     
      }
    } else {
      console.error('Callback is not a function');
    }
  })
};
const getweigthHistorytbydate = (date,account_id, callback) => {
  
  const formattedDate = new Date(date).toISOString().slice(0, 10);

  const sql = "SELECT * FROM weight_history WHERE account_id = ? AND DATE(date_recorded) = ?";
  
  db.query(sql, [account_id,formattedDate], (err, result) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const vietnamDateTime = result.map(item => {
          return {
            ...item,
            date_recorded: moment(item.date_recorded).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
          };
        });
  
        callback(null, vietnamDateTime);
     
      }
    } else {
      console.error('Callback is not a function');
    }
  })
};
const updateweighthistory = (id,account_id, updatedWeightData, callback) => {
  const {weight, date_recorded} = updatedWeightData;
  
  const sql1 = "UPDATE weight_history SET weight = ?,  date_recorded = ?  WHERE account_id  = ? AND id = ? ";

  db.query(sql1, [weight, date_recorded, account_id,id ], (err, result) => {
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
const deleteweighthistory = (id, account_id, callback) => {

    const sql1 = "DELETE FROM weight_history WHERE account_id = ? AND id = ?";

    db.query(sql1, [account_id,id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }

      callback(null, result);
    });
  
};


module.exports = {
  creatweighthistory, 
  getweighthistory,
  updateweighthistory,
  deleteweighthistory,
  getweigthHistorytbydate
};
