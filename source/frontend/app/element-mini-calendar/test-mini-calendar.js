// this script is for testing the mini calendar

const calDiv = document.getElementById('test');
const miniCal = document.createElement('mini-calendar');
const backmonth = miniCal.shadowRoot.getElementById('backmonth');
const forwardmonth = miniCal.shadowRoot.getElementById('forwardmonth');

calDiv.appendChild(miniCal);

//miniCal.setCalendar(new Date(), true, false);
miniCal.setCalendar();