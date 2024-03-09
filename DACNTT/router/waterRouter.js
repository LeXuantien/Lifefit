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
router.put('/updatedwater', checkMiddleware, async (req, res) => {
  try {
    
    const { watergoal, dategoal} = req.body;
    const updatedwatertData = { watergoal, dategoal};

    
    const result = await waterRouter.updatedwater(req, updatedwatertData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
