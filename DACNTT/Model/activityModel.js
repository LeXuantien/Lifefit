const db = require('../config/db');
const moment = require('moment-timezone');
const create = (account_id, activityData, callback) => {
  const { name,goal,date} = activityData;
  const vietnamDateTime = moment(date, "YYYY-MM-DDZ").tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD ");
  
  const goalValue = goal !== undefined ? goal : false;
  const sql = "INSERT INTO activity (name,goal,date, account_id) VALUES (?, ?, ?, ?)";

  db.query(sql, [name,goalValue,vietnamDateTime , account_id], (err, result) => {
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
const getactivity = (account_id, callback) => {
  const sql = "SELECT * FROM activity WHERE account_id = ?";
  
  db.query(sql, [account_id], (err, result) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const vietnamDateTime = result.map(item => {
          return {
            ...item,
            date: moment(item.date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
          };
        });
  
        callback(null, vietnamDateTime);
     
      }
    } else {
      console.error('Callback is not a function');
    }
  })
};
const updateactivity = (id,account_id, activityData, callback) => {
  const {name, goal} = activityData;
  const sql = "UPDATE activity SET name = ? , goal = ? WHERE account_id = ? AND id = ? ";

  db.query(sql, [name,goal ,account_id,id], (err, result) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null);
      }
    } else {
      console.error('Callback is not a function');
    }
  });
};
const deleteactivity = (id, account_id, callback) => {
  
      const sql3 = "DELETE FROM activity WHERE id = ? AND account_id = ?" ;
      db.query(sql3, [id,account_id], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }
        else {
          callback(null);
        }
      });
    
};
const getactivityBydate = (account_id, date, callback) => {
  const formattedDate = moment(new Date(date)).format('YYYY-MM-DD');
  console.log(formattedDate);
  const sql = "SELECT * FROM activity WHERE DATE(date) = ? AND account_id = ?";
  
  db.query(sql, [formattedDate, account_id], (err, result) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const vietnamDateTime = result.map(item => {
          return {
            ...item,
            date: moment(item.date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
          };
        });
  
        callback(null, vietnamDateTime);
     
      }
    } else {
      console.error('Callback is not a function');
    }
  })
  
};
const getallactivity = (date, callback) => {
  const formattedDate = moment(new Date(date)).format('YYYY-MM-DD');
  console.log(formattedDate);
  const sql = "SELECT * FROM activity WHERE DATE(date) = ?";
  
  db.query(sql, [formattedDate], (err, result) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const vietnamDateTime = result.map(item => {
          return {
            ...item,
            date: moment(item.date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
          };
        });
  
        callback(null, vietnamDateTime);
     
      }
    } else {
      console.error('Callback is not a function');
    }
  })
};

module.exports = {
  create,
  getactivity,
  updateactivity,
  deleteactivity,
  getactivityBydate,
  getallactivity 
};
