const activityModel = require('../Model/activityModel');

const inforactivity = async (req) => {
  const userId = req.userId; 
  const {  goal,date } = req.body;

  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    activityModel.create(userId, { goal,date}, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve('successfully');
      
    });
  });
};
const getactivity = async (req) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    activityModel.getactivity(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const updateactivity= async (req, updatedactivityData) => {
  const userId = req.userId; 
  const id = req.params.id;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    activityModel.updateactivity(id,userId, updatedactivityData, (err, result) => {
      
      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
      }

      resolve('successfully');
    });
  });
};
const deleteactivity= async (req,res) => {
  const userId = req.userId; 
  const id=req.params.id; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    activityModel.deleteactivity(id,userId, (err, result) => {
      
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
  inforactivity,
  getactivity,
  updateactivity,
  deleteactivity
};
