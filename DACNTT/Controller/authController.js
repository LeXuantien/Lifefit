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
          return res.status(401).json({ error: 'Invalid credential' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        req.session.userId = user.id;
        res.status(200).json({ message: 'Login successful' });
      });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  inforprofile: async (req, res) => {
    try {
      const { gender, height, wakeuptime, sleepingtime } = req.body;
      console.log(gender);
      const Id = req.session?.userId;
      
      // Call the createprofile function with the provided information
      const profile = await userModel.createprofile({
        gender,
        height,
        Id,
        wakeuptime,
        sleepingtime,
      });
  
      if (!profile) {
        return res.status(500).json({ error: 'Failed to create profile' });
      }
  
      res.status(201).json({ message: 'Successfully', profile: profile });
    } catch (error) {
      console.error('Error during inforprofile:', error);
      /*res.status(500).json({ message: 'Internal Server Error' });*/
    }
  },
};

module.exports = userController;
