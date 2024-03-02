const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/forgotpasswordController');

router.post('/send-otp', AuthController.sendOTP);
router.post('/otpauthen', AuthController.otpAuthen);
router.post('/updatepassword', AuthController.updatePassword);

module.exports = router;
