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
   
    const result = await weigthRouter.getweighthistory(req);

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
router.put('/updateweightHistory', checkMiddleware, async (req, res) => {
  try {
    const { goal, Date } = req.body;
    const updateWeightData = { goal, Date};

    
    const result = await weigthRouter.updateweighthistory(req, updateWeightData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/deleteweight', checkMiddleware, async (req, res) => {
    try {
    
      const result = await weigthRouter.deleteWeight(req);
  
      res.json(result);
    } catch (error) {
      console.error(error);
  
      if (error.message === 'Unauthorized - Session ID is not valid') {
        res.status(401).send('Unauthorized');
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  });
module.exports = router;
