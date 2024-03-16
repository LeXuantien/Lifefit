const waterModel = require('../Model/waterModel');

const inforwater = async (req,res) => {
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
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công'});
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
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công',result});
    });
  });
};
const getwaterBydate = async (req,res) => {
  const userId = req.userId; 
  const date=req.query.dategoal;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    waterModel.getwaterbydate(date,userId, (err, result) => { 
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công',result});
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
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công'});
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
        res.status(401).json({ message: 'Xóa không thành công'});
      }
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
