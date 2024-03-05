const session = require('express-session');
const waterModel = require('../Model/waterModel');

const inforwater = async (req) => {
  const userId = req.session.userId; 
  const {watergoal, dategoal } = req.body;

  if (!userId) {
    console.log('Unauthorized: user is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

  return new Promise((resolve, reject) => {
    waterModel.createwater(userId, { watergoal, dategoal}, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve('successfully');
     // res.render('/');
    });
  });
};
const getwater = async (req) => {
  const userId = req.session.userId; 

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
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
  const userId = req.session.userId; 

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
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
