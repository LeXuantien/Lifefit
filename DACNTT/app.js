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
const watertrackerHistoryRouter= require('./router/watertrackerHistoryRouter');
const heartRouter= require('./router/heartRouter');
const blood_pressureRouter= require('./router/blood_pressureRouter');
const activityRouter= require('./router/activityRouter');
const notificationRouter= require('./router/notificationRouter');
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
app.use('/api',watertrackerHistoryRouter);
app.use('/api',heartRouter);
app.use('/api',blood_pressureRouter);
app.use('/api',activityRouter);
app.use('/api',notificationRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});