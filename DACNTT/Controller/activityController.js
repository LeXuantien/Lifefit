const activityModel = require('../Model/activityModel');
const notiModel= require('../Model/notificationModel');
const inforactivity = async (req,res) => {
  const userId = req.userId; 
  const {  name,goal,date } = req.body;

  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    activityModel.create(userId, {name, goal,date}, (err, result) => {
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
        res.status(401).json({ message: 'Lỗi'});
      }
      resolve(result);
      res.status(200).json({ result});
    });
  });
};
const getactivity = async (req,res) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }
 
  return new Promise((resolve, reject) => {
    activityModel.getactivity(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
        res.status(401).json({ message: 'Lỗi'});
      }
      resolve(result);
      res.status(200).json({ result});
    });
    
  });

};
const updateactivity = async (req, res, updatedactivityData) => {
  const userId = req.userId;
  const id = req.params.id;
  const content = updatedactivityData && updatedactivityData.name ? `Chúc mừng bạn đã hoàn thành mục tiêu ${updatedactivityData.name}.` : "Chúc mừng bạn đã hoàn thành một mục tiêu.";
  const time_noti = new Date(); 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    activityModel.updateactivity(id, userId, updatedactivityData, (err, result) => {
      if (err) {
        reject(new Error('Internal Server Error: ' + err.message));
        res.status(500).json({ message: 'Lỗi'});
        return; 
      }
      if (updatedactivityData.goal === true) {
        notiModel.createnoti(userId, { time_noti, content }, (err, result) => {
          if (err) {
            console.error(err);
            reject(new Error('Internal Server Error: ' + err.message));
            return; 
          }
          resolve(result);          
        });
      } else {
        resolve(result); 
      }
      res.status(200).json({ message: 'Cập nhật thành công'});
    });
  });
};


const deleteactivity= async (req,res) => {
  const userId = req.userId; 
  const id=req.params.id; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    activityModel.deleteactivity(id,userId, (err, result) => {
      
      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
        res.status(401).json({ message: 'Lỗi'});
      }

      resolve('successfully');
      res.status(200).json({ message: 'Xoá thành công'});
    });
  });
};
const getactivityBydate = async (req,res) => {
  const userId = req.userId; 
  const date  = req.query.date; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    return new Promise((resolve, reject) => {
      activityModel.getactivityBydate(userId, date, (err, result) => { 
        if (err) {
          console.error(err);      
          reject(new Error('Internal Server Error: ' + err.message));
          res.status(401).json({ message: 'Lỗi'});
        }
        resolve(result);
        res.status(200).json({ result});
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error: ' + error.message);
  }
};
module.exports = {
  inforactivity,
  getactivity,
  updateactivity,
  deleteactivity,
  getactivityBydate
};
