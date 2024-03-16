const profileModel = require('../Model/profileModel');
const bcrypt = require('bcrypt');


const getProfile = async (req,res) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    profileModel.getProfile(userId, (err, result) => {
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công',result});
    });
  });
};
const updatedProfile= async (req,res, updatedprofileData) => {
  const userId = req.userId; 

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    profileModel.updateProfile(userId, updatedprofileData, (err, result) => {
      
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công'});
    });
  });
};
const updatedPassword = async (req, res) => {
  const userId = req.userId; 
  const { oldpassword, newpassword } = req.body;

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    profileModel.getPassword(userId, (err, password) => { 
      if (err) {     
        res.status(401).json({ message: 'Không thành công'});
      }

      const passwordMatch =  bcrypt.compare(oldpassword, password); 
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
      }

      if (!newpassword) {
        return res.status(400).json({ message: 'Vui lòng nhập mật khẩu mới' });
      }
      const hashedNewPassword =  bcrypt.hash(newpassword, 10); 
    
      profileModel.updatePassword(userId, { password: hashedNewPassword },(err, result) => {
        if(err){
          return res.status(401).json({ message: 'Cập nhật không thành công' });
        }
        return res.status(200).json({ message: 'Cập nhật thành công' });
      }); 

    
      });
    
  } catch (error) {
    console.error('Cập nhật không thành công:', error);
    return res.status(500).json({ message: 'không thể cập nhật mật khẩu' });
  }
};


module.exports = {
  getProfile,
  updatedProfile,
  updatedPassword
};
