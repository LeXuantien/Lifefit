const db = require('../config/db');

const creatdietdetail = (account_id, content, diet_date, calo, callback) => {
  const formattedDate = new Date(diet_date).toISOString().slice(0, 10);
 
  const sql = "SELECT id FROM diet WHERE account_id = ? AND DATE(date) = ? ";

  db.query(sql, [account_id, formattedDate], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const diet_id = rows[0] && rows[0].id;

    if (!diet_id) {
      return callback(new Error("Không tìm thấy id phù hợp"), null);
    }

    const sql1 = "INSERT INTO dietdetail (content, diet_date, calo, diet_id) VALUES (?, ?, ?, ?)";
    db.query(sql1, [content, diet_date, calo, diet_id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      
      callback(null, result);

    });
  });
};

const getdietdetailBydate= (account_id,diet_date, callback) => {
 
  const formattedDate = new Date(diet_date).toISOString().slice(0, 10);
  console.log(formattedDate);
  const sql = "SELECT id FROM diet WHERE account_id = ? AND DATE(date) = ? ";
  db.query(sql, [account_id,formattedDate], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const diet_id = rows[0] && rows[0].id;

    if (!diet_id) {
      return callback(new Error("Không tìm thấy id phù hợp"), null);
    }
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
const getdietdetail= (account_id,callback) => {
 
  const sql = "SELECT id FROM diet WHERE account_id = ? ";
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const diet_id = rows[0] && rows[0].id;

    if (!diet_id) {
      return callback(new Error("Không tìm thấy id phù hợp"), null);
    }
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
const updatedietdetail = (account_id,id, updateddietData, callback) => {
  const {content,calo} = updateddietData;
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
  const sql1 = "UPDATE dietdetail SET content =? ,calo = ?  WHERE id = ? AND diet_id  = ?";

  db.query(sql1, [content,calo,id,diet_id ], (err, result) => {
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
const getCaloBydate = (account_id, diet_date, callback) => {
  const formattedDate = new Date(diet_date).toISOString().slice(0, 10);
  console.log(formattedDate);
  const sql = "SELECT id FROM diet WHERE account_id = ? AND DATE(date) = ? ";
  db.query(sql, [account_id,formattedDate], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(new Error("Không tìm thấy "), null);
    }

    const diet_id = rows[0] && rows[0].id;

    if (!diet_id) {
      return callback(new Error("Không tìm thấy id phù hợp"), null);
    }
  const sql1 = "SELECT calo FROM dietdetail WHERE diet_id  = ?";
  
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

module.exports = {
  creatdietdetail, 
  getdietdetailBydate,
  getdietdetail,
  updatedietdetail,
  deletedietdetail,
  getCaloBydate
};
