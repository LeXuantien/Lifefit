const express = require('express');
const router = express.Router();
const { registerAccount } = require('../Controller/accountController');

// Register user route
router.post('/register', registerAccount);

module.exports = router;