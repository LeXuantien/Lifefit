const db = require('../config/db');

const creatweighthistory = (account_id, weightData, callback) => {
  const { weight, date_recorded } = weightData;

  const sql= "SELECT id FROM weight WHERE account_id = ?";

    const sql1 = "INSERT INTO weight_history (weight, date_recorded, account_id) VALUES (?, ?, ?)";
    db.query(sql1, [weight, date_recorded, account_id], (err, result) => {
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
        callback(null, result);
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
  deleteweighthistory
};
