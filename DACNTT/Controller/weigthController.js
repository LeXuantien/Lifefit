const weightModel = require('../Model/weightModel');
const jwt = require('jsonwebtoken');
const inforweight = async (req) => {
  const userId = req.userId; 
  const { goal} = req.body;

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    weightModel.creatweight(userId, { goal }, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Error: ' + err.message));
      }
      resolve('successfully');
    });
  });
};
const getWeight = async (req) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

 
  return new Promise((resolve, reject) => {
    weightModel.getweight(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const updateWeight= async (req, updatedWeigthData) => {
  const userId = req.userId; 
  const id=req.params.id;
  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

  return new Promise((resolve, reject) => {
    weightModel.updateweight(id,userId, updatedWeigthData, (err, result) => {
     

      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
      }

   
      resolve('successfully');
    });
  });
};

  
   
module.exports = {
  inforweight,
  getWeight,
  updateWeight,
  
};
