/**
 * @jest-environment jsdom
 */
 import * as testUtils from '../testutils.js'

 let counter = testUtils.makeTestCounter(1);


const fs = require('fs');
const path = require('path');
global.$ = require('jquery');
$.fn.modal = jest.fn();
describe('Basic DOM unit tests for day view', () => {
  const currDate = new Date();
  const monthNames = ['January', 'Feburuary', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currMonth = currDate.getMonth();
  let contentHtml;
  beforeAll(() => {
		global.localStorage = new testUtils.LocalStorageMock();
    contentHtml = fs.readFileSync(path.resolve(__dirname, '../../source/frontend/app/page-day/day.html'), 'utf-8');
    document.documentElement.innerHTML = contentHtml;
    require('../../source/frontend/app/page-day/day.js');
    require('../../source/frontend/app/sidebar/sidebar.js');
    require('../../source/backend/crudFunctions.js');
    require('../../source/frontend/utils.js');
		require('../../source/frontend/globals.js');
  });

  // DOM Unit Test 1: Check if day view has correct date
  test(`Test${counter()}: Check if day view has correct date`, () => {
    const monthText = document.getElementById("date"); 
    expect(monthText.innerHTML).toMatch(monthNames[currMonth] + " " + currDate.getDate()); 
  }); 
  // Dom Unit Test 2: Check if day view has correct day of week
  test(`Test${counter()}: Check if day view has correct day of week`, () => {
    const dayText = document.getElementById("week_day"); 
    expect(dayText.innerHTML).toMatch(dayNames[currDate.getDay()]); 
  }); 

  // DOM Unit Test 3: Check if schedule has correct number of child elements
  test(`Test${counter()}: Check if schedule has correct number of child elements`, () => {
    const timeList = document.getElementById("time_list"); 
    expect(timeList.children.length).toBe(24); 
  }); 
	  // DOM Unit Test 4: Check if schedule has correct upper/lower bound
		test(`Test${counter()}: Check if schedule has correct names for time slots`, () => {
			const timeList = document.getElementById("time_list"); 
			expect(timeList.children[0].innerHTML).toMatch('12:00 AM');
			expect(timeList.children[12].innerHTML).toMatch('12:00 PM'); 
			expect(timeList.children[16].innerHTML).toMatch('4:00 PM'); 
			expect(timeList.children[23].innerHTML).toMatch('11:00 PM');  
		}); 
});