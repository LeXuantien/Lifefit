const nodemailer = require('nodemailer');
const UserModel = require('../Model/forgotpassword');

const transporter = nodemailer.createTransport({
  // Cấu hình transport email
});

async function sendOTP(req, res) {
  const { email } = req.body;

  try {
    const user = await UserModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const generatedOTP = otpGenerator.generate(6, { upperCase: false, specialChars: false });

    // Lưu OTP vào cơ sở dữ liệu
    await UserModel.updateOTP(email, generatedOTP);

    const mailOptions = {
      from: 'your-email@gmail.com',
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
}

module.exports = { sendOTP };
