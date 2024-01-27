const express = require('express');
const weigthRouter = require('../Controller/weigthController');
const router = express.Router();

const checkSessionMiddleware = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    next(new Error('Unauthorized - Session ID is not valid'));
  }
};

router.post('/weight', checkSessionMiddleware, async (req, res) => {
  try {
    // Gọi một hàm xử lý yêu cầu trong controller
    const result = await weigthRouter.inforweight(req);

    // Xử lý kết quả và gửi lại phản hồi
    res.json(result);
  } catch (error) {
    console.error(error);

    // Check for the specific unauthorized error
    if (error.message === 'Unauthorized - Session ID is not valid') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
router.get('/getweight', checkSessionMiddleware, async (req, res) => {
  try {
    // Gọi một hàm xử lý yêu cầu trong controller
    const result = await weigthRouter.getWeight(req);

    // Xử lý kết quả và gửi lại phản hồi
    res.json(result);
  } catch (error) {
    console.error(error);

    // Check for the specific unauthorized error
    if (error.message === 'Unauthorized - Session ID is not valid') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
router.put('/updateweight', checkSessionMiddleware, async (req, res) => {
  try {
    // Get updated profile data from request body
    const { goal, Date, weight } = req.body;
    const updateWeightData = { goal, Date, weight};

    
    const result = await weigthRouter.updateWeight(req, updateWeightData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/deleteweight', checkSessionMiddleware, async (req, res) => {
    try {
      // Gọi một hàm xử lý yêu cầu trong controller
      const result = await weigthRouter.getWeight(req);
  
      // Xử lý kết quả và gửi lại phản hồi
      res.json(result);
    } catch (error) {
      console.error(error);
  
      // Check for the specific unauthorized error
      if (error.message === 'Unauthorized - Session ID is not valid') {
        res.status(401).send('Unauthorized');
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  });
module.exports = router;
