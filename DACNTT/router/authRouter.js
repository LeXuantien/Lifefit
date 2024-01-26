const express = require('express');
const authController = require('../Controller/authController');
const profileController= require('../Controller/profileController');
const session = require('express-session');
const router = express.Router();

router.post('/login', authController.login);
module.exports = router;