const express = require('express');
const watertrackerHistoryRouter = require('../Controller/watertrackerHistoryController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/watertrackerHistory', checkMiddleware, async (req, res) => {
  try {
    
    const result = await watertrackerHistoryRouter.inforwaterHistory(req,res);

    return result;
  } catch (error) {
    console.error(error);

    if (error.message === 'Unauthorized ') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
router.get('/getwaterhistory', checkMiddleware, async (req, res) => {
  try {
   
    const result = await watertrackerHistoryRouter.getwaterHistory(req,res);

    return result;
  } catch (error) {
    console.error(error);

    if (error.message === 'Unauthorized ') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
router.get('/getwaterhistoryBydate', checkMiddleware, async (req, res) => {
  try {
   
    const result = await watertrackerHistoryRouter.getwaterBydate(req,res);

    return result;
  } catch (error) {
    console.error(error);

    if (error.message === 'Unauthorized ') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});


  router.get('/WaterByDate', checkMiddleware, async (req, res) => {
    try {
      
      const result = await watertrackerHistoryRouter.getsumwaterBydate(req, res);
  
      return result;
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
