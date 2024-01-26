const account = require('../Model/accountModel');
const { check } = require('express-validator');
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

async function registerAccount(req, res) {
  const { email, fullname, password,confirmpassword} = req.body;

  try {
    

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newAccount = await account.create({ email, fullname, password: hashedPassword });
    res.status(201).json({ message: 'Account registered successfully', account: newAccount });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { registerAccount, registerValidator };
