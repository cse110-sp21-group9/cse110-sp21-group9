import * as utils from '../../utils.js';
import * as globals from '../../globals.js';

const MONTH_PATH = '../page-calendar-monthly/calendar.html';

const COLUMNS = 7;
const ROWS = 6;

/*
* custom element for a mini calander that can have days and weeks selected
* you can bind callbacks for when days and weeks are clicked
* note: in order for call backs to work they must be bound before calling set calendar
*/
function getMonthFromString(mon) {
  const d = Date.parse(mon + '1, 2012');
  if (!isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }
  return -1;
}

function monthYearEqual(date1, date2) {
  return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}

export class MiniCalendar extends HTMLElement {
  constructor() {
    super();
    this.internalDate = null;
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        #calendar{
          border-collapse: collapse;
          width: 100%;
          height: 100%;
          text-align: center;
          font-family: Arial, sans-serif;
        }

        #month{
          font-weight: bold;
          font-size: 24px;
          cursor: pointer;
        }

        .monthButton:hover{
          border: 1px solid black;
        }

        #year{
          font-weight: bold;
          font-size: 24px;
        }

        #backmonth{
          cursor: pointer;
        }

        #forwardmonth{
          cursor: pointer;
        }

        td{
          position: relative;
          z-index: 0;
          width: 14.3%;
        }

        td.day{
          cursor: pointer;
        }

        td.other-month{
          color: grey;
        }

        .day:hover::after{
          background: plum;
        }

        .day.selected::after{
          background: lightpink;
        }

        .day::after{
          position: absolute;
          top: 14.3%;
          left: 14.3%;
          right: 0;
          bottom: 0;
          width: 75%;
          height: 75%;
          border-radius: 10%;
          z-index: -1;
          content: '';
        }
      </style>
      <table id = "calendar">
        <thead>
          <tr class="monthyear">
            <td colspan="1" style="height:50px;"></td>
            <td class="monthButton" id="backmonth"></td>
            <td class="monthButton" id="month" colspan="2"></td>
            <td class="monthButton" id="forwardmonth"></td>
            <td id="year"></td>
          </tr>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody id="calendar-body">
        </tbody>
      </table>
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const backMonth = this.shadowRoot.getElementById('backmonth');
    const forwardMonth = this.shadowRoot.getElementById('forwardmonth');

    const miniCal = this; // scoping hack
    // set up the forward and backward month buttons
    backMonth.innerHTML = '&#10094;';
    forwardMonth.innerHTML = '&#10095;';
    backMonth.addEventListener('click', function() {
      const newDate = new Date(miniCal.internalDate.getFullYear(), miniCal.internalDate.getMonth() - 1, 1);
      const urlDate = utils.readHash(document.URL.split('#')[1]);
      if (monthYearEqual(newDate, urlDate)) { miniCal.setCalendar(urlDate, true); } else { miniCal.setCalendar(newDate, false); }
    });
    forwardMonth.addEventListener('click', function() {
      const newDate = new Date(miniCal.internalDate.getFullYear(), miniCal.internalDate.getMonth() + 1, 1);
      const urlDate = utils.readHash(document.URL.split('#')[1]);
      if (monthYearEqual(newDate, urlDate)) { miniCal.setCalendar(urlDate, true); } else { miniCal.setCalendar(newDate, false); }
    });
  }

  /*
  * @param date = null: a date object that will be used to build the calendar
  *                     if it is left out, then we read off the date from the URL hash
  * @param selectDay = true: if true the day that was passed in by date will start selected
  *
  * note: in order for callbacks to work the callbacks must be bound before calling setCalendar
  */
  setCalendar(date = null, selectDay = true) {
    if (date == null) {
      date = utils.readHash(document.URL.split('#')[1]);
    }
    this.internalDate = date;

    const calendarBody = this.shadowRoot.getElementById('calendar-body');
    const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const monthText = this.shadowRoot.getElementById('month');
    const yearText = this.shadowRoot.getElementById('year');
    let dateCounter = -startDay + 1;

    // first clear the calander
    while (calendarBody.firstChild) { calendarBody.removeChild(calendarBody.firstChild); }

    // write in the month name and year number
    monthText.textContent = globals.MONTH_NAMES_LONG[date.getMonth()];
    yearText.textContent = date.getFullYear();

    // make clicking on the month take you to the month view
    monthText.addEventListener('click', function() {
      const month = getMonthFromString(this.textContent);
      const dateYear = document.querySelector('mini-calendar').shadowRoot.getElementById('year').textContent;
      const hash = utils.hashString('m', dateYear, month);
      // const root = document.URL.split('/')[2];
      // const path = 'http://' + root + MONTH_PATH;
      // const url = new URL(path);
      // window.location.hash = hash;
      window.location.href = MONTH_PATH + '#' + hash;
    });

    // now build new elements
    for (let y = 0; y < ROWS; y++) {
      const weekElement = document.createElement('tr');
      for (let x = 0; x < COLUMNS; x++) {
        const dayElement = document.createElement('td');
        weekElement.appendChild(dayElement);

        const currentDate = new Date(date.getFullYear(), date.getMonth(), dateCounter);

        const miniCal = this;
        dayElement.addEventListener('click', function() {
          miniCal.deselectAll();
          this.classList.add('selected');
          const dateDay = this.textContent;
          const dateMonth = getMonthFromString(miniCal.shadowRoot.getElementById('month').textContent);
          const dateYear = miniCal.shadowRoot.getElementById('year').textContent;
          const hash = utils.hashString('d', dateYear, dateMonth, dateDay);
          // const root = document.URL.split('/')[2];
          // const path = 'http://' + root + DAY_PATH;
          // const url = new URL(path);
          // url.hash = hash;
          // window.location.href = DAY_PATH;
          window.location.hash = hash;
          window.location.reload();
        });

        dayElement.innerHTML = currentDate.getDate();
        dayElement.className = 'day';
        if (currentDate.getMonth() !== date.getMonth()) { dayElement.classList.add('other-month'); }

        if (dateCounter === date.getDate()) {
          if (selectDay) dayElement.classList.add('selected');
        }
        dateCounter++;
      }
      calendarBody.appendChild(weekElement);
    }
  }

  // helper function to deselect all days
  deselectAll() {
    const weeksArr = this.shadowRoot.getElementById('calendar-body').childNodes;

    for (let y = 0; y < ROWS; y++) {
      const weekElement = weeksArr[y];
      const daysArr = weekElement.childNodes;

      for (let x = 0; x < COLUMNS; x++) {
        const dayElement = daysArr[x];
        if (x === 0) {
          dayElement.parentElement.childNodes[0].classList.remove('selected');
          continue;
        }
        dayElement.classList.remove('selected');
      }
    }
  }
}

customElements.define('mini-calendar', MiniCalendar);
