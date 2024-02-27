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
  const userId = req.session.userId; 

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

 
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
const updateProfile = async (req, updatedProfileData) => {
  const userId = req.session.userId; 

  if (!userId) {
    console.log('Unauthorized: userId is not defined');
    throw new Error('Unauthorized - Session ID is not valid');
  }

  return new Promise((resolve, reject) => {
    profileModel.updateProfile(userId, updatedProfileData, (err, result) => {
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
  inforprofile,
  getProfile,
  updateProfile
};