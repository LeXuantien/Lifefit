const activityModel = require('../Model/activityModel');
const notiModel= require('../Model/notificationModel');
const cron = require('node-cron');
const inforactivity = async (req,res) => {
  const userId = req.userId; 
  const {  name,goal,date } = req.body;

  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized ');
  }
 
 try{
     activityModel.create(userId, {name, goal,date}, (err, result) => {
    if (err) {
      console.error(err);      
      res.status(401).json({ message: 'Không thành công'});
    }
    res.status(200).json({message: 'Thành công'});
  });
 
} catch (error) {
  res.status(401).json({ message: 'Không thành công', error });
}
    
};
const getactivity = async (req,res) => {
  const userId = req.userId; 
  if (!userId) {
   res.status(401).json('Unauthorized ')
    
  }
 
  try {
    activityModel.getactivity(userId, (err, result) => { 
      if (err) {
        console.error(err);      
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({message: 'Thành công', result});
    });
    
  }catch (error) {
    res.status(401).json({ message: 'Không thành công', error });
  }
    

};
const updateactivity = async (req, res, updatedactivityData) => {
  const userId = req.userId;
  const id = req.params.id;
  const content = updatedactivityData && updatedactivityData.name ? `Chúc mừng bạn đã hoàn thành mục tiêu ${updatedactivityData.name}.` : "Chúc mừng bạn đã hoàn thành một mục tiêu.";
  const time_noti = new Date(); 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try{
    activityModel.updateactivity(id, userId, updatedactivityData, (err, result) => {
      if (err) {
        res.status(401).json({ message: 'Không thành công'});
        return; 
      }
      if (updatedactivityData.goal === true) {
        notiModel.createnoti(userId, { time_noti, content }, (err, result) => {
          if (err) {
            
            res.status(401).json({ message: 'Không thành công'});
          }
       
        });
      } 
      res.status(200).json({ message: 'Cập nhật thành công'});
    });


  }catch (error) {
    res.status(401).json({ message: 'Không thành công', error });
  }
    
};


const deleteactivity= async (req,res) => {
  const userId = req.userId; 
  const id=req.params.id; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }
    try{
      activityModel.deleteactivity(id,userId, (err, result) => {
      
        if (err) {
         
          res.status(401).json({ message: 'Xoá không thành công'});
        }
  
       
        res.status(200).json({ message: 'Xoá thành công'});
      });
    }catch (error) {
    res.status(401).json({ message: 'Không thành công', error });
  }
}
  
const getactivityBydate = async (req,res) => {
  const userId = req.userId; 
  const date  = req.query.date; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  try {
    return new Promise((resolve, reject) => {
      activityModel.getactivityBydate(userId, date, (err, result) => { 
        if (err) {
          console.error(err);      
          
          res.status(401).json({ message: 'Thất bại'});
        }
        
        res.status(200).json({ message: 'Thành công', result});
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error: ' + error.message);
  }
};


const updatenoti = async (req, res) => {
  const time_noti = new Date(); 
  const date=time_noti.setDate(time_noti.getDate() - 1);
  try{
    activityModel.getallactivity( date, (err, result) => {
      if (err) {
        return; 
      }
      
     
      for(act of result){
        if (act.goal === 0) { 
          const content = `Bạn chưa hoàn thành mục tiêu ${act.name}.`;
          notiModel.createnoti(act.account_id, { time_noti, content }, (err, result) => {
            if (err) {
              console.log( 'Không thành công');
            }
            console.log( 'Thành công');
          });
        } 
      }
 
    });

  }catch (error) {
    res.status(401).json({ message: 'Không thành công', error });
  }
    
};
cron.schedule('23 18 * * *', () => {
  updatenoti(); 
}, {
  timezone: 'Asia/Ho_Chi_Minh'
});
module.exports = {
  inforactivity,
  getactivity,
  updateactivity,
  deleteactivity,
  getactivityBydate,
  updatenoti
};
