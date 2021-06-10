import * as crud from '../../../backend/crudFunctions.js';
import * as utils from '../../utils.js';

const DAY_PATH = '../page-day/day.html';

const calendar = document.getElementById('calendar');
const month = document.getElementById('month');
const year = document.getElementById('year');
const backmonth = document.getElementById('backmonth');
const forwardmonth = document.getElementById('forwardmonth');
const filter = document.getElementById('filter');
const today = document.getElementById('today');

let monthIn = 6;
let yearIn = 2021;
let onlyBuls = 'All Events';

backmonth.innerHTML = '&#10094;';

forwardmonth.innerHTML = '&#10095;';

window.addEventListener("hashchange", function(){
  const hashed = generateHash();

  let date = utils.readHash(hashed);
  date = date.toISOString().split('T')[0].split('-');

  yearIn = parseInt(date[0]);
  monthIn = parseInt(date[1]);

  var start = new Date(yearIn, monthIn-1);
  var end = new Date(yearIn,monthIn);

  var data = onlyThese(start, end);

  resetCalendar();
  populateCalendar(monthIn, yearIn, data);
});

backmonth.addEventListener('click', function() {
  monthIn--;
  if (monthIn < 1) {
    monthIn = 12;
    yearIn--;
  }

  resetCalendar();
  const start = new Date(yearIn, monthIn - 1);
  const end = new Date(yearIn, monthIn);

  const data = onlyThese(start, end);
  populateCalendar(monthIn, yearIn, data);
  const hashed = generateHash(false);
  utils.updateURL(hashed);
});

forwardmonth.addEventListener('click', function() {
  monthIn++;
  if (monthIn > 12) {
    monthIn = 1;
    yearIn++;
  }
  resetCalendar();
  const start = new Date(yearIn, monthIn - 1);
  const end = new Date(yearIn, monthIn);

  const data = onlyThese(start, end);
  populateCalendar(monthIn, yearIn, data);
  const hashed = generateHash(false);
  utils.updateURL(hashed);
});

filter.addEventListener('change', (e) => {
  onlyBuls = e.target.value;

  resetCalendar();
  const start = new Date(yearIn, monthIn - 1);
  const end = new Date(yearIn, monthIn);

  const data = onlyThese(start, end);
  populateCalendar(monthIn, yearIn, data);
});

filter.addEventListener('mouseover', function() {
  filter.style.cursor = 'pointer';
});

today.addEventListener('click', function() {
  const checker = new Date();
  monthIn = checker.getMonth() + 1;
  yearIn = checker.getFullYear();

  resetCalendar();
  const start = new Date(yearIn, monthIn - 1);
  const end = new Date(yearIn, monthIn);

  const data = onlyThese(start, end);
  populateCalendar(monthIn, yearIn, data);
});

filter.addEventListener('mouseover', function() {
  filter.style.cursor = 'pointer';
});

today.addEventListener('click', function() {
  const checker = new Date();
  monthIn = checker.getMonth() + 1;
  yearIn = checker.getFullYear();

  resetCalendar();
  const start = new Date(yearIn, monthIn - 1);
  const end = new Date(yearIn, monthIn);

  const data = onlyThese(start, end);
  populateCalendar(monthIn, yearIn, data);
  const hashed = generateHash(false);
  utils.updateURL(hashed);
});

function onlyThese(start, end) {
  const type = onlyBuls;
  if (type === 'Task') {
    return crud.getTaskBulletsByDateRange(start, end);
  } else if (type === 'Event') {
    return crud.getEventBulletsByDateRange(start, end);
  } else if (type === 'Note') {
    return crud.getNoteBulletsByDateRange(start, end);
  } else {
    return crud.getBulletsByDateRange(start, end);
  }
}

// populates calender with all of the days of the associated month and year
// adds click ability to each date
function populateCalendar(month, year, data) {
  let element;
  let i;
  let start = false;
  let counter = 1;
  for (i = 0; i < 42; i++) {
    if (i % 7 === 0) {
      element = document.createElement('tr');
    }
    const day = i % 7;
    if (day === utils.startDate(month, year) && start === false &&
      counter < utils.daysInMonth(month, year) + 1) {
      start = true;
    }
    if (start) {
      const checker = new Date();
      const monthC = checker.getMonth() + 1;
      const yearC = checker.getFullYear();
      const dayC = checker.getDate();

      const date = document.createElement('td');
      date.setAttribute('id', counter);

      if (monthC === monthIn && yearIn === yearC && dayC === counter) {
        date.classList.add('today');
      }

      if (date.classList[0] === 'today') {
        date.style.backgroundColor = 'rgba(255,214,10,0.5)';
      }

      date.innerHTML = counter;
      date.addEventListener('click', function() {
        const hash = utils.hashString('d', yearIn, monthIn, date.childNodes[0].nodeValue);
        // const root = document.URL.split('/')[2];
        // const path = 'http://' + root + DAY_PATH;
        // const url = new URL(path);
        // window.location.hash = hash;
        window.location.href = DAY_PATH + '#' + hash;
      });
      // hover over date cells in calendar
      date.addEventListener('mouseover', function() {
        // date.style.border= '3px solid #333';
        date.style.backgroundColor = 'var(--accent-color1)';
        date.style.cursor = 'pointer';
      });
      date.addEventListener('mouseleave', function() {
        // date.style.border= '1px solid #333';
        if (date.classList[0] === 'today') {
          date.style.backgroundColor = 'rgba(255,214,10,0.5)';
        } else {
          date.style.backgroundColor = 'var(--background-color)';
        }
      });
      counter++;
      element.appendChild(date);
    } else {
      const date = document.createElement('td');
      element.appendChild(date);
    }
    if (counter === utils.daysInMonth(month, year) + 1) {
      start = false;
    }
    if (i % 7 === 6) {
      calendar.appendChild(element);
      if (counter === utils.daysInMonth(month, year) + 1) {
        break;
      }
    }
  }
  bulletAppend(data);
}

// resets calender and inserts header of days of the week
function resetCalendar() {
  const element = document.createElement('tr');
  while (calendar.firstChild) {
    calendar.removeChild(calendar.firstChild);
  }
  utils.WEEK_NAMES_SHORT.forEach(function(e) {
    const date = document.createElement('th');
    date.innerHTML = e;
    element.appendChild(date);
  });
  calendar.append(element);
  year.innerHTML = yearIn;
  month.innerHTML = "<div id='monthTitle'><b>" + utils.MONTH_NAMES_LONG[monthIn] + '</b></div>' + '<div id=yearTitle>' + yearIn + '</div>';
}

// for a specific month only
function bulletAppend(bullets) {
  for (const temp of bullets) {
    const date = temp.date.getDate();
    const curr = document.getElementById(date);
    const event = document.createElement('li');
    if (curr.childNodes.length === 1) {
      curr.appendChild(document.createElement('ul'));
    }
    // const chars = 10 - Math.max(0, Math.floor((1300 - window.screen.width) / 80) + 1); // to calculate number of characters to display

    event.innerHTML = temp.title.substring(0,Math.min(temp.title.length, chars));
    if (curr.childNodes[1].childNodes.length < 4) {
      curr.childNodes[1].appendChild(event);
    }
  }
}

function generateHash(onload = true) {
  const curr = document.URL;

  if (onload) {
    let month;
    let year;
    if (curr.includes('#') && curr.split('#')[1] !== '') {
      const date = utils.readHash(curr.split('#')[1]);
      month = date.getMonth() + 1;
      year = date.getFullYear();
    } else {
      const date = new Date();
      month = date.getMonth() + 1;
      year = date.getFullYear();
    }
    return utils.hashString('m', year, month);
  } else {
    return utils.hashString('m', yearIn, monthIn);
  }
}

window.addEventListener('pageshow', () => {
  filter.value = 'All Bullets';
});

crud.initCrudRuntime();
const hashed = generateHash();

const date = utils.readHash(hashed);
monthIn = date.getMonth() + 1;
yearIn = date.getFullYear();

utils.updateURL(hashed);

const start = new Date(yearIn, monthIn - 1);
const end = new Date(yearIn, monthIn);

const data = onlyThese(start, end);
resetCalendar();
populateCalendar(monthIn, yearIn, data);
