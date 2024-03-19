const db = require('../config/db');
const moment = require('moment-timezone');
const creatdietdetail = (account_id, content, diet_date, calo, callback) => {
  const formattedDate = new Date(diet_date).toISOString().slice(0, 10);
  const vietnamDateTime = moment(diet_date).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD HH:mm:ss");
  const sql = "SELECT id FROM diet WHERE account_id = ? AND DATE(date) = ? ";

  db.query(sql, [account_id, formattedDate], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback( null);
    }

    const diet_id = rows[0] && rows[0].id;

    if (!diet_id) {
      return callback( null);
    }
    else{
      const sql1 = "INSERT INTO dietdetail (content, diet_date, calo, diet_id) VALUES (?, ?, ?, ?)";
    db.query(sql1, [content, vietnamDateTime, calo, diet_id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      
      callback(null, result);

    });
    }
    
  });
};


const getdietdetailBydate = (account_id, diet_date, callback) => {
  const formattedDate = new Date(diet_date).toISOString().slice(0, 10);
  const sql = "SELECT id FROM diet WHERE account_id = ? AND DATE(date) = ? ";

  db.query(sql, [account_id, formattedDate], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback( null);
    }

    const diet_id = rows[0] && rows[0].id;

    if (!diet_id) {
      return callback(null, null);
    }

    const sql1 = "SELECT * FROM dietdetail WHERE diet_id  = ?";
  
    db.query(sql1, [diet_id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      
      const vietnamDateTime = result.map(item => {
        return {
          ...item,
          diet_date: moment(item.diet_date).tz('Asia/Ho_Chi_Minh').format()
        };
      });

      callback(null, vietnamDateTime);
    })
  });
};


const getdietdetail= (account_id,callback) => {
 
  const sql = "SELECT id FROM diet WHERE account_id = ? ";
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback( null);
    }

    const diet_id = rows[0] && rows[0].id;

    if (!diet_id) {
      return callback( null);
    }
  const sql1 = "SELECT * FROM dietdetail WHERE diet_id  = ?";
  
  db.query(sql1, [diet_id ], (err, result) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const vietnamDateTime = result.map(item => {
          return {
            ...item,
            diet_date: moment(item.diet_date).tz('Asia/Ho_Chi_Minh').format()
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
const updatedietdetail = (account_id, id, updateddietData, callback) => {
  const { content, diet_date, calo } = updateddietData;
  const sql = "SELECT id, date FROM diet WHERE account_id = ?";
  
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(null, { message: 'Không tìm thấy' });
    }

    rows.forEach(diet => {
      const diet_id = diet.id;
      const vietnamDateTime = moment(diet_date).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD ");
      const date = moment(diet_date).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD HH:mm:ss");
      
      const sql1 = "UPDATE dietdetail SET content = ?, diet_date = ?, calo = ? WHERE id = ? AND diet_id = ? AND DATE(diet_date) = ?";
      
      db.query(sql1, [content, date, calo, id, diet_id, vietnamDateTime], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        } 
      });
    });

    callback(null, { message: 'successfully' });
  });
};



const deletedietdetail = (id, account_id, callback) => {
  const sql = "SELECT id, date FROM diet WHERE account_id = ?";
  db.query(sql, [account_id], (err, rows) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    if (!rows || rows.length === 0) {
      return callback(null, { message: 'Không tìm thấy bản ghi diet' });
    }

    rows.forEach(diet => {
      const diet_id = diet.id;
      const vietnamDateTime = moment(diet.date).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD");
      
      const sql1 = "DELETE FROM dietdetail WHERE id = ? AND diet_id = ? AND DATE(diet_date) = ?";
      
      db.query(sql1, [id, diet_id, vietnamDateTime], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        } 
      });
    });

    callback(null, { message: 'Xóa thành công' });
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
      return callback( null);
    }

    const diet_id = rows[0] && rows[0].id;

    if (!diet_id) {
      return callback( null);
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
