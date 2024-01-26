const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/forgotpasswordController');

router.post('/send-otp', AuthController.sendOTP);

module.exports = router;
