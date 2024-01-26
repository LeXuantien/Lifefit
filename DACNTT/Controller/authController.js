const bcrypt = require('bcrypt');
const session = require('express-session');
const userModel = require('../Model/authModel');

const userController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Kiểm tra tính hợp lệ đầu vào
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      userModel.login(email, password, async (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          req.session.userId = user.id;
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  inforprofile: async (req, res) => {
    try {
      const { gender, height, wakeuptime, sleepingtime } = req.body;
      const userId = req.session.userId;

      // Call the createprofile function with the provided information
      const profile = await userModel.createprofile({
        gender,
        height,
        userId,
        wakeuptime,
        sleepingtime,
      });

      res.status(201).json({ message: 'Successfully', profile: profile });
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = userController;
