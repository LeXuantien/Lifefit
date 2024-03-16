const heartModel = require('../Model/heartModel');

const inforheart = async (req,res) => {
  const userId = req.userId; 
  const { date,heartbeat } = req.body;

  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    heartModel.createheart(userId, {date,heartbeat}, (err, result) => {
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công'});
    });
    
  });
};
const getheart = async (req,res) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    heartModel.getheart(userId, (err, result) => { 
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công',result});
    });
  });
};

const getheartBydate = async (req,res) => {
  const userId = req.userId; 
  const date=req.query.date;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }
  return new Promise((resolve, reject) => {
    heartModel.getheartbydate(date,userId, (err, result) => { 
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công',result});
    });
  });
};

const updatedheart= async (req,res, updatedheartData) => {
  const userId = req.userId; 
  const id = req.params.id;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    heartModel.updateheart(id,userId, updatedheartData, (err, result) => {
      
      if (err) {
       
       
        res.status(401).json({ message: 'Cập nhật không thành công'});
      }

      res.status(200).json({ message: 'Cập nhật thành công'});
    });
  });
};
const deleteheart= async (req,res) => {
  const userId = req.userId; 
  const id=req.params.id; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    heartModel.deleteheart(id,userId, (err, result) => {
      
      if (err) {
        res.status(401).json({ message: 'Xóa không thành công'});
      }
      res.status(200).json({ message: 'Xoá thành công'});
    });
  });
};
module.exports = {
  inforheart,
  getheart,
  updatedheart,
  deleteheart,
  getheartBydate
};
