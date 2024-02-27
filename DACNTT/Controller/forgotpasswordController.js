const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
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

async function sendOTP(req, res) {
  const { email } = req.body;

  try {
    const user = await UserModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const generatedOTP = otpGenerator.generate(6, { upperCase: false, specialChars: false });

    const mailOptions = {
      from: 'tienle120302@gmail.com', 
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${generatedOTP}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { sendOTP,resetpassword };
