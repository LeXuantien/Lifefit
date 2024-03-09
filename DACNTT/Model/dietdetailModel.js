const db = require('../config/db');

const creatdietdetail = (account_id, dietData, callback) => {
  const { content,diet_date,calo} = dietData;

  const sql= "SELECT id FROM diet WHERE account_id = ?";
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const diet_id = rows[0].id;
    const sql1 = "INSERT INTO dietdetail (content,diet_date,calo, diet_id) VALUES (?, ?, ?, ?)";
    db.query(sql1, [content,diet_date,calo, diet_id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      
      callback(null, result);
    });
  });
};

const getdietdetail = (account_id, callback) => {
  const sql= "SELECT id FROM diet WHERE account_id = ?";
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const diet_id = rows[0].id;
  const sql1 = "SELECT * FROM dietdetail WHERE diet_id  = ?";
  
  db.query(sql1, [diet_id ], (err, result) => {
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
const updatedietdetail = (account_id, updateddietData, callback) => {
  const {content,diet_date,calo} = updateddietData;
  const sql= "SELECT id FROM diet WHERE account_id = ?";
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const diet_id = rows[0].id;
  const sql1 = "UPDATE dietdetail SET content =? ,diet_date = ?,calo = ?  WHERE diet_id  = ?";

  db.query(sql1, [content,diet_date,calo,diet_id ], (err, result) => {
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
const deletedietdetail = (id,account_id, callback) => {
  const sql = "SELECT id FROM diet WHERE account_id = ?";
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows ) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const diet_id = rows[0].id;
    const sql1 = "DELETE FROM dietdetail WHERE diet_id = ? and id =?";

    db.query(sql1, [diet_id,id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }

      callback(null, result);
    });
  });
};

module.exports = {
  creatdietdetail, 
  getdietdetail,
  updatedietdetail,
  deletedietdetail
};
