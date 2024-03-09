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
const getwater = async (req) => {
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
const updatedwater= async (req, updatedwaterData) => {
  const userId = req.userId; 

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    waterModel.updatedwater(userId, updatedwaterData, (err, result) => {
   

      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
      }

     
      resolve('successfully');
    });
  });
};
module.exports = {
  inforwater,
  getwater,
  updatedwater
};
