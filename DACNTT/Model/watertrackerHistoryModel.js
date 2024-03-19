const db = require('../config/db');
const moment = require('moment-timezone');
const createwaterHistory = (account_id, time, content, callback) => {
    const formattedDate = new Date(time).toISOString().slice(0, 10);
    console.log(formattedDate);
    const vietnamDateTime = moment(time).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD HH:mm:ss");
    const sql = "SELECT * FROM watertracker WHERE account_id = ? AND DATE(dategoal) = ? ";
  
    db.query(sql, [account_id, formattedDate], (err, rows) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
  
      if (!rows || rows.length === 0) {
        return callback( null);
      }
      
      const watergoal = rows[0] && rows[0].watergoal;
      const water = watergoal / 8;
      const water_id = rows[0] && rows[0].id;
  
      if (!water_id) {
        return callback( null);
      }
  
      const sql1 = "INSERT INTO watertrackerHistory (water, time, watertracker_id) VALUES (?, ?, ?)";
      db.query(sql1, [water, vietnamDateTime, water_id], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }
        
        const sql2 = "INSERT INTO notification (time_noti, content, account_id) VALUES (?, ?, ?)";
        db.query(sql2, [vietnamDateTime, content, account_id], (err, result) => {
          if (err) {
            console.error(err);
            return callback(err, null);
          }
          
          callback(null, result);
        });
      });
    });
  };
  

const getwaterHistoryBydate= (account_id,date, callback) => {
 
  const formattedDate = new Date(date).toISOString().slice(0, 10);
  const sql = "SELECT id FROM watertracker WHERE account_id = ? AND DATE(dategoal) = ? ";
  db.query(sql, [account_id,formattedDate], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const water_id = rows[0] && rows[0].id;

    if (!water_id) {
      return callback(new Error("Không tìm thấy id phù hợp"), null);
    }
  const sql1 = "SELECT * FROM watertrackerHistory WHERE watertracker_id  = ?";
  
  db.query(sql1, [water_id ], (err, result) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const vietnamDateTime = result.map(item => {
          return {
            ...item,
            time: moment(item.time).tz('Asia/Ho_Chi_Minh').format()
          };
        });
  
        callback(null, vietnamDateTime);
     
      }
    } else {
      console.error('Callback is not a function');
    }
  })
})
};
const getdwaterHistory = (account_id, callback) => {
  const sql = "SELECT id FROM watertracker WHERE account_id = ?";
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(null);
    }

    let allWater = [];
    let count = 0;

    for (let i = 0; i < rows.length; i++) {
      const water_id = rows[i].id;
      if (!water_id) {
        return callback( null);
      }

      const sql1 = "SELECT * FROM watertrackerHistory WHERE watertracker_id = ?";
      db.query(sql1, [water_id], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }
        const vietnamDateTime = result.map(item => {
          return {
            ...item,
            time: moment(item.time).tz('Asia/Ho_Chi_Minh').format()
          };
        });
        allWater.push(vietnamDateTime);

        count++;

        if (count === rows.length) {
          callback(null, allWater);
        }
      });
    }
  });
};


const getwaterBydate = (account_id, time, callback) => {
  const formattedDate = new Date(time).toISOString().slice(0, 10);
  console.log(formattedDate);
  const sql = "SELECT id FROM watertracker WHERE account_id = ? AND DATE(dategoal) = ? ";
  db.query(sql, [account_id,formattedDate], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback( null);
    }

    const water_id = rows[0] && rows[0].id;

    if (!water_id) {
      return callback( null);
    }
  const sql1 = "SELECT water FROM watertrackerHistory WHERE watertracker_id  = ?";
  
  db.query(sql1, [water_id ], (err, result) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const vietnamDateTime = result.map(item => {
          return {
            ...item,
            time: moment(item.time).tz('Asia/Ho_Chi_Minh').format()
          };
        });
  
        callback(null, vietnamDateTime);
     
      }
    } else {
      console.error('Callback is not a function');
    }
  })
})
};

module.exports = {
    createwaterHistory, 
  getwaterBydate,
  getwaterHistoryBydate,
  getdwaterHistory
};
