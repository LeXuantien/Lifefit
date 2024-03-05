const session = require('express-session');
const weightModel = require('../Model/weightModel');

const inforweight = async (req) => {
  const userId = req.session.userId; 
  const { goal, Date, weight, } = req.body;

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

  return new Promise((resolve, reject) => {
    weightModel.creatweight(userId, { goal, Date, weight }, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve('successfully');
    });
  });
};
const getWeight = async (req) => {
  const userId = req.session.userId; 

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
  const userId = req.session.userId; 

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

  return new Promise((resolve, reject) => {
    weightModel.updateweight(userId, updatedWeigthData, (err, result) => {
     

      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
      }

   
      resolve('successfully');
    });
  });
};
const deleteWeight = async (req) => {
    const userId = req.session.userId; 
  
    if (!userId) {
      console.log('Unauthorized: userId is not defined');
      throw new Error('Unauthorized - Session ID is not valid');
    }
  
   
    return new Promise((resolve, reject) => {
      weightModel.deleteweight(userId, (err, result) => { 
        if (err) {
          console.error(err);      
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
  deleteWeight
};
