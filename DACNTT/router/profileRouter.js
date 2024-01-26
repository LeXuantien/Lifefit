const express = require('express');
const profilRouter = require('../Controller/profileController');
const router = express.Router();

const checkSessionMiddleware = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    // Don't send a response here, just call next with an error
    next(new Error('Unauthorized - Session ID is not valid'));
  }
};

router.post('/inforprofile', checkSessionMiddleware, async (req, res) => {
  try {
    // Gọi một hàm xử lý yêu cầu trong controller
    const result = await profilRouter.inforprofile(req);

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
router.get('/getprofile', checkSessionMiddleware, async (req, res) => {
  try {
    // Gọi một hàm xử lý yêu cầu trong controller
    const result = await profilRouter.getProfile(req);

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
