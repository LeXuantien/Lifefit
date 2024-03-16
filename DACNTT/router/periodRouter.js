const express = require('express');
const periodController = require('../Controller/periodController'); 
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');

router.post('/createPeriod', checkMiddleware, async (req, res) => {
  try {
    const result = await periodController.createPeriod(req,res); 

    return result;
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
    const periods = await periodController.getAllPeriod(req,res);
    return periods;
  } catch (error) {
    next(error);
  }
});
router.get('/getPeriodBydate', checkMiddleware, async (req, res, next) => {
  try {
    const periods = await periodController.getPeriodBydate(req,res);
    return periods;
  } catch (error) {
    next(error);
  }
});
router.get('/getPeriodlengthPre', checkMiddleware, async (req, res, next) => {
  try {
    const periods = await periodController.getmenstruallength(req,res);
    return periods;
  } catch (error) {
    next(error);
  }
});
router.get('/getPeriodlengthCurrent', checkMiddleware, async (req, res, next) => {
  try {
    const periods = await periodController.getmenstruallength_current(req,res);
    return periods;
  } catch (error) {
    next(error);
  }
});
router.get('/getPeriodPre', checkMiddleware, async (req, res, next) => {
  try {
    const periods = await periodController.getperiodlength(req,res);
    return periods;
  } catch (error) {
    next(error);
  }
});
router.put('/updateperiod/:id', checkMiddleware, async (req, res) => {
  try {
 
    const result = await periodController.updatePeriodByID(req,res);
    return result;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
