const express = require('express');
const bodyParser = require('body-parser');
const accountRouter = require('./router/registerRouter');

const app = express();
const port = 2024;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Use accountRouter for account-related routes
app.use('/account', accountRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});