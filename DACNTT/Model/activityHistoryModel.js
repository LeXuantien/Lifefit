const db = require('../config/db');

const creatactivityHistory = (account_id, date,name, calo, callback) => {
  const formattedDate = new Date(date).toISOString().slice(0, 10);
 console.log(formattedDate);
  const sql = "SELECT id FROM activity WHERE account_id = ? AND DATE(date) = ? ";

  db.query(sql, [account_id, formattedDate], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const activity_id = rows[0] && rows[0].id;

    if (!activity_id) {
      return callback(new Error("Không tìm thấy id phù hợp"), null);
    }

    const sql1 = "INSERT INTO activityHistory (date, name, calo, activity_id) VALUES (?, ?, ?, ?)";
    db.query(sql1, [date, name, calo, activity_id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      
      callback(null, result);

    });
  });
};

const getactivityHistoryBydate= (account_id,date, callback) => {
 
  const formattedDate = new Date(date).toISOString().slice(0, 10);
  console.log(formattedDate);
  const sql = "SELECT id FROM activity WHERE account_id = ? AND DATE(date) = ? ";
  db.query(sql, [account_id,formattedDate], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const activity_id = rows[0] && rows[0].id;

    if (!activity_id) {
      return callback(new Error("Không tìm thấy id phù hợp"), null);
    }
  const sql1 = "SELECT * FROM activityHistory WHERE activity_id = ?";
  
  db.query(sql1, [activity_id ], (err, result) => {
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
})
};
const getactivityHistory= (account_id,callback) => {
 
  const sql = "SELECT id FROM activity WHERE account_id = ? ";
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const activity_id = rows[0] && rows[0].id;

    if (!activity_id) {
      return callback(new Error("Không tìm thấy id phù hợp"), null);
    }
  const sql1 = "SELECT * FROM activityHistory WHERE activity_id  = ?";
  
  db.query(sql1, [activity_id ], (err, result) => {
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
})
};
const updateactivityHistory = (account_id,id, updatedactivityHistoryData, callback) => {
  const {name,calo} = updatedactivityHistoryData;
  const sql= "SELECT id FROM activity WHERE account_id = ?";
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const activity_id = rows[0].id;
  const sql1 = "UPDATE activityHistory SET  name = ? , calo = ?  WHERE id = ? AND activity_id  = ?";

  db.query(sql1, [name,calo,id,activity_id ], (err, result) => {
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
})
};
const deleteactivityHistory = (id,account_id, callback) => {
  const sql = "SELECT id FROM activity WHERE account_id = ?";
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows ) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const activity_id = rows[0].id;
    const sql1 = "DELETE FROM activityHistory WHERE activity_id = ? and id =?";

    db.query(sql1, [activity_id,id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }

      callback(null, result);
    });
  });
};
const getCaloBydate = (account_id, act_date, callback) => {
  const formattedDate = new Date(act_date).toISOString().slice(0, 10);
  console.log(formattedDate);
  const sql = "SELECT id FROM activity WHERE account_id = ? AND DATE(date) = ? ";
  db.query(sql, [account_id,formattedDate], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const act_id = rows[0] && rows[0].id;

    if (!act_id) {
      return callback(new Error("Không tìm thấy id phù hợp"), null);
    }
  const sql1 = "SELECT calo FROM activityHistory WHERE activity_id  = ?";
  
  db.query(sql1, [act_id ], (err, result) => {
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
})
};

module.exports = {
  creatactivityHistory, 
  getactivityHistoryBydate,
  getactivityHistory,
  updateactivityHistory,
  deleteactivityHistory,
  getCaloBydate
};
