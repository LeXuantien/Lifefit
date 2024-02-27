const express = require('express');
const session = require('express-session');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const router = express.Router();
const { registerAccount,registerValidator } = require('../Controller/accountController');


// Register user route
router.post('/register', registerValidator, async (req, res) => {
    // Kiểm tra các lỗi hợp lệ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else{
        const { email, fullname,birthday, password} = req.body;
   
        await registerAccount(req, res);
    }
  });

module.exports = router;