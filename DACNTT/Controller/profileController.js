const session = require('express-session');
const profileModel = require('../Model/profileModel');


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
      
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }

      console.log('Cập nhật thành công');
      resolve(updatedProfileData);
    });
  });
};
module.exports = {
  getProfile,
  updateProfile
};
