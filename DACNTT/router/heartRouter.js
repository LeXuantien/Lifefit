const express = require('express');
const heartRouter = require('../Controller/heartController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/heart', checkMiddleware, async (req, res) => {
  try {
    
    const result = await heartRouter.inforheart(req);
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
router.get('/getheart', checkMiddleware, async (req, res) => {
  try {

    const result = await heartRouter.getheart(req);

  
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
router.put('/updatedheart', checkMiddleware, async (req, res) => {
  try {
    
    const { goal ,date,heartbeat} = req.body;
    const updatedheartData = { goal,date,heartbeat};

    
    const result = await heartRouter.updatedheart(req, updatedheartData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
