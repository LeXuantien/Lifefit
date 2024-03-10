const connection = require('../config/db'); 

class UserModel {
    static async getUserByEmail(email) {
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM account WHERE email = ?';
          connection.query(query, [email], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results[0]);
            }
          });
        });
      };
    
      static async updatepassword(email, password) {
        return new Promise((resolve, reject) => {
          const query = 'UPDATE account SET password = ? WHERE email = ?';
          connection.query(query, [password, email], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      }
    }
    

module.exports = UserModel;
