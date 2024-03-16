const weightModel = require('../Model/weightHistoryModel');
const jwt = require('jsonwebtoken');

const inforweighthistory = async (req,res) => {
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
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công'});
    });
  });
};
const getweighthistory = async (req,res) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    weightModel.getweighthistory(userId, (err, result) => { 
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công',result});
    });
  });
};
const getweightHistoryBydate = async (req,res) => {
  const userId = req.userId; 
  const date=req.query.date;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }
  return new Promise((resolve, reject) => {
    weightModel.getweigthHistorytbydate(date,userId, (err, result) => { 
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công',result});
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
        res.status(401).json({ message: 'Cập nhật không thành công'});
      }
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
       
     
        res.status(401).json({ message: 'Xóa không thành công'});
      }
      res.status(200).json({ message: 'Xoá thành công'});
    });
  });
};
  
   
module.exports = {
  inforweighthistory,
  getweighthistory,
  updateweighthistory,
  deleteweighthistory,
  getweightHistoryBydate
  
};
