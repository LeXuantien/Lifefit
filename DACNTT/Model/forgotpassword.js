const connection = require('../config/db'); 
const otpGenerator = require('otp-generator');

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
      }
    
      static async updateOTP(email, otp) {
        return new Promise((resolve, reject) => {
          const query = 'UPDATE account SET otp = ? WHERE email = ?';
          connection.query(query, [otp, email], (err, results) => {
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
