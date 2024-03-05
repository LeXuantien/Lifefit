const express = require('express');
const profileRouter = require('../Controller/profileController');
const router = express.Router();

const checkSessionMiddleware = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    next(new Error('Unauthorized - Session ID is not valid'));
  }
};


router.get('/getprofile', checkSessionMiddleware, async (req, res) => {
  try {
 const result = await profileRouter.getProfile(req);

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
router.put('/updateprofile', checkSessionMiddleware, async (req, res) => {
  try {
  
    const { email, fullname,birthday, password,gender, height, wakeup_time, sleeping_time } = req.body;
    const updatedProfileData = { email, fullname,birthday, password,gender, height, wakeup_time, sleeping_time };

    
    const result = await profileRouter.updateProfile(req, updatedProfileData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
