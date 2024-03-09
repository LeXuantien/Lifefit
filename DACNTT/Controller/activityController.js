const activityModel = require('../Model/activityModel');

const inforactivity = async (req) => {
  const userId = req.userId; 
  const {  goal } = req.body;

  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    activityModel.create(userId, { goal}, (err, result) => {
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

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    activityModel.updateactivity(userId, updatedactivityData, (err, result) => {
      
      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
      }

      resolve('successfully');
    });
  });
};
module.exports = {
  inforactivity,
  getactivity,
  updateactivity
};
