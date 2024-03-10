const blood_pressureModel = require('../Model/blood_pressureModel');

const inforblood_pressure = async (req) => {
  const userId = req.userId; 
  const { date,blood_pressure} = req.body;

  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    blood_pressureModel.createblood_pressure(userId, { date,blood_pressure}, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve('successfully');
      
    });
  });
};
const getblood_pressure = async (req) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
   blood_pressureModel.getblood_pressure(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const updatedblood_pressure= async (req, updatedblood_pressureData) => {
  const userId = req.userId; 

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    blood_pressureModel.updateblood_pressure(userId, updatedblood_pressureData, (err, result) => {
      
      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
      }

      resolve('successfully');
    });
  });
};
module.exports = {
  inforblood_pressure,
  getblood_pressure,
  updatedblood_pressure
};
