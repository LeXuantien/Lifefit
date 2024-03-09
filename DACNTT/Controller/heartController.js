const heartModel = require('../Model/heartModel');

const inforheart = async (req) => {
  const userId = req.userId; 
  const {  goal,date,heartbeat } = req.body;

  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    heartModel.createheart(userId, { goal,date,heartbeat}, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve('successfully');
      
    });
  });
};
const getheart = async (req) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    heartModel.getheart(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const updatedheart= async (req, updatedheartData) => {
  const userId = req.userId; 

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    heartModel.updateheart(userId, updatedheartData, (err, result) => {
      
      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
      }

      resolve('successfully');
    });
  });
};
module.exports = {
  inforheart,
  getheart,
  updatedheart
};
