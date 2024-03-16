const db = require('../config/db');

const Period = {
  create: (account_id,start_date, end_date, menstrual_days, note, callback) => {
    const sql = 'INSERT INTO period (start_date, end_date, menstrual_days, account_id, note) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [start_date, end_date, menstrual_days.join(','), account_id, note], (err, results) => {
      if (err) {
        console.error('Error creating period: ', err);
        if (typeof callback === 'function') {
          return callback(err, null);
        }
      }
      console.log('Period created successfully');
      if (typeof callback === 'function') {
        return callback(null, results);
      }
    });
  },
 getAllPeriod: (id) => {
    
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM period WHERE account_id = ?";
      db.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
    })
  },
  getPeriodByMonthAndYearId: (account_id,month,year) => {
    return new Promise((resolve, reject) => {

      const sql = 'SELECT * FROM period WHERE account_id = ? AND MONTH(start_date) = ? AND YEAR(start_date) = ?';
      db.query(sql, [account_id,month, year], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },
  getPeriodByMonthAndYear: () => {
    return new Promise((resolve, reject) => {
      const today = new Date();
      const month = today.getMonth() + 1; 
      const year = today.getFullYear();

      const sql = 'SELECT * FROM period WHERE MONTH(start_date) = ? AND YEAR(start_date) = ?';
      db.query(sql, [month, year], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },
  getPeriodByMonthAndYearPre: (account_id,month,year) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM period WHERE account_id = ? AND MONTH(start_date) = ? AND YEAR(start_date) = ?';
      db.query(sql, [account_id,month, year], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },
  updatePeriodByMonthAndYear: (id,menstrual_days) => {
    return new Promise((resolve, reject) => {
      const today = new Date();
      const month = today.getMonth(); 
      const year = today.getFullYear();
  
      const query = 'UPDATE period SET menstrual_days = ? WHERE id = ? AND MONTH(start_date) = ? AND YEAR(start_date) = ?';
      db.query(query, [id,menstrual_days.join(','), month, year], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },
  updatePeriodByID : (userid,id,menstrual_days, updatedPeriodData,) => {
  
    const {start_date,end_date,note } = updatedPeriodData;
    const sql = 'UPDATE period SET start_date = ?, end_date = ? ,menstrual_days = ?, note = ? WHERE account_id = ?  AND id= ?';
    db.query(sql, [start_date,end_date,menstrual_days.join(','),note,userid,id], (err, result) => {
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
  }
};


module.exports = Period;
