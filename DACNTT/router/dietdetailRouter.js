const express = require('express');
const dietRouter = require('../Controller/dietdetailController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/dietdetail', checkMiddleware, async (req, res) => {
  try {
    
    const result = await dietRouter.infordietdetail(req,res);

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
router.get('/getdietdetail', checkMiddleware, async (req, res) => {
  try {
   
    const result = await dietRouter.getdietdetail(req,res);

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
router.get('/getdietdetailBydate', checkMiddleware, async (req, res) => {
  try {
   
    const result = await dietRouter.getdietBydate(req,res);

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
router.get('/getdietcaloBydate', checkMiddleware, async (req, res) => {
  try {
   
    const result = await dietRouter.getdietcalo(req,res);

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
router.put('/updatedietdetail/:id', checkMiddleware, async (req, res) => {
  try {
    const { content,calo } = req.body;
    const updatedietdetailData = { content,calo};

    
    const result = await dietRouter.updatedietdetail(req,res, updatedietdetailData);
    return result ;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/deletedietdetail/:id', checkMiddleware, async (req, res) => {
  
  try {
    
      const result = await dietRouter.deletedietdetail(req,res);
  
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
  router.get('/CalodietByDate', checkMiddleware, async (req, res) => {
    try {
      
      const result = await dietRouter.getCaloBydate(req, res);
  
      return result ;
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
