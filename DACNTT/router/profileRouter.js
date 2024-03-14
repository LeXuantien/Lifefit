const express = require('express');
const profileRouter = require('../Controller/profileController');
const router = express.Router();
const checkMiddleware = require('../utils/Middleware');



router.get('/getprofile', checkMiddleware, async (req, res) => {
  try {
 const result = await profileRouter.getProfile(req);

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
router.put('/updatedprofile', checkMiddleware, async (req, res) => {
  try {
    
    const {email, fullname,birthday, gender,weight, height, wakeup_time, sleeping_time} = req.body;
    const updatedprofileData = { email, fullname,birthday, gender,weight, height, wakeup_time, sleeping_time};

    
    const result = await profileRouter.updatedProfile(req,res, updatedprofileData);
    return(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.put('/updatedPassword', checkMiddleware, async (req, res) => {
  try {
    const result = await profileRouter.updatedProfile(req, res);
    return(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
