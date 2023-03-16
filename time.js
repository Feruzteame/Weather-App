let currentTiming = document.getElementById("currentTime");

 // get current Time
function currentTime(){
  const today = new Date();

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayOfWeek = dayNames[today.getDay()];
  const month = monthNames[today.getMonth()];
  const dayOfMonth = today.getDate();
  const year = today.getFullYear();

  currentTiming.innerHTML = (`${dayOfMonth} ${month} ${year}`);
}
currentTime()
 

  
