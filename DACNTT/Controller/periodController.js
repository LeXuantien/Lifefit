
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
  if(startDate.getMonth()< new Date().getMonth()){
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

    for (const cycle of period) {
      if (!cycle.end_date && !cycle.menstrual_days.includes(today.toISOString().slice(0, 10))) {
        const menstrualDaysArray = cycle.menstrual_days.split(',');
        menstrualDaysArray.push(today.toISOString().slice(0, 10));
        await periodModel.updatePeriodByMonthAndYear( menstrualDaysArray);
      }
    }
  } catch (error) {
    console.error('Error updating menstrual days: ', error);
  }
};


cron.schedule('40 0 * * *', () => {
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
const updatePeriodByID = async (req) => {
  const userId = req.userId;
  const id = req.params.id; 
  const { start_date, end_date, note } = req.body;
  const updatedPeriodData = { start_date, end_date, note };
  
  // Check if user is authenticated
  if (!userId) {
    console.log('Unauthorized: ');
    throw new Error('Unauthorized');
  }

  // Convert start_date and end_date to Date objects
  const startDate = new Date(start_date);
  const currentDate = new Date(startDate);
  let menstrual_days = [];
  const endDate = new Date(end_date);

  // Generate menstrual days between start_date and end_date
  while (currentDate <= endDate) { 
    menstrual_days.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log(menstrual_days);

  // Call the model function to update the period by ID
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



module.exports = {createPeriod,updateMenstrualDays, getAllPeriod,updatePeriodByID};
