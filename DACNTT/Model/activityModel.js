const db = require('../config/db');

const create = (account_id, activityData, callback) => {
  const { goal,date} = activityData;
  const sql = "INSERT INTO activity (goal,date, account_id) VALUES (?, ?, ?)";

  db.query(sql, [goal,date , account_id], (err, result) => {
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
        callback(null, result);
      }
    } else {
      console.error('Callback is not a function');
    }
  })
};
const updateactivity = (id,account_id, activityData, callback) => {
  const { goal,date} = activityData;
  const sql = "UPDATE activity SET goal = ?, date = ? WHERE account_id = ? AND id = ? ";

  db.query(sql, [goal,date, account_id,id], (err, result) => {
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
const deleteactivity = (id, account_id, callback) => {
  const sql = "SELECT * FROM activity WHERE account_id = ? AND id = ? ";
  db.query(sql, [account_id, id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    const act_id = rows[0] && rows[0].id;

    if (!act_id) {
      const sql1 = "DELETE FROM activity WHERE id = ? AND account_id = ?";
      db.query(sql1, [id, account_id], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }

        callback(null, result);
      });
    } else {
      const sql2 = "DELETE FROM activityHistory WHERE activity_id = ?";
      db.query(sql2, [act_id], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }

        callback(null, result);
      });

      const sql3 = "DELETE FROM activity WHERE id = ? AND account_id = ?" ;
      db.query(sql3, [id,account_id], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }
      });
    }
  });
};
const getactivityBydate = (account_id, date, callback) => {
  const formattedDate = new Date(date).toISOString().slice(0, 10);
  console.log(formattedDate);
  const sql = "SELECT * FROM activity WHERE DATE(date) = ? AND account_id = ?";
  
  db.query(sql, [formattedDate, account_id], (err, result) => {
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
  create,
  getactivity,
  updateactivity,
  deleteactivity,
  getactivityBydate
};
