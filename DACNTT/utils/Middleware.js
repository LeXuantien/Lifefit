require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; 

function checkMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; 

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1]; 

  try {
    const decoded = jwt.verify(token, secretKey); 
    req.userId = decoded.userId; 
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}

module.exports = checkMiddleware;
