const db = require('../config/db');
const moment = require('moment-timezone');
const creatediet = (account_id, dietData, callback) => {
  const { goal,date} = dietData;
  const vietnamDateTime = moment(date, "YYYY-MM-DDZ").tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD ");
  const sql = "INSERT INTO diet (goal,date, account_id) VALUES (?, ?, ?)";

  db.query(sql, [goal, vietnamDateTime, account_id], (err, result) => {
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
const getdiet = (account_id, callback) => {
  const sql = "SELECT * FROM diet WHERE account_id = ?";
  
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

const getdietBydate = (account_id, date, callback) => {
  const formattedDate = new Date(date).toISOString().slice(0, 10);
  console.log(formattedDate);
  const sql = "SELECT * FROM diet WHERE DATE(date) = ? AND account_id = ?";
  
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
  });
};


const updatediet = (id,account_id, updateddietData, callback) => {
  const { goal} = updateddietData;
  const sql = "UPDATE diet SET goal = ?  WHERE account_id = ? AND id= ?";

  db.query(sql, [goal, account_id,id], (err, result) => {
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
const deleteddiet = (id, account_id, callback) => {
  const sql = "SELECT * FROM diet WHERE account_id = ? AND id = ? ";
  db.query(sql, [account_id, id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    const diet_id = rows[0] && rows[0].id;

    if (!diet_id) {
      const sql1 = "DELETE FROM diet WHERE id = ? AND account_id = ?";
      db.query(sql1, [id, account_id], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }

        callback(null, result);
      });
    } else {
      const sql2 = "DELETE FROM dietdetail WHERE diet_id = ?";
      db.query(sql2, [diet_id], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }

        callback(null, result);
      });

      const sql3 = "DELETE FROM diet WHERE id = ? AND account_id = ?" ;
      db.query(sql3, [id,account_id], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }
      });
    }
  });
};

module.exports = {
  creatediet,
  getdiet,
  updatediet,
  getdietBydate,
  deleteddiet  

};
