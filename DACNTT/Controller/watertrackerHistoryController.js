const watertrackerHistorylModel = require('../Model/watertrackerHistoryModel');
const jwt = require('jsonwebtoken');

const inforwaterHistory = async (req,res) => {
  const userId = req.userId; 
  const { time} = req.body;
  const content = "Đã đến giờ uống nước!"
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    watertrackerHistorylModel.createwaterHistory (userId,time, content,  (err, result) => {
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công'});
    });
  });
};
const getwaterHistory = async (req,res) => {

  const userId = req.userId;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    return new Promise((resolve, reject) => {
     watertrackerHistorylModel.getdwaterHistory(userId, (err, result) => {
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công',result});
    });
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error: ' + error.message);
  }
};


const getwaterBydate = async (req,res) => {

  const userId = req.userId;
  const date = req.query.dategoal;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    return new Promise((resolve, reject) => {
     watertrackerHistorylModel.getwaterHistoryBydate(userId,date, (err, result) => {
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công',result});
    });
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error: ' + error.message);
  }
};


  
  const getsumwaterBydate = async (req, res) => {
    
    const userId = req.userId;
    const date = req.query.dategoal;
    if (!userId) {
        console.log('Unauthorized');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        return new Promise((resolve, reject) => {
            watertrackerHistorylModel.getwaterBydate(userId, date, (err, result) => {
              if (err) {
                res.status(401).json({ message: 'Không thành công'});
              }
              let Sumwater = 0;
              for (const water of result) {
                  Sumwater += water.water;
              }
      
              res.status(200).json({ message: 'successfully', Sumwater });
      
            });
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

  
  
module.exports = {
  inforwaterHistory ,
  getsumwaterBydate,
  getwaterBydate,
  getwaterHistory
  
};
