const express = require('express');
const dietRouter = require('../Controller/dietController');
const router = express.Router();

const checkSessionMiddleware = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    next(new Error('Unauthorized - Session ID is not valid'));
  }
};

router.post('/diet', checkSessionMiddleware, async (req, res) => {
  try {
    
    const result = await dietRouter.infordiet(req);
    res.json(result);
  } catch (error) {
    console.error(error);

    
    if (error.message === 'Unauthorized - Session ID is not valid') {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});
router.get('/getdiet', checkSessionMiddleware, async (req, res) => {
  try {
    // Gọi một hàm xử lý yêu cầu trong controller
    const result = await dietRouter.getdiet(req);

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
router.put('/updateddiet', checkSessionMiddleware, async (req, res) => {
  try {
    
    const { goal, date_diet} = req.body;
    const updatediettData = { goal, date_diet};

    
    const result = await dietRouter.updatediet(req, updatediettData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
