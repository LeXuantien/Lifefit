
const periodModel = require('../Model/periodModel');
const cron = require('node-cron');
const createPeriod = async (req,res) => {
  const userId = req.userId; 
  const { start_date, end_date, note } = req.body;

  if (!userId) {
    console.log('Unauthorized ');
    throw new Error('Unauthorized ');
  }
  let menstrual_days = [];
  const startDate = new Date(start_date); 
  if(startDate.getMonth()< new Date().getMonth() && !end_date){
    console.log('Vui lòng nhập ngày kết thúc ');
    throw new Error('error');
  }
  if(startDate >new Date()){
    console.log('Không được phép ');
    throw new Error('error ');
  }
  if (!end_date) {
    let currentDate = new Date(startDate); 
    const today = new Date();

    while (currentDate <= today) { 
      menstrual_days.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
  } else {
    const endDate = new Date(end_date);
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) { 
      menstrual_days.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
 
  try {
    const result = await new Promise((resolve, reject) => {
      periodModel.create(userId, start_date, end_date, menstrual_days, note, (err, result) => {
        if (err) {
          console.error(err);      
          res.status(401).json({ message: 'Không thành công'});
        }
        res.status(200).json({message: 'Thành công'});
      });
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

const updateMenstrualDays = async () => {
  try {
    const period = await periodModel.getPeriodByMonthAndYear(); 
    const today = new Date(); 
    console.log('tc',today);
    const currentDate= new Date(today);
    console.log('tc',currentDate);
    const updatedMenstrualDaysArray = [];
    for (const cycle of period) {
      console.log('tc',cycle.menstrual_days);
      if (!cycle.end_date ) {
            console.log('tc',cycle.menstrual_days);
            const menstrualDaysArray = cycle.menstrual_days.split(',');
            console.log('tc',cycle.menstrual_days);
            console.log('tc', menstrualDaysArray);
            menstrualDaysArray.push(currentDate.toISOString().slice(0, 10)); 
            console.log('tc', menstrualDaysArray);
            updatedMenstrualDaysArray.push({ cycleId: cycle.id, menstrualDays: menstrualDaysArray });
            console.log("tc");
      }
      else{
        console.log("loi");
      }
    }
    for (const cycleData of updatedMenstrualDaysArray) {
      console.log("tcong", cycleData.menstrualDays);

      try {
        await periodModel.updatePeriodByMonthAndYear(cycleData.cycleId, cycleData.menstrualDays);
        console.log("tcong");
        const period = await periodModel.getPeriodByMonthAndYear();
        console.log("tcong",period);
      } catch (error) {
        console.error('Error updating period:', error);
      }
    }
   
  } catch (error) {
    console.error('Error updating menstrual days: ', error);
  }
};


cron.schedule('26 14 * * *', () => {
  updateMenstrualDays(); 
}, {
  timezone: 'Asia/Ho_Chi_Minh'
});



const getAllPeriod= async (req,res) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

 
    const period= await periodModel.getAllPeriod(userId);
      if(!period){
        res.status(401).json({message:'Không có chu kỳ'});
      }
      res.status(200).json({message:'thành công', period });

};
const getPeriodBydate= async (req,res) => {
  const userId = req.userId; 
  const date=req.query.date;
  const today = new Date(date);
  const month = today.getMonth()+1; 
  const year = today.getFullYear();
  if (!userId) {
    console.log('Unauthorized');
    res.status(401).json({message:'Unauthorized'});
  }
  const period= await periodModel.getPeriodByMonthAndYearId(userId,month,year)
  if(!period){
    res.status(401).json({message:'Không có chu kỳ'});
  }
  res.status(200).json({period});
};
const getmenstruallength = async (req,res) => {
  const userId = req.userId;
  if (!userId) {
    console.log('Unauthorized');
   
  }
  const today = new Date();
  const month = today.getMonth(); 
  const year = today.getFullYear();
  try {
    
    const period = await periodModel.getPeriodByMonthAndYearPre(userId,month,year);
    if (!period || !period[0]) {
      res.status(404).json({ message: 'Không có dữ liệu kỳ kinh trước' });
      return;
    }  
    else{

    const menstrualDaysArray = period[0].menstrual_days.split(',');
    const lengthperiod = menstrualDaysArray.length;

    console.log('Độ dài của chu kỳ kinh nguyệt:', lengthperiod);
    res.status(200).json({ message: 'successfully', lengthperiod});
    }
  } catch (error) {
    console.error('Lỗi:', error.message);
    throw error;
  }
};
const getperiodlength = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    console.log('Unauthorized');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const monthPre = month - 1;

  try {
    const period = await periodModel.getPeriodByMonthAndYearPre(userId, monthPre, year);
    const period1 = await periodModel.getPeriodByMonthAndYearPre(userId, month, year);
    if (!period || !period1 || !period1[0]) {
      res.status(404).json({ message: 'Không có dữ liệu kỳ kinh trước' });
      return;
    }  
    else{
    const endDate1 = new Date(period1[0].end_date);

    const startDate2 = new Date(period[0].start_date);
    const periodLength = Math.abs(startDate2.getTime() - endDate1.getTime());
    const periodLengthDay = Math.ceil(periodLength / (1000 * 3600 * 24));

    console.log('Độ dài chu kỳ kinh trước:', periodLengthDay, 'ngày');
    res.status(200).json({ message: 'Thành công', periodLengthDay });
    }
    
  } catch (error) {
    console.error('Lỗi:', error.message);
    res.status(500).json({ message: 'Lỗi' });
  }
};


const getmenstruallength_current = async (req,res) => {
  const userId = req.userId;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }
  const today = new Date();
  const month = today.getMonth()+1; 
  const year = today.getFullYear();
  try {
    
    const period = await periodModel.getPeriodByMonthAndYearPre(userId,month,year);
    if (!period|| !period[0]) {
      res.status(401).json({ message: 'Không có dữ liệu'});
      
    }
    else{
      const menstrualDaysArray = period[0].menstrual_days.split(',');
    const lengthperiod = menstrualDaysArray.length;

    console.log('Độ dài của chu kỳ kinh nguyệt:', lengthperiod);
    res.status(200).json({ message: 'successfully', lengthperiod});
    }
    
  } catch (error) {
    console.error('Lỗi:', error.message);
    throw error;
  }
};

const updatePeriodByID = async (req,res) => {
  const userId = req.userId;
  const id = req.params.id; 
  const { start_date, end_date, note } = req.body;
  const updatedPeriodData = { start_date, end_date, note };
  
  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized');
  }
  const startDate = new Date(start_date);
  const currentDate = new Date(startDate);
  let menstrual_days = [];
  const endDate = new Date(end_date);
  while (currentDate <= endDate) { 
    menstrual_days.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log(menstrual_days);

  
  return new Promise((resolve, reject) => {
    periodModel.updatePeriodByID(userId, id, menstrual_days, updatedPeriodData, (err, result) => {
      if (err) {
        console.error(err);
        res.status(401).json({ message: 'Không thành công'});
      }
      res.status(200).json({ message: 'Cập nhật thành công'});
     
    });
  });
};





module.exports = {createPeriod,updateMenstrualDays, getAllPeriod,getperiodlength,getmenstruallength,getmenstruallength_current,updatePeriodByID,getPeriodBydate};
