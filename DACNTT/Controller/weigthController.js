const weightModel = require('../Model/weightModel');
const inforweight = async (req,res) => {
  const userId = req.userId; 
  const { goal} = req.body;

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    weightModel.creatweight(userId, { goal }, (err, result) => {
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công'});
    });
  });
};
const getWeight = async (req,res) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

 
  return new Promise((resolve, reject) => {
    weightModel.getweight(userId, (err, result) => { 
      if (err) {
        console.error(err);
       
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message:'Thành công',result});
    });
  });
};
const updateWeight= async (req,res, updatedWeigthData) => {
  const userId = req.userId; 
  const id=req.params.id;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    weightModel.updateweight(id,userId, updatedWeigthData, (err, result) => {
     

      if (err) {
       
        res.status(401).json({ message: 'Cập nhật không thành công'});
      }
      res.status(200).json({ message: 'Cập nhật thành công'});
    });
  });
};

  
   
module.exports = {
  inforweight,
  getWeight,
  updateWeight,
  
};
