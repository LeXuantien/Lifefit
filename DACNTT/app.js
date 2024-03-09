const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const accountRouter = require('./router/registerRouter');
const authRouter = require('./router/authRouter');
const profileRouter = require('./router/profileRouter');
const weigthRouter= require('./router/weigthRouter');
const weigthHistoryRouter= require('./router/weightHistoryRouter');
const dietRouter= require('./router/dietRouter');
const dietdetailRouter= require('./router/dietdetailRouter');
const forgotpasswordRouter = require('./router/forgotpasswordRouter');
const periodRouter= require('./router/periodRouter');
const waterRouter= require('./router/waterRouter');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: '123456', 
    resave: false,
    saveUninitialized: true,
  })
);
app.use('/api', accountRouter);
app.use('/api', authRouter);
app.use('/api', profileRouter);
app.use('/api', weigthRouter);
app.use('/api', weigthHistoryRouter);
app.use('/api', dietRouter);
app.use('/api', dietdetailRouter);
app.use('/api',forgotpasswordRouter);
app.use('/api',periodRouter);
app.use('/api',waterRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});