const dietdetailModel = require('../Model/dietdetailModel');
const jwt = require('jsonwebtoken');

const infordietdetail = async (req,res) => {
  const userId = req.userId; 
  const { content, diet_date, calo} = req.body;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized '});
  }

  try{
    dietdetailModel.creatdietdetail (userId, content,diet_date,calo , (err, result) => {
      if (err) {
        console.error(err);      
        res.status(401).json({ message: 'Không thành công'});
      }
      if(!result){
        res.status(401).json({ message: 'Chưa có mục tiêu'});
      }
      else{
        res.status(200).json({message: 'Thành công'});
      }
      
    });
  }
  catch (error) {
    res.status(401).json({ message: 'Không thành công'});
  }
 
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
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({message: 'Thành công',result});
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
    res.status(401).json({ message: 'Unauthorized '});
  }

  try {
    return new Promise((resolve, reject) => {
     dietdetailModel.getCaloBydate(userId,  diet_date, (err, result) => {
      if (err) {
        console.error(err);      
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({message: 'Thành công',result});
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
    res.status(401).json({ message: 'Unauthorized '});
  }

 
  return new Promise((resolve, reject) => {
    dietdetailModel.getdietdetail(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({message: 'Thành công', result});
    });
  });
};
const updatedietdetail= async (req,res, updateddietdetailData) => {
  const userId = req.userId; 
  const id = req.params.id;
  if (!userId) {
   
    res.status(401).json({ message: 'Unauthorized'});     
  }
 
 try{
  dietdetailModel.updatedietdetail(userId,id, updateddietdetailData, (err, result) => {    
    
  if (err) {
    return  res.status(401).json({ message: 'Cập nhật không thành công'});     
  }else{
   return res.status(200).json({ message: 'Cập nhật thành công'});
  }
   
  });
 }
  catch
    (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
  
  }
};
const deletedietdetail = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' }); 
  }

  try {
    dietdetailModel.deletedietdetail(id, userId, (err, result) => { 
      if (err) {
        console.error(err);      
        return res.status(401).json({ message: 'Xoá Không thành công' });
      } else {
        return res.status(200).json({ message: 'Xoá thành công' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

  
  const getCaloBydate = async (req, res) => {
    
    const userId = req.userId;
    const diet_date = req.query.diet_date;
    if (!userId) {
        console.log('Unauthorized');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
       
            dietdetailModel.getCaloBydate(userId, diet_date, (err, result) => {
              if (err) {
                console.error(err);      
                res.status(401).json({ message: 'Không thành công'});
              }
              if(!result){
                res.status(401).json({ message: 'Không tìm thấy'});
              }
              else{
                let SumCalo = 0;
                for (const diet of result) {
                  
                    SumCalo += diet.calo;
                }
                console.log('Calo:', SumCalo);
                res.status(200).json({ message: 'Thành công', SumCalo });
              
              }
            }) 
          
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
