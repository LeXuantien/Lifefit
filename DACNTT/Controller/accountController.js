const account = require('../Model/accountModel');

async function registerAccount(req, res) {
  const { email,fullname, password } = req.body;

  try {
    
    // Create a new user
    const newAccount = await account.create({ email, fullname, password });
    res.status(201).json({ message: 'Account registered successfully', account: newAccount });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { registerAccount };