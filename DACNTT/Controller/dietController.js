const session = require('express-session');
const dietModel = require('../Model/dietModel');

const infordiet = async (req) => {
  const userId = req.session.userId; 
  const {  goal, date_diet } = req.body;

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

  return new Promise((resolve, reject) => {
    dietModel.creatediet(userId, { goal, date_diet}, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve('successfully');
    });
  });
};
const getdiet = async (req) => {
  const userId = req.session.userId; 

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

 
  return new Promise((resolve, reject) => {
    dietModel.getdiet(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const updatediet= async (req, updateddietData) => {
  const userId = req.session.userId; 

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

  return new Promise((resolve, reject) => {
    dietModel.updatediet(userId, updateddietData, (err, result) => {
      console.log('Inside profileModel.updateProfile callback');

      if (err) {
        console.error(err);
        console.log('res is defined inside callback');
        reject(new Error('Internal Server Error: ' + err.message));
      }

      console.log('res is defined after callback');
      resolve('successfully');
    });
  });
};
module.exports = {
  infordiet,
  getdiet,
  updatediet
};
