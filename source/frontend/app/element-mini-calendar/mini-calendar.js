const calendarBody = document.getElementById('calendar-body');
console.log(calendarBody);
const COLUMNS = 8;
const ROWS = 6;

/*
* custom element for a mini calander that can have days and weeks selected
* you can bind callbacks for when days and weeks are clicked
* note: in order for call backs to work they must be bound before calling set calendar
*/
class MiniCalendar extends HTMLElement {
  constructor() {
    super();
    this.dayCallBack = null;
    this.weekCallBack = null;
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

        td{
          position: relative;
          z-index: 0;
          width: 12.5%;
        }

        td.day{
          cursor: pointer;
        }

        td.week{
          cursor: pointer;
        }

        td.other-month{
          color: grey;
        }

        .week:hover:after{
          background-color: lightseagreen;
        }

        .week.selected::after{
          background: lightblue;
        }

        .week::after{
          position: absolute;
          top: 0;
          left: 0%;
          bottom: 0;
          width: 800%;
          height: 100%;
          border-radius: 10px;
          z-index: -2;
          content: '';
        }

        .day:hover::after{
          background: plum;
        }

        .day.selected::after{
          background: lightpink;
        }

        .day::after{
          position: absolute;
          top: 12.5%;
          left: 12.5%;
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
            <td id="backmonth"></td>
            <td id="month" colspan="7"></td>
            <td id="forwardmonth"></td>
          </tr>
          <tr>
            <th></th>
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
  }

  /*
  * @param date: a date object that will be used to build the calendar
  * @param selectDay = true: if true the day that was ppassed in by date will start selected
  * @param selectWeek = true: if true the week that the day from the date object that was passed in will be selected
  *
  * note: in order for callbacks to work the callbacks must be bound before calling setCalendar
  */
  setCalendar(date, selectDay = true, selectWeek = true) {
    const calendarBody = this.shadowRoot.querySelector('#calendar-body');
    const startDay = new Date(date.getYear() + 1900, date.getMonth(), 1).getDay();
    let dateCounter = -startDay + 1;

    // first clear the calander
    while (calendarBody.firstChild) { calendarBody.removeChild(calendarBody.firstChild); }

    // now build new elements
    for (let y = 0; y < ROWS; y++) {
      const weekElement = document.createElement('tr');
      for (let x = 0; x < COLUMNS; x++) {
        const dayElement = document.createElement('td');
        weekElement.appendChild(dayElement);

        const currentDate = new Date(date.getYear() + 1900, date.getMonth(), dateCounter);

        if (x === 0) {
          dayElement.className = 'week';
          if (this.weekCallBack !== null) dayElement.onclick = () => { this.weekCallBack(currentDate); };
          continue;
        }

        if (this.dayCallBack !== null) dayElement.onclick = () => { this.dayCallBack(currentDate); };

        dayElement.innerHTML = currentDate.getDate();
        dayElement.className = 'day';
        if (currentDate.getMonth() !== date.getMonth()) { dayElement.classList.add('other-month'); }

        if (dateCounter === date.getDate()) {
          if (selectDay) dayElement.classList.add('selected');
          if (selectWeek) weekElement.childNodes[0].classList.add('selected');
        }
        dateCounter++;
      }
      calendarBody.appendChild(weekElement);
    }
  }

  /*
  * takes a function with a single input
  * the input will be a date object and represents the day that was clicked
  * note: if you wish to unbind the day call back you can pass null into this function, and then call setCalendar
  */
  bindDayCallBack(callBack) {
    this.dayCallBack = callBack;
  }

  /*
  * takes a function with a single input
  * the input will be a date object and represents the first day of the week that was clicked
  * note: if you wish to unbind the day call back you can pass null into this function, and then call setCalendar
  */
  bindWeekCallBack(callBack) {
    this.weekCallBack = callBack;
  }
}

customElements.define('mini-calendar', MiniCalendar);
