const express = require('express');
const dietRouter = require('../Controller/dietdetailController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/dietdetail', checkMiddleware, async (req, res) => {
  try {
    
    const result = await dietRouter.infordietdetail(req);

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
router.get('/getdietdetail', checkMiddleware, async (req, res) => {
  try {
   
    const result = await dietRouter.getdietdetail(req);

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
router.post('/getdietdetailBydate', checkMiddleware, async (req, res) => {
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
router.post('/getdietcaloBydate', checkMiddleware, async (req, res) => {
  try {
   
    const result = await dietRouter.getdietcalo(req);

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
router.put('/updatedietdetail/:id', checkMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const { content,diet_date,calo } = req.body;
    const updatedietdetailData = { content,diet_date,calo};

    
    const result = await dietRouter.updatedietdetail(req, updatedietdetailData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/deletedietdetail/:id', checkMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    
      const result = await dietRouter.deletedietdetail(req);
  
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
  router.post('/CalodietByDate', checkMiddleware, async (req, res) => {
    try {
      
      const result = await dietRouter.getCaloBydate(req, res);
  
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
