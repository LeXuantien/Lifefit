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

    const result = await heartRouter.getheart(req,res);

  
    return(result);
  } catch (error) {
    console.error(error);

    if (error.message === 'Unauthorized ') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

router.get('/getheartBydate', checkMiddleware, async (req, res) => {
  try {
  
    const result = await heartRouter.getheartBydate(req,res);

    return(result);
  } catch (error) {
    console.error(error);

    if (error.message === 'Unauthorized ') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
router.put('/updatedheart/:id', checkMiddleware, async (req, res) => {
  try {
    
    const { date,heartbeat} = req.body;
    const updatedheartData = { date,heartbeat};

    
    const result = await heartRouter.updatedheart(req,res, updatedheartData);
   return(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/deleteheart/:id', checkMiddleware, async (req, res) => {
  try {
  
    const result = await heartRouter.deleteheart(req,res);

    return(result);
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
