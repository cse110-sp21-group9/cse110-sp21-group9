const calendar = document.getElementById('calendar');
const month = document.getElementById('month');
const year = document.getElementById('year');
const backmonth = document.getElementById('backmonth');
const forwardmonth = document.getElementById('forwardmonth');
const backyear = document.getElementById('backyear');
const forwardyear = document.getElementById('forwardyear');

let yearIn = 2021;
let monthIn = 5;

const monthNames = {
  1: 'January',
  2: 'Feburuary',
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

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

backmonth.innerHTML = '<img src="back.png" alt="back" width="32" height="32"/>';
backyear.innerHTML = '<img src="back.png" alt="back" width="32" height="32"/>';

forwardmonth.innerHTML = '<img src="forward.png" alt="forward" width="32" height="32"/>';
forwardyear.innerHTML = '<img src="forward.png" alt="forward" width="32" height="32"/>';

// Date MM/DD/YYYY/X:  Bullet name
// X is some random identifier
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
  }
};

backmonth.addEventListener('click', function() {
  monthIn--;
  if (monthIn < 1) {
    monthIn = 12;
    yearIn--;
  }
  resetCalendar();
  var data = getDataLocal(monthIn, yearIn);
  populateCalendar(monthIn, yearIn, data);
});

backyear.addEventListener('click', function() {
  yearIn--;
  resetCalendar();
  var data = getDataLocal(monthIn, yearIn);
  populateCalendar(monthIn, yearIn, data);
});

forwardmonth.addEventListener('click', function() {
  monthIn++;
  if (monthIn > 12) {
    monthIn = 1;
    yearIn++;
  }
  resetCalendar();
  var data = getDataLocal(monthIn, yearIn);
  populateCalendar(monthIn, yearIn, data);
});

forwardyear.addEventListener('click', function() {
  yearIn++;
  resetCalendar();
  var data = getDataLocal(monthIn, yearIn);
  populateCalendar(monthIn, yearIn, data);
});

// updates local storage if there is nothing in it
function updateLocalStorage(){
  if (localStorage.getItem("bulletIDs") === null) {
    let array = [];
    for (const [key, value] of Object.entries(testData)) {
      localStorage.setItem(key, JSON.stringify(value));
      array.push(key);
    }
    localStorage.setItem("bulletIDs", array);
  }
}

// gets month + - 1 information
function getDataLocal(month, year){
  let data = {};
  if (localStorage.getItem("bulletIDs") === null) {
    return data;
  }
  let bulletIds = localStorage.getItem("bulletIDs").split(",");
  for(var i=0; i< bulletIds.length; i++){
    let item = JSON.parse(localStorage.getItem(bulletIds[i]));
   
    let date = item['date'].split("/");
    if(parseInt(date[2])==year && parseInt(date[0])==month){
      data[bulletIds[i]] = item;
    }
  }
  return data;
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function startDate(month, year) {
  const day = new Date(year, month - 1, 1); // 0 is sunday, 1 is monday, ..., 6 is saturday
  return day.getDay();
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
    let day = i % 7;
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
      });
      counter++;
      element.appendChild(date);
    } else {
      let date = document.createElement('td');
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
  let element = document.createElement('tr');
  while (calendar.firstChild) {
    calendar.removeChild(calendar.firstChild);
  }
  week.forEach(function(e) {
    let date = document.createElement('th');
    date.innerHTML = e;
    element.appendChild(date);
  });
  calendar.append(element);
  year.innerHTML = yearIn;
  month.innerHTML = monthNames[monthIn];
}

// for a specific month only
// TO DO make a filter per month or something
function bulletAppend(bullets) {
  for (const [key, value] of Object.entries(bullets)) {
    
    let date = value['date'].split('/')[1];
    let temp = document.getElementById(parseInt(date));
    let event = document.createElement('li');
    if (temp.childNodes.length === 1) {
      temp.appendChild(document.createElement('ul'));
    }
    event.innerHTML = value['title'];
    temp.childNodes[1].appendChild(event);
  }
}

// updateLocalStorage();
var data = getDataLocal(monthIn, yearIn);
resetCalendar();
populateCalendar(monthIn, yearIn, data);
