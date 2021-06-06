// todo propper utils usage

import { hashString, readHash, daysInMonth, startDate, updateURL } from '../../utils.js';
import * as utils from '../../utils.js';

const calendar = document.getElementById('calendar');
const month = document.getElementById('month');
const year = document.getElementById('year');
const backmonth = document.getElementById('backmonth');
const forwardmonth = document.getElementById('forwardmonth');
const backyear = document.getElementById('backyear');
const forwardyear = document.getElementById('forwardyear');

let monthIn = 5;
let yearIn = 2021;

backmonth.innerHTML = '&#10094;';
backyear.innerHTML = '<img src="back.png" alt="back" width="32" height="32"/>';

forwardmonth.innerHTML = '&#10095;';
forwardyear.innerHTML = '<img src="forward.png" alt="forward" width="32" height="32"/>';

// Date MM/DD/YYYY/X:  Bullet name
// X is some random identifier
const testData = {
  id_1: {
    type: 'task', // task, event, note
    title: 'Walk Dog',
    date: '2021-05-07T20:00'
  },
  id_2: {
    type: 'task',
    title: 'Feed Dog',
    date: '2021-05-08T20:00'
  },
  id_3: {
    type: 'event',
    title: 'Test',
    date: '2021-05-10T20:00'
  },
  id_4: {
    type: 'event',
    title: 'Eat',
    date: '2021-05-07T20:00'
  },
  id_5: {
    type: 'note',
    title: 'Hi Edmund',
    date: '2021-05-10T20:00'
  },
  id_6: {
    type: 'note',
    title: 'heuhuehue',
    date: '2021-04-28T20:00'
  },
  id_7: {
    type: 'note',
    title: 'heuhuehue2',
    date: '2021-05-01T20:00'
  },
  id_8: {
    type: 'note',
    title: 'mwahahaaha',
    date: '2021-05-30T20:00'
  },
  id_9: {
    type: 'note',
    title: 'mwahahaaha2',
    date: '2021-06-04T20:00'
  },
  id_10: {
    type: 'event',
    title: 'Walk',
    date: '2021-05-07T20:00'
  },
  id_11: {
    type: 'event',
    title: 'Walk2',
    date: '2021-05-07T20:00'
  },
  id_12: {
    type: 'event',
    title: 'Walk3',
    date: '2021-05-07T20:00'
  },
  id_13: {
    type: 'event',
    title: 'Walk4',
    date: '2021-05-07T20:00'
  }

};

backmonth.addEventListener('click', function() {
  monthIn--;
  if (monthIn < 1) {
    monthIn = 12;
    yearIn--;
  }

  resetCalendar();
  const data = getDataLocal(monthIn, yearIn);
  populateCalendar(monthIn, yearIn, data);
  const hashed = generateHash(false);
  updateURL(hashed);
});

backyear.addEventListener('click', function() {
  yearIn--;
  resetCalendar();
  const data = getDataLocal(monthIn, yearIn);
  populateCalendar(monthIn, yearIn, data);
  const hashed = generateHash(false);
  updateURL(hashed);
});

forwardmonth.addEventListener('click', function() {
  monthIn++;
  if (monthIn > 12) {
    monthIn = 1;
    yearIn++;
  }
  resetCalendar();
  const data = getDataLocal(monthIn, yearIn);
  populateCalendar(monthIn, yearIn, data);
  const hashed = generateHash(false);
  updateURL(hashed);
});

forwardyear.addEventListener('click', function() {
  yearIn++;
  resetCalendar();
  const data = getDataLocal(monthIn, yearIn);
  populateCalendar(monthIn, yearIn, data);
  const hashed = generateHash(false);
  updateURL(hashed);
});

// updates local storage if there is nothing in it
function updateLocalStorage() {
  if (localStorage.getItem('bulletIDs') === null) {
    const array = [];
    for (const [key, value] of Object.entries(testData)) {
      localStorage.setItem(key, JSON.stringify(value));
      array.push(key);
    }
    localStorage.setItem('bulletIDs', array);
  }
}

// gets month + - 1 information
function getDataLocal(month, year) {
  const data = {};
  if (localStorage.getItem('bulletIDs') === null) {
    return data;
  }
  const bulletIds = localStorage.getItem('bulletIDs').split(',');
  for (let i = 0; i < bulletIds.length; i++) {
    const item = JSON.parse(localStorage.getItem(bulletIds[i]));
    if (item == null) {
      continue;
    }
    const date = item.date.split('T')[0].split('-');
    if (parseInt(date[0]) === year && parseInt(date[1]) === month) {
      data[bulletIds[i]] = item;
    }
  }
  return data;
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
    if (day === startDate(month, year) && start === false &&
    counter < daysInMonth(month, year) + 1) {
      start = true;
    }
    if (start) {
      const date = document.createElement('td');
      date.setAttribute('id', counter);
      date.innerHTML = counter;
      date.addEventListener('click', function() {
        console.log(date.childNodes[0]);
        const hash = hashString('d', yearIn, monthIn, date.childNodes[0].nodeValue);
        const root = document.URL.split('/')[2];
        const path = 'http://' + root + '/source/frontend/app/page-day/day.html';
        const url = new URL(path);
        url.hash = hash;
        window.location.href = url.href;
      });
      // hover over date cells in calendar
      date.addEventListener('mouseover', function() {
        // date.style.border= '3px solid #333';
        date.style.backgroundColor = 'var(--accent-color1)';
        date.style.cursor = 'pointer';
      });
      date.addEventListener('mouseleave', function() {
        // date.style.border= '1px solid #333';
        date.style.backgroundColor = 'var(--background-color)';
      });
      counter++;
      element.appendChild(date);
    } else {
      const date = document.createElement('td');
      element.appendChild(date);
    }
    if (counter === daysInMonth(month, year) + 1) {
      start = false;
    }
    if (i % 7 === 6) {
      calendar.appendChild(element);
      if (counter === daysInMonth(month, year) + 1) {
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
// TO DO make a filter per month or something
function bulletAppend(bullets) {
  for (const [key, value] of Object.entries(bullets)) {
    const date = value.date.split('T')[0].split('-')[2];
    const temp = document.getElementById(parseInt(date));
    const event = document.createElement('li');
    if (temp.childNodes.length === 1) {
      temp.appendChild(document.createElement('ul'));
    }
    event.innerHTML = value.title;
    if (temp.childNodes[1].childNodes.length < 5) {
      temp.childNodes[1].appendChild(event);
    }
  }
}

function getTasks(bullets) {
  const tasks = [];
  for (const [key, value] of Object.entries(bullets)) {
    if (value.type === 'task' && value.tag === 'monthly') {
      tasks.push(key);
    }
  }
  return tasks;
}

function getNotes(bullets) {
  const notes = [];
  for (const [key, value] of Object.entries(bullets)) {
    if (value.type === 'note' && value.tag === 'monthly') {
      notes.push(key);
    }
  }
  return notes;
}

function generateHash(onload = true) {
  const curr = document.URL;

  if (onload) {
    let month;
    let year;
    if (curr.includes('#')) {
      let date = readHash(curr.split('#')[1]);
      date = date.toISOString().split('T')[0].split('-');
      month = parseInt(date[1]);
      year = parseInt(date[0]);
    } else {
      let date = new Date();
      date = date.toISOString().split('T')[0].split('-');
      month = parseInt(date[1]);
      year = parseInt(date[0]);
    }
    return hashString('m', year, month);
  } else {
    return hashString('m', yearIn, monthIn);
  }
}

const hashed = generateHash();

let date = readHash(hashed);
date = date.toISOString().split('T')[0].split('-');

yearIn = parseInt(date[0]);
monthIn = parseInt(date[1]);

updateURL(hashed);

updateLocalStorage();
const data = getDataLocal(monthIn, yearIn);
resetCalendar();
populateCalendar(monthIn, yearIn, data);

console.log(getTasks(data));
console.log(getNotes(data));
