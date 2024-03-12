const express = require('express');
const dietRouter = require('../Controller/dietController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/diet', checkMiddleware, async (req, res) => {
  try {
    
    const result = await dietRouter.infordiet(req);
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
router.post('/getdietBydate', checkMiddleware, async (req, res) => {
  try {
    
    const result = await dietRouter.getdietBydate(req);
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
router.get('/getdiet', checkMiddleware, async (req, res) => {
  try {

    const result = await dietRouter.getdiet(req);

  
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
router.put('/updateddiet', checkMiddleware, async (req, res) => {
  try {
    
    const { goal,date} = req.body;
    const updatediettData = { goal,date};

    
    const result = await dietRouter.updatediet(req, updatediettData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
