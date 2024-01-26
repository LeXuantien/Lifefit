const express = require('express');
const authController = require('../Controller/authController');
const session = require('express-session');
const router = express.Router();

router.post('/login', authController.login);
router.post('/infoprofile', (req, res) => {
    // Kiểm tra xem có session userId hay không
    if (req.session && req.session.userId) {
      // Người dùng đã đăng nhập, thực hiện các hành động cần thiết
      const userId = req.session.userId;
      authController.inforprofile(userId, (err, userProfile) => {
        if (err) {
          return res.send('Có lỗi xảy ra khi lấy thông tin người dùng.');
        }
        res.json(userProfile);
      });
    } else {
      res.send('Bạn chưa đăng nhập!');
    }
  });
module.exports = router;