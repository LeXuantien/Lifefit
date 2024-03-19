const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/forgotpasswordController');

router.post('/send-otp', AuthController.sendOTP);
router.get('/reset-otp', AuthController.resetOTP);
router.post('/otpauthen', AuthController.otpAuthen);
router.put('/updatepassword', AuthController.updatePassword);

module.exports = router;
