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

const getdietBydate = async (req,res) => {

  const userId = req.userId;
  const diet_date = req.query.diet_date;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    return new Promise((resolve, reject) => {
     dietdetailModel.getdietdetailBydate(userId,  diet_date, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Error: ' + err.message));
        res.status(401).json({ message: 'Lỗi'});
      }
      resolve('successfully');
      res.status(200).json({ result});
    });
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error: ' + error.message);
  }
};
const getdietcalo = async (req,res) => {
  
  const userId = req.userId;
  const diet_date = req.query.diet_date;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    return new Promise((resolve, reject) => {
     dietdetailModel.getCaloBydate(userId,  diet_date, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Error: ' + err.message));
        res.status(401).json({ message: 'Lỗi'});
      }
      resolve('successfully');
      res.status(200).json({ result});
    });
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error: ' + error.message);
  }
};

const getdietdetail = async (req,res) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    dietdetailModel.getdietdetail(userId, (err, result) => { 
      if (err) {
        console.error(err);
        reject(new Error('Error: ' + err.message));
        res.status(401).json({ message: 'Lỗi'});
      }
      resolve('successfully');
      res.status(200).json({ result});
    });
  });
};
const updatedietdetail= async (req,res, updateddietdetailData) => {
  const userId = req.userId; 
  const id = req.params.id;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    dietModel.updatedietdetail(userId,id, updateddietdetailData, (err, result) => {
     

      if (err) {
        res.status(401).json({ message: 'Cậphật không thành công'});
        reject(new Error('Internal Server Error: ' + err.message));
      }

   
      resolve('successfully');
      res.status(200).json({ message: 'Cập nhật thành công'});
    });
  });
};
const deletedietdetail = async (req,res) => {
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
          res.status(401).json({ message: 'Xoá Không thành công'});
        }
        resolve('susscess');
        res.status(200).json({ message: 'Xoá thành công'});
      });
    });
  };
  
  const getCaloBydate = async (req, res) => {
    
    const userId = req.userId;
    const diet_date = req.query.diet_date;
    if (!userId) {
        console.log('Unauthorized');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            dietdetailModel.getCaloBydate(userId, diet_date, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        console.log(result);
        let SumCalo = 0;
        for (const diet of result) {
            console.log(diet.calo);
            SumCalo += diet.calo;
        }

        console.log('Calo:', SumCalo);
        res.status(200).json({ message: 'successfully', SumCalo });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

  
  
module.exports = {
  infordietdetail,
  getdietdetail,updatedietdetail,deletedietdetail,
  getCaloBydate,getdietBydate,getdietcalo 
  
};
