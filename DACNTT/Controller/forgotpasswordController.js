const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const UserModel = require('../Model/forgotpassword');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  host:"smtp.gmail.com",
  port:587,
  secure: false,
  auth: {
    user: 'tienle120302@gmail.com', 
    pass: 'zswu thej bjal ktzg' 
  }
});

let resetPasswordEmail = '';
let inforotp = {};

async function OTP(email) {
  try {
    const generatedOTP = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    console.log(generatedOTP);
    inforotp[email] = {
      otp: generatedOTP,
      timestamp: Date.now()
    };
    const mailOptions = {
      from: 'tienle120302@gmail.com', 
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${generatedOTP}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, message: 'Internal server error' };
  }
}

async function sendOTP(req, res) {
  const { email } = req.body;
  try {
    console.log(email);
    const user = await UserModel.getUserByEmail(email);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    resetPasswordEmail = email;
    await OTP(email);
    res.status(200).json({ message: 'successfully' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
async function resetOTP(req, res) {
  const email=resetPasswordEmail;
  try {
    
    await OTP(email);
    res.status(200).json({ message: 'successfully' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
async function otpAuthen(req, res) {
  const { otp } = req.body;
  const email = resetPasswordEmail;
  try {
    const cachedOTP = inforotp[email];
    if (!cachedOTP || cachedOTP.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const otpTimestamp = cachedOTP.timestamp;
    const currentTime = Date.now();
    const otpValidityDuration = 90 * 1000; 
    if (currentTime - otpTimestamp > otpValidityDuration) {
      return res.status(400).json({ message: 'Error Expired OTP' });
    }
    delete inforotp[email];
    res.status(200).json({ message: 'successfully' });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updatePassword(req, res) {
  const { newPassword, confirmPassword } = req.body;
  const email = resetPasswordEmail;
  
 
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'New password and confirm password do not match' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  try {
    const user = await UserModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await UserModel.updatepassword(email, hashedPassword);

    delete inforotp[email];
    res.status(200).json({ message: 'Password updated successfully'});
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = { resetOTP,sendOTP,otpAuthen,updatePassword };
