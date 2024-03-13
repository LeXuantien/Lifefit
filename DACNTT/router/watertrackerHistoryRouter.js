const express = require('express');
const watertrackerHistoryRouter = require('../Controller/watertrackerHistoryController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');


router.post('/watertrackerHistory', checkMiddleware, async (req, res) => {
  try {
    
    const result = await watertrackerHistoryRouter.inforwaterHistory(req,res);

    return (result);
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
router.get('/getdietdetailBydate/:diet_date', checkMiddleware, async (req, res) => {
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
router.get('/getdietcaloBydate/:diet_date', checkMiddleware, async (req, res) => {
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

    
    const result = await dietRouter.updatedietdetail(req,res, updatedietdetailData);
    return(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/deletedietdetail/:id', checkMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    
      const result = await dietRouter.deletedietdetail(req,res);
  
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
  router.get('/WaterdietByDate/:dategoal', checkMiddleware, async (req, res) => {
    try {
      
      const result = await watertrackerHistoryRouter.getsumwaterBydate(req, res);
  
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
module.exports = router;
