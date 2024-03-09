const express = require('express');
const weigthRouter = require('../Controller/weigthController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/weight', checkMiddleware, async (req, res) => {
  try {
    
    const result = await weigthRouter.inforweight(req);

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
router.get('/getweight', checkMiddleware, async (req, res) => {
  try {
   
    const result = await weigthRouter.getWeight(req);

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
router.put('/updateweight', checkMiddleware, async (req, res) => {
  try {
    const { goal, Date } = req.body;
    const updateWeightData = { goal, Date};

    
    const result = await weigthRouter.updateWeight(req, updateWeightData);
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
