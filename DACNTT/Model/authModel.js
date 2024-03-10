const db = require('../config/db');
const bcrypt = require('bcrypt');

const authModel = {
  
  login: (email, callback) => {
    const query = 'SELECT * FROM account WHERE email = ? ';
    db.query(query, [email], (err, results) => {
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

  }
};

module.exports = authModel;
