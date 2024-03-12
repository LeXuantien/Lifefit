const dietdetailModel = require('../Model/dietdetailModel');
const jwt = require('jsonwebtoken');

const infordietdetail = async (req) => {
  const userId = req.userId; 
  const { content, diet_date, calo} = req.body;

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    dietdetailModel.creatdietdetail (userId, content,diet_date,calo , (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Error: ' + err.message));
      }
      resolve('successfully');
    });
  });
};

const getdietBydate = async (req) => {
  const { diet_date } = req.body;
  const userId = req.userId;
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

const getdietdetail = async (req) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    dietdetailModel.getdietdetail(userId, (err, result) => { 
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
  const id = req.params.id;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    dietModel.updatedietdetail(userId,id, updateddietdetailData, (err, result) => {
     

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
        resolve('susscess');
      });
    });
  };
  
  const getCaloBydate = async (req, res) => {
    const userId = req.userId;
    const { diet_date } = req.body;
    const formattedDate = new Date(diet_date).toISOString().slice(0, 10);
    if (!userId) {
      console.log('Unauthorized');
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const dietdetail = await dietdetailModel.getdietdetailBydate(userId, formattedDate);
      console.log(dietdetail);
      if (!dietdetail) {
        console.log('Không có dữ liệu');
        return res.status(404).json({ message: 'Không có dữ liệu' });
      }
  
      let SumCalo = 0;
      for (const diet of dietdetail) {
        SumCalo += diet.calo;
      }
  
      console.log('Calo:', SumCalo);
      res.status(200).json({ message: 'successfully', SumCalo });
    } catch (error) {
      console.error('Lỗi:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
module.exports = {
  infordietdetail,
  getdietdetail,updatedietdetail,deletedietdetail,
  getCaloBydate,getdietBydate
  
};
