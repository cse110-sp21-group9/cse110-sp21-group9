// this script is for testing the mini calendar

const calDiv = document.getElementById('test');
const miniCal = document.createElement('mini-calendar');

calDiv.appendChild(miniCal);

// miniCal.setCalendar(new Date(), true, false);
miniCal.setCalendar();
console.log(miniCal);
console.log(miniCal.setCalendar);
