var mysql = require('mysql')

var connection = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: '12345',
  database: 'lifefit'
});
connection.connect((err) => {
    if (err) {
      console.error('Database connection error:', err);
    } else {
      console.log('Connected to the database');
    }
  });

module.exports = connection