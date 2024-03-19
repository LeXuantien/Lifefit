const express = require('express');
const activityRouter = require('../Controller/activityController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/activity', checkMiddleware, async (req, res) => {
  try {
    
    const result = await activityRouter.inforactivity(req,res);
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
router.get('/getactivity', checkMiddleware, async (req, res) => {
  try {

    const result = await activityRouter.getactivity(req,res);

  
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
router.get('/getactivityBydate', checkMiddleware, async (req, res) => {
  try {

    const result = await activityRouter.getactivityBydate(req,res);

  
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
router.put('/updatedactivity/:id', checkMiddleware, async (req, res) => {
  try {
    
    const { name,goal} = req.body;
    const updateactivitytData = {name, goal};

    
    const result = await activityRouter.updateactivity(req,res, updateactivitytData);
    return result;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/deleteactivity/:id', checkMiddleware, async (req, res) => {
  try {
  
    const result = await activityRouter.deleteactivity(req,res);

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
