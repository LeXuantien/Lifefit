const notiModel = require('../Model/notificationModel');

const infornoti = async (req,res) => {
  const userId = req.userId; 
  const { time_noti,content } = req.body;

  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    notiModel.createnoti(userId, {time_noti,content}, (err, result) => {
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công'});
    });
  });
};
const getnoti = async (req,res) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
   notiModel.getnoti(userId, (err, result) => { 
    if (err) {
      console.error(err);
     
      res.status(401).json({ message: 'Không thành công'});
    }
    res.status(200).json({ message:'Thành công',result});
  });
  });
};

const getnotiBydate = async (req,res) => {
  const userId = req.userId; 
  const date=req.query.date;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }
  return new Promise((resolve, reject) => {
    notiModel.getnotibydate(date,userId, (err, result) => { 
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công',result});
    });
  });
};

const deletenoti= async (req,res) => {
  const userId = req.userId; 
  const id=req.params.id; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    notiModel.deletenoti(id,userId, (err, result) => {
      
      if (err) {
        res.status(401).json({ message: 'Xóa không thành công'});
      }
      res.status(200).json({ message: 'Xoá thành công'});
    });
  });
};
module.exports = {
  infornoti,
  getnoti,
  getnotiBydate,
  deletenoti
};
