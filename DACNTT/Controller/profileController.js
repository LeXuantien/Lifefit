const session = require('express-session');
const profileModel = require('../Model/profileModel');

const inforprofile = async (req) => {
  const userId = req.session.userId; // or req.session.userID
  const { gender, height, wakeup_time, sleeping_time } = req.body;

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

  return new Promise((resolve, reject) => {
    profileModel.saveProfile(userId, { gender, height, wakeup_time, sleeping_time }, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve('Profile posted successfully');
    });
  });
};
const getProfile = async (req) => {
  const userId = req.session.userId; // or req.session.userID;

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

  // Wrap the callback-based function into a promise to use async/await
  return new Promise((resolve, reject) => {
    profileModel.getProfile(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};

module.exports = {
  inforprofile,
  getProfile
};
