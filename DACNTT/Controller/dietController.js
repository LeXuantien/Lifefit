const dietModel = require('../Model/dietModel');

const infordiet = async (req) => {
  const userId = req.userId; 
  const {  goal,date } = req.body;

  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    dietModel.creatediet(userId, { goal,date}, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve('successfully');
      
    });
  });
};
const getdiet = async (req) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    dietModel.getdiet(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const getdietBydate = async (req) => {
  const userId = req.userId; 
  const date  = req.params.date; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    return new Promise((resolve, reject) => {
      dietModel.getdietBydate(userId, date, (err, result) => { 
        if (err) {
          console.error(err);      
          reject(new Error('Internal Server Error: ' + err.message));
        }
        resolve(result);
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error: ' + error.message);
  }
};

const updatediet= async (req,res, updateddietData) => {
  const userId = req.userId; 
  const id=req.params.id;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    dietModel.updatediet(id,userId, updateddietData, (err, result) => {
      
      if (err) {
        res.status(401).json({ message: 'Cập nhật không thành công'});
        reject(new Error('Internal Server Error: ' + err.message));
      }

      resolve('successfully');
      res.status(200).json({ message: 'Cập nhật  thành công'});
    });
  });
};
const deletediet= async (req,res) => {
  const userId = req.userId; 
  const id=req.params.id; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    dietModel.deleteddiet(id,userId, (err, result) => {
      
      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
        res.status(401).json({ message: 'Lỗi'});
      }

      resolve('successfully');
      res.status(200).json({ message: 'Xoá thành công'});
    });
  });
};
module.exports = {
  infordiet,
  getdiet,
  updatediet,
  getdietBydate,
  deletediet
};
