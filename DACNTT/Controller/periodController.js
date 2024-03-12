
const periodModel = require('../Model/periodModel');
const cron = require('node-cron');
const createPeriod = async (req) => {
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
          reject(new Error('Internal Server Error: ' + err.message));
        }
        resolve('successfully');
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



const getAllPeriod= async (req) => {
  const userId = req.userId; 
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized ');
  }

  return new Promise((resolve, reject) => {
    periodModel.getAllPeriod(userId, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Internal Server Error: ' + err.message));
      }
      resolve(result);
    });
  });
};
const getmenstruallength = async (req,res) => {
  const userId = req.userId;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }
  const today = new Date();
  const month = today.getMonth(); 
  const year = today.getFullYear();
  try {
    
    const period = await periodModel.getPeriodByMonthAndYearPre(userId,month,year);
    if (!period) {
      throw new Error('Không có dữ liệu');
    }

    const menstrualDaysArray = period[0].menstrual_days.split(',');
    const lengthperiod = menstrualDaysArray.length;

    console.log('Độ dài của chu kỳ kinh nguyệt:', lengthperiod);
    res.status(200).json({ message: 'successfully', lengthperiod});
  } catch (error) {
    console.error('Lỗi:', error.message);
    throw error;
  }
};
const getperiodlength = async (req,res) => {
  const userId = req.userId;
  if (!userId) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }
  const today = new Date();
  const month = today.getMonth(); 
  const year = today.getFullYear();
  const monthPre=month-1;
  try {
    const period = await periodModel.getPeriodByMonthAndYearPre(userId,monthPre,year);
    console.log(period);

    if (!period ) {
      console.log('K có dữ liệu kỳ kinh trước');
    }
    else{
      const period1 = await periodModel.getPeriodByMonthAndYearPre(userId,month,year);
      console.log(period1);
      if(!period1 ){
        console.log('K có dữ liệu kỳ kinh trước');
      }
      
      else{
          const date1= new Date(period1[0].end_date);
          console.log(period1[0].end_date);
          console.log(period[0].start_date);
          const date2 =new Date(period[0].start_date);
          const lenghtPeriod = Math.abs(date2.getTime() - date1.getTime());
          const lenghtPeriodDay = Math.ceil(lenghtPeriod  / (1000 * 3600 * 24)); 

          console.log('Độ dài chu kỳ kinh trước:', lenghtPeriodDay, 'ngày');
          res.status(200).json({ message: 'successfully', lenghtPeriodDay});
        }
    }
  } catch (error) {
    console.error('Lỗi:', error.message);
    throw error;
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
    if (!period) {
      throw new Error('Không có dữ liệu');
    }

    const menstrualDaysArray = period[0].menstrual_days.split(',');
    const lengthperiod = menstrualDaysArray.length;

    console.log('Độ dài của chu kỳ kinh nguyệt:', lengthperiod);
    res.status(200).json({ message: 'successfully', lengthperiod});
  } catch (error) {
    console.error('Lỗi:', error.message);
    throw error;
  }
};

const updatePeriodByID = async (req) => {
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
        reject(new Error('Internal Server Error: ' + err.message));
      }

      console.log('Cập nhật thành công');
      resolve('Cập nhật thành công');
    });
  });
};



module.exports = {createPeriod,updateMenstrualDays, getAllPeriod,getperiodlength,getmenstruallength,getmenstruallength_current,updatePeriodByID};
