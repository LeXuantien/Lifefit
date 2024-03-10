const express = require('express');
const { validationResult } = require('express-validator');
const checkMiddleware = require('../utils/Middleware');

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
router.post('/resetotpaccount', accountController.resetOTP);
router.put('/saveInfor', checkMiddleware, accountController.saveInfor)

module.exports = router;