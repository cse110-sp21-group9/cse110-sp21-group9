const calendar = document.getElementById('weeklycalendar');
const month = document.getElementById('month');
const week = document.getElementById('week');
const backmonth = document.getElementById('backmonth');
const forwardmonth = document.getElementById('forwardmonth');
const backweek = document.getElementById('backweek');
const forwardweek = document.getElementById('forwardweek');

let yearIn = 2021;
let monthIn = 5;
let dayIn = 1;

const monthNames = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};
const weekList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

backmonth.innerHTML = '<img src= "icons/back.png" alt="back" width="32" height="32"/>';
backweek.innerHTML = '<img src="icons/back.png" alt="back" width="32" height="32"/>';

forwardmonth.innerHTML = '<img src="icons/forward.png" alt="forward" width="32" height="32"/>';
forwardweek.innerHTML = '<img src="icons/forward.png" alt="forward" width="32" height="32"/>';

backmonth.addEventListener('click', function() {
  monthIn--;
  if (monthIn < 1) {
    monthIn = 12;
    yearIn--;
  }
  const data = getDataLocal(monthIn, yearIn);
  resetCalendar(monthIn, yearIn, dayIn);
  populateWeek(monthIn, yearIn, dayIn, data);
});

backweek.addEventListener('click', function() {
  if (dayIn - 7 < 1) {
    dayIn = dayIn - 7 + daysInMonth(yearIn, monthIn);
    monthIn--;
    if (monthIn < 1) {
      monthIn = 12;
      yearIn--;
    }
  } else {
    dayIn = dayIn - 7;
  }
  const data = getDataLocal(monthIn, yearIn);
  resetCalendar(monthIn, yearIn, dayIn);
  populateWeek(monthIn, yearIn, dayIn, data);
});

forwardmonth.addEventListener('click', function() {
  monthIn++;
  if (monthIn > 12) {
    monthIn = 1;
    yearIn++;
  }
  const data = getDataLocal(monthIn, yearIn);
  resetCalendar(monthIn, yearIn, dayIn);
  populateWeek(monthIn, yearIn, dayIn, data);
});

forwardweek.addEventListener('click', function() {
  if (dayIn + 7 > daysInMonth(yearIn, monthIn)) {
    dayIn = dayIn + 7 - daysInMonth(yearIn, monthIn);
    monthIn++;
    if (monthIn > 12) {
      monthIn = 1;
      yearIn++;
    }
  } else {
    dayIn = dayIn + 7;
  }
  const data = getDataLocal(monthIn, yearIn);
  resetCalendar(monthIn, yearIn, dayIn);
  populateWeek(monthIn, yearIn, dayIn, data);
});

const testData = {
  id_1: {
    type: 'task', // task, event, note
    title: 'Walk Dog',
    date: '05/07/2021'
  },
  id_2: {
    type: 'task',
    title: 'Feed Dog',
    date: '05/08/2021'
  },
  id_3: {
    type: 'event',
    title: 'Test',
    date: '05/10/2021'
  },
  id_4: {
    type: 'event',
    title: 'Eat',
    date: '05/07/2021'
  },
  id_5: {
    type: 'note',
    title: 'Hi Edmund',
    date: '05/10/2021'
  },
  id_6: {
    type: 'note',
    title: 'heuhuehue',
    date: '04/28/2021'
  },
  id_7: {
    type: 'note',
    title: 'heuhuehue2',
    date: '05/01/2021'
  },
  id_8: {
    type: 'note',
    title: 'mwahahaaha',
    date: '05/30/2021'
  },
  id_9: {
    type: 'note',
    title: 'mwahahaaha2',
    date: '06/04/2021'
  },
  id_10: {
    type: 'note',
    title: 'break',
    date: '12/31/2020'
  }
};

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

    const date = item.date.split('/');
    if (parseInt(date[2]) === year && (parseInt(date[0]) >= month - 1 && parseInt(date[0]) <= month + 1)) {
      data[bulletIds[i]] = item;
    }
  }
  return data;
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

// return date of starting and ending for week
function startEndWeek(month, year, day) {
  let temp = 0;
  let dayWeek = new Date(year, month - 1, day); // 0 is sunday, 1 is monday, ..., 6 is saturday
  dayWeek = dayWeek.getDay();
  if (day - dayWeek < 0) { // start from prev month
    if (month - 1 < 1) {
      temp = daysInMonth(12, year);
      return [temp + day - dayWeek, 12, 6 - dayWeek + day, month];
    } else {
      temp = daysInMonth(month - 1, year);
      return [temp + day - dayWeek, month - 1, 6 - dayWeek + day, month];
    }
  } else if (day - dayWeek + 6 > daysInMonth(month, year)) { // end in next month
    temp = daysInMonth(month, year);
    if (month + 1 > 12) {
      return [day - dayWeek, month, 6 - (temp - (day - dayWeek)), 1];
    } else {
      return [day - dayWeek, month, 6 - (temp - (day - dayWeek)), month + 1];
    }
  } else { // in month
    return [day - dayWeek, month, day - dayWeek + 6, month];
  }
}

// limits is 4 tuple of start of week to end of week
function weekEvents(limits, bullets) {
  const list = [];
  for (const [key, value] of Object.entries(bullets)) {
    const currDay = value.date.split('/');
    if (limits[1] === limits[3] && parseInt(currDay[0]) === limits[1]) { // in month
      if (parseInt(currDay[1]) >= limits[0] && parseInt(currDay[1]) <= limits[2]) {
        list.push(key);
      }
    } else if ((parseInt(currDay[0]) === limits[1] && parseInt(currDay[1]) >= limits[0]) ||
      (parseInt(currDay[0]) === limits[3] && parseInt(currDay[1]) <= limits[2])) {
      // start from prev month
      list.push(key);
    } else if ((parseInt(currDay[0]) === limits[1] && parseInt(currDay[1]) >= limits[0]) ||
      (parseInt(currDay[0]) === limits[3] && parseInt(currDay[1]) <= limits[2])) {
      // end in next month
      list.push(key);
    }
  }
  return list;
}

function resetCalendar(m, y, d) {
  const element = document.createElement('tr');
  element.setAttribute('id', 'weekdaysrow');
  while (calendar.firstChild) {
    calendar.removeChild(calendar.firstChild);
  }

  const bounds = startEndWeek(m, y, d);

  let i;
  if (bounds[0] === bounds[2]) {
    for (i = 0; i < weekList.length; i++) {
      const number = bounds[1] + '/' + (bounds[0] + i);
      const date = document.createElement('td');
      date.setAttribute('id', number);
      date.innerHTML = number;
      element.appendChild(date);
    }
  } else {
    for (i = 0; i < weekList.length; i++) {
      const temp = bounds[0] + i;
      if (temp > daysInMonth(bounds[1], y)) {
        const number = bounds[3] + '/' + (bounds[2] - 6 + i);
        const date = document.createElement('td');
        date.setAttribute('id', number);
        date.innerHTML = number;
        element.appendChild(date);
      } else {
        const number = bounds[1] + '/' + temp;
        const date = document.createElement('td');
        date.setAttribute('id', number);
        date.innerHTML = number;
        element.appendChild(date);
      }
    }
  }
  calendar.append(element);

  week.innerHTML = 'Week of ' + monthNames[m] + ' ' + d + ', ' + y;
  month.innerHTML = monthNames[m];
}

function populateWeek(month, year, day, bullets) {
  const bounds = startEndWeek(month, year, day);
  const events = weekEvents(bounds, bullets);
  events.forEach(function(e) {
    const details = bullets[e];
    const currDay = details.date.split('/');
    const dayofWeek = parseInt(currDay[0]) + '/' + parseInt(currDay[1]);
    const temp = document.getElementById(dayofWeek);
    const event = document.createElement('li');
    if (temp.childNodes.length === 1) {
      temp.appendChild(document.createElement('ul'));
    } if (bullets[e].type === 'note') {
      event.style.listStyleImage = 'url("icons/note.ico")';
    } else if (bullets[e].type === 'event') {
      event.style.listStyleImage = 'url("icons/event_empty.ico")';
      event.addEventListener('click', function() {
        console.log('test event, this = ', this);
        console.log('this.style.listStyleImage = ', this.style.listStyleImage);
        if (this.style.listStyleImage === 'url("icons/event_empty.ico")') {
          this.style.listStyleImage = 'url("icons/event_checked.ico")';
        } else {
          this.style.listStyleImage = 'url("icons/event_empty.ico")';
        }
      });
    } else if (bullets[e].type === 'task') {
      event.style.listStyleImage = 'url("icons/task_empty.ico")';
      event.addEventListener('click', function() {
        console.log('test task');
        if (this.style.listStyleImage === 'url("icons/task_empty.ico")') {
          this.style.listStyleImage = "url('icons/task_checked.ico')";
        } else {
          this.style.listStyleImage = "url('icons/task_empty.ico')";
        }
      });
    }
    event.innerHTML = details.title;
    temp.childNodes[1].appendChild(event);
  });
}

yearIn = 2021;
monthIn = 5;
dayIn = 5;
/*
console.log(temp);
console.log(weekEvents(temp,testData));
*/
// updateLocalStorage();
const data = getDataLocal(monthIn, yearIn);
resetCalendar(monthIn, yearIn, dayIn);
populateWeek(monthIn, yearIn, dayIn, data);
