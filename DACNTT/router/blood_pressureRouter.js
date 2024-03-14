const express = require('express');
const blood_pressureRouter = require('../Controller/blood_pressureController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/blood_pressure', checkMiddleware, async (req, res) => {
  try {
    
    const result = await blood_pressureRouter.inforblood_pressure(req,res);
    return(result);
  } catch (error) {
    console.error(error);

    
    if (error.message === 'Unauthorized ') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
router.get('/getblood_pressure', checkMiddleware, async (req, res) => {
  try {

    const result = await blood_pressureRouter.getblood_pressureBydate(req,res);

  
    return(result);
  } catch (error) {
    console.error(error);

    if (error.message === 'Unauthorized ') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
router.put('/updatedblood_pressure/:id', checkMiddleware, async (req, res) => {
  try {
    
    const { date,blood_pressure} = req.body;
    const updatedblood_pressureData = { date,blood_pressure};

    
    const result = await blood_pressureRouter.updatedblood_pressure(req,res, updatedblood_pressureData);
    return result;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/deleteblood_pressure/:id', checkMiddleware, async (req, res) => {
  try {
  
    const result = await blood_pressureRouter.deleteblood_pressure(req,res);

    return result;
  } catch (error) {
    console.error(error);

    if (error.message === 'Unauthorized - Session ID is not valid') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
router.get('/getheartBydate', checkMiddleware, async (req, res) => {
  try {
  
    const result = await blood_pressureRouter.getblood_pressureBydate(req,res);

    return(result);
  } catch (error) {
    console.error(error);

    if (error.message === 'Unauthorized ') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
module.exports = router;
