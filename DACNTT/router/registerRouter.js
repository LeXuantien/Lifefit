const express = require('express');
const session = require('express-session');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const router = express.Router();
const {registerValidator}=require('../Controller/accountController');
const accountController = require('../Controller/accountController');



router.post('/register', registerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      await accountController.registerAccount(req, res);
    } catch (error) {
      console.error('Error registering account:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});
router.post('/otpaccount', accountController.otpAuthen);
router.post('/saveaccount', accountController.saveAccount);

module.exports = router;