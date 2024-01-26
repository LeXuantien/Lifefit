const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const accountRouter = require('./router/registerRouter');
const authRouter = require('./router/authRouter');
const forgotpasswordRouter = require('./router/forgotpasswordRouter');
const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: '123456', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
  })
);

// Use accountRouter for account-related routes
app.use('/api', accountRouter);
app.use('/api', authRouter);
app.use('/api',forgotpasswordRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});