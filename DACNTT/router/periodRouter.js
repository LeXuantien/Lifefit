const express = require('express');
const periodController = require('../Controller/periodController'); 
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');

router.post('/createPeriod', checkMiddleware, async (req, res) => {
  try {
    const result = await periodController.createPeriod(req); 

    res.json(result);
  } catch (error) {
    console.error(error);

    if (error.message === 'Unauthorized') { 
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
router.get('/getPeriod', checkMiddleware, async (req, res, next) => {
  try {
    const periods = await periodController.getAllPeriod(req);
    res.json(periods);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
