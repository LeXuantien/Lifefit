const profileModel = require('../Model/profileModel');




const getProfile = async (req) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
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
  const userId = req.userId; 

  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
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
