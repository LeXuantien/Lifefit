const express = require('express');
const waterRouter = require('../Controller/waterController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/water', checkMiddleware, async (req, res) => {
  try {
    
    const result = await waterRouter.inforwater(req);
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
router.get('/getwater', checkMiddleware, async (req, res) => {
  try {
  
    const result = await waterRouter.getwater(req);

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
router.get('/getwaterBydate/:dategoal', checkMiddleware, async (req, res) => {
  try {
  
    const result = await waterRouter.getwaterBydate(req,res);

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
router.put('/updatedwater/:id', checkMiddleware, async (req, res) => {
  try {
    
    const { watergoal, dategoal} = req.body;
    const updatedwatertData = { watergoal, dategoal};

    
    const result = await waterRouter.updatedwater(req,res, updatedwatertData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/deletewater/:id', checkMiddleware, async (req, res) => {
  try {
  
    const result = await waterRouter.deletewater(req,res);

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
module.exports = router;
