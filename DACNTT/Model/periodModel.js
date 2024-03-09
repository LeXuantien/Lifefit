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
  getAllPeriod: (account_id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM period WHERE account_id = ?';
      db.query(query,[account_id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },
  getPeriodByMonthAndYearId: (account_id,month,year) => {
    return new Promise((resolve, reject) => {

      const sql = 'SELECT * FROM period WHERE account_id=?AND MONTH(start_date) = ? AND YEAR(start_date) = ?';
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
  updatePeriodByMonthAndYear: (menstrual_days) => {
    return new Promise((resolve, reject) => {
      const today = new Date();
      const month = today.getMonth() + 1; 
      const year = today.getFullYear();
  
      const query = 'UPDATE period SET menstrual_days = ? WHERE MONTH(start_date) = ? AND YEAR(start_date) = ?';
      db.query(query, [menstrual_days.join(','), month, year], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },
  updatePeriodByMonthAndYearID: (month,year,menstrual_days) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE period SET start_date = ?, end_date = ? ,menstrual_days = ?, note = ? WHERE MONTH(start_date) = ? AND YEAR(start_date) = ?';
      db.query(query, [menstrual_days.join(','), month, year], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },
};


module.exports = Period;
