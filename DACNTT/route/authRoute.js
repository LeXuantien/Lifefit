const express = require('express');
const authController = require('../Controller/authController');

const router = express.Router();

router.post('/login', authController.Login.login);
module.exports = router;