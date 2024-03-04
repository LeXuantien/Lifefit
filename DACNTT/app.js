const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const accountRouter = require('./router/registerRouter');
const authRouter = require('./router/authRouter');
const profileRouter = require('./router/profileRouter');
const weigthRouter= require('./router/weigthRouter');
const dietRouter= require('./router/dietRouter');
const forgotpasswordRouter = require('./router/forgotpasswordRouter');
const periodRouter= require('./router/periodRouter');
const waterRouter= require('./router/waterRouter');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());
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
app.use('/api', profileRouter);
app.use('/api', weigthRouter);
app.use('/api', dietRouter);
app.use('/api',forgotpasswordRouter);
app.use('/api',periodRouter);
app.use('/api',waterRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});