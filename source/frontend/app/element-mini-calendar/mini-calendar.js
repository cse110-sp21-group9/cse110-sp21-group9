// const calendarBody = document.getElementById('calendar-body');
// console.log(calendarBody);
const COLUMNS = 8;
const ROWS = 6;

/*
* custom element for a mini calander that can have days and weeks selected
* you can bind callbacks for when days and weeks are clicked
* note: in order for call backs to work they must be bound before calling set calendar
*/
function getMonthFromString(mon) {

   var d = Date.parse(mon + "1, 2012");
   if(!isNaN(d)){
      return new Date(d).getMonth() + 1;
   }
   return -1;
}

class MiniCalendar extends HTMLElement {
  constructor() {
    super();
    // this.dayCallBack = null;
    // this.weekCallBack = null;
    this.date = null;
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

        #month,
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
            <td colspan="2" style="height:50px;"></td>
            <td id="backmonth"></td>
            <td id="month" colspan="2"></td>
            <td id="forwardmonth"></td>
            <td></td>
            <td id="year"></td>
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

    const backMonth = this.shadowRoot.getElementById('backmonth');
    const forwardMonth = this.shadowRoot.getElementById('forwardmonth');    

    // set up the forward and backward month buttons
    backMonth.innerHTML = '&#10094;';
    forwardMonth.innerHTML = '&#10095;';
    backMonth.addEventListener('click', function() {
      const miniCal = document.querySelector('mini-calendar');
      const newDate = new Date(miniCal.date.getYear() + 1900, miniCal.date.getMonth() - 1, 1);
      miniCal.setCalendar(newDate, false, false);
    });
    forwardMonth.addEventListener('click', function() {
      const miniCal = document.querySelector('mini-calendar');
      const newDate = new Date(miniCal.date.getYear() + 1900, miniCal.date.getMonth() + 1, 1);
      miniCal.setCalendar(newDate, false, false);
    });

  }

  /*
  * @param date: a date object that will be used to build the calendar
  * @param selectDay = true: if true the day that was passed in by date will start selected
  * @param selectWeek = true: if true the week that the day from the date object that was passed in will be selected
  *
  * note: in order for callbacks to work the callbacks must be bound before calling setCalendar
  */
  setCalendar(date, selectDay = true, selectWeek = true) {

    // this keeps track of the current date that is used to build the calendar
    this.date = date;

    const calendarBody = this.shadowRoot.getElementById('calendar-body');
    const startDay = new Date(date.getYear() + 1900, date.getMonth(), 1).getDay();
    const monthText = this.shadowRoot.getElementById('month');
    const yearText = this.shadowRoot.getElementById('year');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dateCounter = -startDay + 1;

    // first clear the calander
    while (calendarBody.firstChild) { calendarBody.removeChild(calendarBody.firstChild); }

    // write in the month name and year number
    monthText.textContent = months[date.getMonth()];
    yearText.textContent = date.getYear() + 1900;

    // now build new elements
    for (let y = 0; y < ROWS; y++) {
      const weekElement = document.createElement('tr');
      for (let x = 0; x < COLUMNS; x++) {
        const dayElement = document.createElement('td');
        weekElement.appendChild(dayElement);

        const currentDate = new Date(date.getYear() + 1900, date.getMonth(), dateCounter);

        if (x === 0) {
          dayElement.className = 'week';
          // if (this.weekCallBack !== null) dayElement.onclick = () => { this.weekCallBack(currentDate); };
          dayElement.addEventListener('click', function() {
            if (!this.parentElement.childNodes[0].classList.contains('selected')) {
              // we have to deselect all other weeks and days
              document.querySelector('mini-calendar').deselectAllExcept();
              this.parentElement.childNodes[0].classList.add('selected');
            }
          });

          continue;
        }

        // if (this.dayCallBack !== null) dayElement.onclick = () => { this.dayCallBack(currentDate); };

        dayElement.addEventListener('click', function() {
          this.classList.add('selected');
          console.log(this.textContent);
          let dateDay = this.textContent
          let dateMonth = document.querySelector("mini-calendar").shadowRoot.getElementById("month");
          dateMonth = dateMonth.textContent;
          let dateYear = document.querySelector("mini-calendar").shadowRoot.getElementById("year");
          dateYear = dateYear.textContent
          dateMonth = getMonthFromString(dateMonth);
          let routStr = "#d-" + dateYear + "-" + dateMonth + "-" + dateDay;
          const currURL = new URL(document.URL);
          document.location.href = currURL + routStr;
        });

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

  // helper function to deselect all weeks and days
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

  // helper function to deselect all weeks and days
  deselectAllExcept(row) {
    const weeksArr = this.shadowRoot.getElementById('calendar-body').childNodes;
  
    for (let y = 0; y < ROWS; y++) {
      if (y === row) continue;

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

  // the two below functions to add callbacks when clicking on days or weeks are likely unnecessary
  // if we need them then we can uncomment them and also uncomment lines 138 and 142

  /*
  * takes a function with a single input
  * the input will be a date object and represents the day that was clicked
  * note: if you wish to unbind the day call back you can pass null into this function, and then call setCalendar
  *
  * bindDayCallBack(callBack) {
  *   this.dayCallBack = callBack;
  * }
  *
  *
  * takes a function with a single input
  * the input will be a date object and represents the first day of the week that was clicked
  * note: if you wish to unbind the day call back you can pass null into this function, and then call setCalendar
  *
  * bindWeekCallBack(callBack) {
  *   this.weekCallBack = callBack;
  * }
  */


}

customElements.define('mini-calendar', MiniCalendar);

