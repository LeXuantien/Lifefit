const express = require('express');
const notiRouter = require('../Controller/notificationController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/noti', checkMiddleware, async (req, res) => {
  try {
    
    const result = await notiRouter.infornoti(req);
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
router.get('/getnoti', checkMiddleware, async (req, res) => {
  try {

    const result = await notiRouter.getnoti(req,res);

  
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

router.get('/getnotiBydate', checkMiddleware, async (req, res) => {
  try {
  
    const result = await notiRouter.getnotiBydate(req,res);

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

router.delete('/deletenoti/:id', checkMiddleware, async (req, res) => {
  try {
  
    const result = await notiRouter.deletenoti(req,res);

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
