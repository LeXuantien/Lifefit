const bcrypt = require('bcrypt');
const session = require('express-session');
const userModel = require('../Model/authModel');
const { Result } = require('express-validator');

const userController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
   
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      userModel.login(email, password, async (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
          return res.status(401).json({ error: 'Invalid credential' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        req.session.userId = user.id;
        const id=req.session.userId ;
        res.json({ userId: id, message: 'Login successful' });
        
      });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = userController;
