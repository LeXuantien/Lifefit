require('dotenv').config(); 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Model/authModel');
const secretKey = process.env.SECRET_KEY; 

function generateToken(userId) {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
}

const Login = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
   
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      userModel.login(email,async (err, userData) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!userData) {
          return res.status(401).json({ error: 'Invalid credential' });
        }

        const { id } = userData; 

        const passwordMatch = await bcrypt.compare(password, userData.password);

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(id); 

        res.json({ token, message: 'Login successful' });
      });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = { Login };
