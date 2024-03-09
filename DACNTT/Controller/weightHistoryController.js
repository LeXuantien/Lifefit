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
const updateweighthistory= async (req, updatedWeigthData) => {
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
      }

   
      resolve('successfully');
    });
  });
};

  
   
module.exports = {
  inforweighthistory,
  getweighthistory,updateweighthistory
  
};
