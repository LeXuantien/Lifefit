const db = require('../config/db');
const moment = require('moment-timezone');
const createnoti = (account_id, notiData, callback) => {
  const { time_noti,content} =notiData;
  const vietnamDateTime = moment(time_noti).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD HH:mm:ss");
  const sql = "INSERT INTO notification (time_noti,content,account_id) VALUES ( ?, ?, ?)";

  db.query(sql, [ vietnamDateTime,content, account_id], (err, result) => {
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
const getnoti = (account_id, callback) => {
  const sql = "SELECT * FROM notification WHERE account_id = ?";
  
  db.query(sql, [account_id], (err, result) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    
    const vietnamDateTime = result.map(item => {
      return {
        ...item,
        time_noti: moment(item.time_noti).tz('Asia/Ho_Chi_Minh').format()
      };
    });

    callback(null, vietnamDateTime);
  });
};
const getnotibydate = (date,account_id, callback) => {
  
  const formattedDate = new Date(date).toISOString().slice(0, 10);

  const sql = "SELECT * FROM notification WHERE account_id = ? AND DATE(time_noti) = ?";
  
  db.query(sql, [account_id,formattedDate], (err, result) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    
    const vietnamDateTime = result.map(item => {
      return {
        ...item,
        time_noti: moment(item.time_noti).tz('Asia/Ho_Chi_Minh').format()
      };
    });

    callback(null, vietnamDateTime);
  });
};

const deletenoti = (id, account_id, callback) => {

  const sql1 = "DELETE FROM notification WHERE id = ? AND account_id = ?";

  db.query(sql1, [id,account_id], (err, result) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    callback(null, result);
  });

};
module.exports = {
  createnoti,
  getnoti,
  getnotibydate,deletenoti
};
