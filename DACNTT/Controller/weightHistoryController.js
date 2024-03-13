const weightModel = require('../Model/weightHistoryModel');
const jwt = require('jsonwebtoken');

const inforweighthistory = async (req) => {
  const userId = req.userId; 
  const { weight, date_recorded} = req.body;

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    weightModel.creatweighthistory (userId, {  weight, date_recorded }, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Error: ' + err.message));
      }
      resolve('successfully');
    });
  });
};
const getweighthistory = async (req) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    weightModel.getweighthistory(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const updateweighthistory= async (req,res, updatedWeigthData) => {
  const userId = req.userId; 
  const id = req.params.id;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    weightModel.updateweighthistory(id,userId, updatedWeigthData, (err, result) => {
     

      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
        res.status(401).json({ message: 'Cập nhật không thành công'});
      }

   
      resolve('successfully');
      res.status(200).json({ message: 'Cập nhật thành công'});
    });
  });
};
const deleteweighthistory= async (req,res) => {
  const userId = req.userId; 
  const id=req.params.id; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    weightModel.deleteweighthistory(id,userId, (err, result) => {
      
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
  inforweighthistory,
  getweighthistory,
  updateweighthistory,
  deleteweighthistory
  
};
