const calendarBody = document.getElementById('calendar-body');

const COLUMNS = 8;
const ROWS = 6;

const today = new Date();
const startDay = new Date(today.getYear() + 1900, today.getMonth(), 1).getDay(); ;
let dateCounter = -startDay + 1;

for (let y = 0; y < ROWS; y++) {
  const weekElement = document.createElement('tr');
  for (let x = 0; x < COLUMNS; x++) {
    const dayElement = document.createElement('td');
    weekElement.appendChild(dayElement);

    if (x === 0) {
      dayElement.className = 'week';
      continue;
    }

    const date = new Date(today.getYear() + 1900, today.getMonth(), dateCounter);

    dayElement.innerHTML = date.getDate();
    dayElement.className = 'day';
    if (date.getMonth() !== today.getMonth()) { dayElement.classList.add('other-month'); }

    if (dateCounter === today.getDate()) {
      dayElement.classList.add('selected');
      weekElement.childNodes[0].classList.add('selected');
    }
    dateCounter++;
  }
  calendarBody.appendChild(weekElement);
}
