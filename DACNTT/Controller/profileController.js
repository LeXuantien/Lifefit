const profileModel = require('../Model/profileModel');
const bcrypt = require('bcrypt');


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
const updatedProfile= async (req, updatedprofileData) => {
  const userId = req.userId; 

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    profileModel.updateProfile(userId, updatedprofileData, (err, result) => {
      
      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
      }

      resolve('successfully');
    });
  });
};
const updatedPassword= async (req,res) => {
  const userId = req.userId; 
  const {oldpassword,newpassword}=req.body;

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }
  try {
    const password = await profileModel.getPassword(userId); 
    const passwordMatch = await bcrypt.compare(oldpassword, password); 
    if (!passwordMatch) {
      return { success: false, message: 'Mật khẩu cũ không đúng' }; 
    }

    const hashedNewPassword = await bcrypt.hash(newpassword, 10); 
    await profileModel.updatePassword(userId, { password: hashedNewPassword }); 

    res.status(200).json({ message: 'successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    throw new Error('Internal Server Error');
  }
};


module.exports = {
  getProfile,
  updatedProfile,
  updatedPassword
};
