const activityHistoryModel = require('../Model/activityHistoryModel');

const inforactivityHistory = async (req) => {
  const userId = req.userId; 
  const {date, name,calo} = req.body;

  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    activityHistoryModel.creatactivityHistory(userId, date, name,calo , (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Error: ' + err.message));
      }
      resolve('successfully');
    });
  });
};

const getactivityHistoryBydate = async (req) => {
 
  const userId = req.userId;
  const date = req.params.date;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    return new Promise((resolve, reject) => {
     activityHistoryModel.getactivityHistoryBydate(userId,  date, (err, result) => {
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
const getdietcalo = async (req) => {
  
  const userId = req.userId;
  const date = req.params.date;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    return new Promise((resolve, reject) => {
     activityHistoryModel.getCaloBydate(userId,date, (err, result) => {
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

const getactivityHistory = async (req) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }

 
  return new Promise((resolve, reject) => {
    activityHistoryModel.getactivityHistory(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
      
    });
  });
};
const updateactivityHistory= async (req, updatedactivityHistorylData) => {
  const userId = req.userId; 
  const id = req.params.id;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  return new Promise((resolve, reject) => {
    activityHistoryModel.updateactivityHistory(userId,id, updatedactivityHistorylData, (err, result) => {
     

      if (err) {
       
        reject(new Error('Internal Server Error: ' + err.message));
      }

   
      resolve('successfully');
    });
  });
};
const deleteactivityHistory = async (req) => {
    const userId = req.userId;
    const id = req.params.id;
    if (!userId) {
      console.log('Unauthorized: ');
      throw new Error('Unauthorized ');
    }
  
   
    return new Promise((resolve, reject) => {
     activityHistoryModel.deleteactivityHistory(id,userId, (err, result) => { 
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
    const date = req.params.date;
    if (!userId) {
        console.log('Unauthorized');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            activityHistoryModel.getCaloBydate(userId, date, (err, result) => {
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
        for (const act of result) {
            console.log(act.calo);
            SumCalo += act.calo;
        }

        console.log('Calo:', SumCalo);
        res.status(200).json({ message: 'successfully', SumCalo });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

  
  
module.exports = {
  inforactivityHistory,
  getactivityHistory,updateactivityHistory,deleteactivityHistory,
  getCaloBydate,getactivityHistoryBydate,getdietcalo 
  
};
