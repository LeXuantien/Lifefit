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
        
        reject(new Error('Error: ' + err.message));
        res.status(401).json({err });
      }
      resolve('successfully');
      res.status(200).json({message:"Thành công" });
    });
  });
};

const getwaterBydate = async (req) => {

  const userId = req.userId;
  const diet_date = req.params.diet_date;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    return new Promise((resolve, reject) => {
     dietdetailModel.getdietdetailBydate(userId,  diet_date, (err, result) => {
        if (err) {
          console.error(err);
          reject(new Error('Internal Server Error: ' + err.message));
        }
        resolve(result);
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error: ' + error.message);
  }
};
const getwatercalo = async (req) => {
  
  const userId = req.userId;
  const diet_date = req.params.diet_date;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    return new Promise((resolve, reject) => {
     dietdetailModel.getCaloBydate(userId,  diet_date, (err, result) => {
        if (err) {
          console.error(err);
          reject(new Error('Internal Server Error: ' + err.message));
        }
        resolve(result);
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error: ' + error.message);
  }
};


  
  const getsumwaterBydate = async (req, res) => {
    
    const userId = req.userId;
    const dategoal = req.params.dategoal;
    if (!userId) {
        console.log('Unauthorized');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            watertrackerHistorylModel.getwaterBydate(userId, dategoal, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        console.log(result);
        let Sumwater = 0;
        for (const water of result) {
            console.log(water.water);
            Sumwater += water.water;
        }

        res.status(200).json({ message: 'successfully', Sumwater });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

  
  
module.exports = {
  inforwaterHistory ,
  getsumwaterBydate
  
};
