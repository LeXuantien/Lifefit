const express = require('express');
const activityHistoryRouter = require('../Controller/activityHistoryController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/activityHistory', checkMiddleware, async (req, res) => {
  try {
    
    const result = await activityHistoryRouter.inforactivityHistory(req);

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
router.get('/getactivityHistory', checkMiddleware, async (req, res) => {
  try {
   
    const result = await activityHistoryRouter.getactivityHistory(req);

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
router.get('/getactivityHistoryBydate', checkMiddleware, async (req, res) => {
  try {
   
    const result = await activityHistoryRouter.getactivityHistoryBydate(req);

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
router.get('/getactivityHistorycaloBydate', checkMiddleware, async (req, res) => {
  try {
   
    const result = await activityHistoryRouter.getdietcalo(req);

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
router.put('/updateactivityHistory/:id', checkMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const {date,name,calo } = req.body;
    const updateactivityHistoryData = { date,name,calo};

    
    const result = await activityHistoryRouter.updateactivityHistory(req, updateactivityHistoryData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/deleteactivityHistory/:id', checkMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    
      const result = await activityHistoryRouter.deleteactivityHistory(req);
  
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
  router.get('/CaloactivityByDate', checkMiddleware, async (req, res) => {
    try {
      
      const result = await activityHistoryRouter.getCaloBydate(req, res);
  
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
module.exports = router;
