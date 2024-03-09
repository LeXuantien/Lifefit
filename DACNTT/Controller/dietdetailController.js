const dietModel = require('../Model/dietdetailModel');
const jwt = require('jsonwebtoken');

const infordietdetail = async (req) => {
  const userId = req.userId; 
  const { content,diet_date,calo} = req.body;

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    dietModel.creatdietdetail (userId, {  content,diet_date,calo }, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Error: ' + err.message));
      }
      resolve('successfully');
    });
  });
};
const getdietdetail = async (req) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    dietModel.getdietdetail(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const updatedietdetail= async (req, updateddietdetailData) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    dietModel.updatedietdetail(userId, updateddietdetailData, (err, result) => {
     

      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
      }

   
      resolve('successfully');
    });
  });
};
const deletedietdetail = async (req) => {
    const userId = req.userId;
    const id = req.params.id;
    if (!userId) {
      console.log('Unauthorized: ');
      throw new Error('Unauthorized ');
    }
  
   
    return new Promise((resolve, reject) => {
      dietModel.deletedietdetail(id,userId, (err, result) => { 
        if (err) {
          console.error(err);      
          reject(new Error('Internal Server Error: ' + err.message));
        }
        resolve(result);
      });
    });
  };
  
   
module.exports = {
  infordietdetail,
  getdietdetail,updatedietdetail,deletedietdetail
  
};
