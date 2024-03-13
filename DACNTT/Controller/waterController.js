const waterModel = require('../Model/waterModel');

const inforwater = async (req) => {
  const userId = req.userId; 
  const {watergoal, dategoal } = req.body;

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    waterModel.createwater(userId, { watergoal, dategoal}, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve('successfully');
  
    });
  });
};
const getwater = async (req,res) => {
  const userId = req.userId; 
  
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    waterModel.getwater(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const getwaterBydate = async (req,res) => {
  const userId = req.userId; 
  const dategoal=req.params.date;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    waterModel.getwaterbydate(dategoal,userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const updatedwater= async (req,res, updatedwaterData) => {
  const userId = req.userId; 
  const id=req.params.id;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    waterModel.updatedwater(id,userId, updatedwaterData, (err, result) => {
   

      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
        res.status(401).json({message:'Lỗi'});
      }

     
      resolve('successfully');
      res.status(200).json({result});
    });
  });
};
const deletewater= async (req,res) => {
  const userId = req.userId; 
  const id=req.params.id; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    waterModel.deletewater(id,userId, (err, result) => {
      
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
  inforwater,
  getwater,
  updatedwater,
  deletewater,
  getwaterBydate
};
