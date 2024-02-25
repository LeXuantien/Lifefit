const express = require('express');
const periodRouter = require('../Controller/periodController');
const router = express.Router();

const checkSessionMiddleware = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    next(new Error('Unauthorized - Session ID is not valid'));
  }
};

router.post('/inforperiod', checkSessionMiddleware, async (req, res) => {
  try {
    
    const result = await periodRouter.inforperiod(req);

   
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
router.get('/getperiod', checkSessionMiddleware, async (req, res) => {
  try {
    
    const result = await periodRouter.getPeriod(req);

    
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
router.put('/updateperiod', checkSessionMiddleware, async (req, res) => {
  try {
   
    const { datestarted, dateend,  note} = req.body;
    const updatedPeriodData = { datestarted, dateend,  note};

    
    const result = await periodRouter.updatePeriod(req, updatedPeriodData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
