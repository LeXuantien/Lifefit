const blood_pressureModel = require('../Model/blood_pressureModel');

const inforblood_pressure = async (req,res) => {
  const userId = req.userId; 
  const { date,blood_pressure} = req.body;

  if (!userId) {
    console.log('Unauthorized: ');
    res.status(401).json({ message: 'Unauthorized '});
   
  }

  return new Promise((resolve, reject) => {
    blood_pressureModel.createblood_pressure(userId, { date,blood_pressure}, (err, result) => {
      if (err) {
        console.error(err);      
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({message: 'Thành công'});
    });
    });
 
};
const getblood_pressure = async (req,res) => {
  const userId = req.userId; 
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized '});
  }

 
  return new Promise((resolve, reject) => {
   blood_pressureModel.getblood_pressure(userId, (err, result) => { 
    if (err) {
      console.error(err);      
      res.status(401).json({ message: 'Không thành công'});
    }
    res.status(200).json({message: 'Thành công', result});
  });
  });
};

const getblood_pressureBydate = async (req,res) => {
  const userId = req.userId; 
  const date=req.query.date;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }
  return new Promise((resolve, reject) => {
    blood_pressureModel.getblood_pressurebydate(date,userId, (err, result) => { 
      if (err) {
        console.error(err);      
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({message: 'Thành công', result});
    });
  });
};

const updatedblood_pressure= async (req,res, updatedblood_pressureData) => {
  const userId = req.userId; 
  const id=req.params.id; 
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized '});
  }

  return new Promise((resolve, reject) => {
    blood_pressureModel.updateblood_pressure(id,userId, updatedblood_pressureData, (err, result) => {
      
      if (err) {
        res.status(401).json({ message: 'Cập nhật không thành công'});
      }
      res.status(200).json({ message: 'Cập nhật thành công'});
    });
  });
};
const deleteblood_pressure= async (req,res) => {
  const userId = req.userId; 
  const id=req.params.id; 
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized '});
  }

  return new Promise((resolve, reject) => {
    blood_pressureModel.deleteblood_pressure(id,userId, (err, result) => {
      
      if (err) {
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message: 'Xoá thành công'});
    });
  });
};
module.exports = {
  inforblood_pressure,
  getblood_pressure,
  getblood_pressureBydate,
  updatedblood_pressure,deleteblood_pressure
};
