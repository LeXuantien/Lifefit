const session = require('express-session');
const periodModel = require('../Model/periodModel');

const inforperiod = async (req) => {
  const userId = req.session.userId; // or req.session.userID
  const { datestarted, dateend, note} = req.body;

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

  return new Promise((resolve, reject) => {
    periodModel.savePeriod(userId, {  datestarted, dateend, note }, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve('Profile posted successfully');
    });
  });
};
const getPeriod = async (req) => {
  const userId = req.session.userId; 

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

 
  return new Promise((resolve, reject) => {
    periodModel.getPeriod(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const updatePeriod = async (req, updatedPeriodData) => {
  const userId = req.session.userId; 

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

  return new Promise((resolve, reject) => {
    periodModel.updatePeriod(userId, updatedPeriodData, (err, result) => {
      console.log('Inside profileModel.updateProfile callback');

      if (err) {
        console.error(err);
        console.log('res is defined inside callback');
        reject(new Error('Internal Server Error: ' + err.message));
      }

      console.log('res is defined after callback');
      resolve(result);
    });
  });
};
module.exports = {
  inforperiod,
  getPeriod,
  updatePeriod
};
