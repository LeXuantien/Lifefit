const account = require('../Model/accountModel');
const { check } = require('express-validator');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');



const registerValidator = [
  check('email').exists().withMessage('Chưa nhập email!').notEmpty().withMessage('Chưa nhập email')
    .isEmail().withMessage('Email không hợp lệ!'),
  check('fullname').exists().withMessage('Chưa nhập họ và tên!').notEmpty().withMessage('Chưa nhập họ và tên'),
  check('password').exists().withMessage('Chưa nhập mật khẩu!').notEmpty().withMessage('Chưa nhập mật khẩu')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải ít nhất 6 ký tự!'),
    check('confirmpassword').exists().withMessage('Confirm password must exist'),
  check('confirmpassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

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

let inforemail = '';
let inforfullname='';
let inforbirthday='';
let inforpassword='';
let inforotp = {};

async function OTP(email) {
  try {
    const generatedOTP = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    inforotp[email] = {
      otp: generatedOTP,
      timestamp: Date.now()
    };
    const mailOptions = {
      from: 'LIFEFIT', 
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

async function registerAccount(req, res) {
  const { email, fullname, birthday, password, confirmpassword } = req.body;
  inforemail = email;
  inforfullname = fullname;
  inforbirthday = birthday;
  inforpassword = password;
  try {
   
    await OTP(email);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
async function resetOTP(req, res) {
 
  try {
    const email=inforemail;

    await OTP(email);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

async function otpAuthen(req, res) {
  const { otp } = req.body;
  try {
    const email = inforemail;
    const fullname = inforfullname;
    const birthday = inforbirthday;
    const password = inforpassword;
    const hashedPassword = await bcrypt.hash(password, 10);
    const cachedOTP = inforotp[email];
    if (!cachedOTP || cachedOTP.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const otpTimestamp = cachedOTP.timestamp;
    const currentTime = Date.now();
    const otpValidityDuration = 60 * 1000;
    if (currentTime - otpTimestamp > otpValidityDuration) {
      return res.status(400).json({ message: 'Error Expired OTP' });
    }
    const newAccount = await account.create({ email, fullname, birthday, password: hashedPassword});
    delete inforemail;
    delete inforfullname;
    delete inforbirthday;
    delete inforpassword
    delete inforotp[email]
    res.status(200).json({ message: 'successfully' });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const saveInfor = async (req,res) => {
  const userId = req.userId; 
  const { gender, weight, height, wakeup_time, sleeping_time } = req.body;
  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }
  try {
   await account.createProfile(userId,{gender, weight, height, wakeup_time, sleeping_time});
    res.status(200).json({ message: 'successfully' });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
};

module.exports = { registerAccount, otpAuthen, saveInfor,resetOTP,registerValidator };
