const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const accountRouter = require('./route/registerRoute');
const authRouter = require('./route/authRoute');
const profileRouter = require('./route/profileRoute');
const weigthRouter= require('./route/weigthRoute');
const weigthHistoryRouter= require('./route/weightHistoryRoute');
const dietRouter= require('./route/dietRoute');
const dietdetailRouter= require('./route/dietdetailRoute');
const forgotpasswordRouter = require('./route/forgotpasswordRoute');
const periodRouter= require('./route/periodRoute');
const waterRouter= require('./route/waterRoute');
const watertrackerHistoryRouter= require('./route/watertrackerHistoryRoute');
const heartRouter= require('./route/heartRoute');
const blood_pressureRouter= require('./route/blood_pressureRoute');
const activityRouter= require('./route/activityRoute');
const notificationRouter= require('./route/notificationRoute');
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