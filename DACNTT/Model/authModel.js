const db = require('../config/db');
const bcrypt = require('bcrypt');

const authModel = {
  
  login: (email, password, callback) => {
    const query = 'SELECT * FROM account WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (typeof callback === 'function') {
        if (err) {
          console.error('Error during login:', err);
          return callback(err, null);
        } else {
          callback(null, results.length === 1 ? results[0] : null);
        }
      } else {
        console.error('Callback is not a function');
      }
    });

  },
  createprofile: (profileData) => {
    return new Promise((resolve, reject) => {
      const{gender,height,userId,wakeuptime,sleepingtime} = profileData;
      const sql = 'INSERT INTO profile (gender,height,userId,wakeuptime,sleepingtime) VALUES (?, ?, ?, ?, ?)';
      db.query(sql, [gender,height,userId,wakeuptime,sleepingtime], (err, result) => {
        if (err) {
          reject(err);
        } else {
         
          const newProfileId = result.insertId;
          resolve({ id: newProfileId, ...profileData });
        }
      });
    });
  },
};

module.exports = authModel;
