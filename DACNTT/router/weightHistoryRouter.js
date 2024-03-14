const express = require('express');
const weigthRouter = require('../Controller/weightHistoryController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/weightHistory', checkMiddleware, async (req, res) => {
  try {
    
    const result = await weigthRouter.inforweighthistory(req);

    res.json(result);
  } catch (error) {
    console.error(error);

    if (error.message === 'Unauthorized ') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
router.get('/getweightHistory', checkMiddleware, async (req, res) => {
  try {
   
    const result = await weigthRouter.getweighthistory(req,res);

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
router.get('/getweightHistoryBydate', checkMiddleware, async (req, res) => {
  try {
   
    const result = await weigthRouter.getweightHistoryBydate(req,res);

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
router.put('/updateweightHistory/:id', checkMiddleware, async (req, res) => {
  try {
    const { weight, date_recorded } = req.body;
    const updateWeightData = {  weight, date_recorded};

    
    const result = await weigthRouter.updateweighthistory(req,res, updateWeightData);
    return(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/deleteweightHistory/:id', checkMiddleware, async (req, res) => {
    try {
    
      const result = await weigthRouter.deleteweighthistory(req,res);
  
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
