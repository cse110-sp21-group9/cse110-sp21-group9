/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Basic unit tests for monthly calendar ', () => {
  const currDate = new Date();
  const monthNames = ['January', 'Feburuary', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  let contentHtml;
  beforeAll(() => {
    contentHtml = fs.readFileSync(path.resolve(__dirname, '../../source/frontend/app/page-calendar-monthly/calendar.html'), 'utf-8');
    document.documentElement.innerHTML = contentHtml;
    require('../../source/frontend/app/page-calendar-monthly/calendar.js');
		require('../../source/frontend/app/page-calendar-monthly/sidebar.js');
		require('../../source/frontend/utils.js');
  });

  // DOM Unit Test 1: Page has correct current month/year
  test('Test1: Page has correct current month/year', () => {
    const month = document.getElementById('month');
    const year = document.getElementById('year');
    expect(month.innerHTML).toMatch(monthNames[currDate.getMonth()]);
    expect(year.innerHTML).toMatch(currDate.getFullYear().toString());
  });

  // DOM Unit Test 2: Current month has correct days of the week 
  test('Test2: Current month has correct days of the week', () => {
    const testDate = new Date(); 
		testDate.setDate(15);
		let testWeekday = testDate.getDay(); 
		let day = document.getElementById('15'); 
		expect(day.parentNode.children[testWeekday].id).toBe('15');

		testDate.setDate(2);
		testWeekday = testDate.getDay(); 
		day = document.getElementById('2'); 
		expect(day.parentNode.children[testWeekday].id).toBe('2');

		testDate.setDate(23);
		testWeekday = testDate.getDay(); 
		day = document.getElementById('23'); 
		expect(day.parentNode.children[testWeekday].id).toBe('23');
  });

  // DOM Unit Test 3: Next month button moves calendar to correct month
  test('Test3: Next month button moves calendar to correct month', () => {
    const forwardMonth = document.getElementById('forwardmonth');
    forwardMonth.click();
    const month = document.getElementById('month');
		currDate.setMonth(currDate.getMonth() + 1)
    expect(month.innerHTML).toMatch(monthNames[currDate.getMonth()]);
  });

  // DOM Unit Test 4: Next month has correct days of the week
	test('Test4: Next month has correct days of the week', () => {
    const testDate = new Date(currDate.getFullYear(), currDate.getMonth());
		testDate.setDate(10);
		let testWeekday = testDate.getDay(); 
		let day = document.getElementById('10'); 
		expect(day.parentNode.children[testWeekday].id).toBe('10');

		testDate.setDate(4);
		testWeekday = testDate.getDay(); 
		day = document.getElementById('4'); 
		expect(day.parentNode.children[testWeekday].id).toBe('4');

		testDate.setDate(28);
		testWeekday = testDate.getDay(); 
		day = document.getElementById('28'); 
		expect(day.parentNode.children[testWeekday].id).toBe('28');
  });

  // DOM Unit Test 5: Previous month button moves calendar to correct month
  test('Test5: Previous month button moves calendar to correct month', () => {
    const backMonth = document.getElementById('backmonth');
    backMonth.click();
    const month = document.getElementById('month');
		currDate.setMonth(currDate.getMonth() - 1);
    expect(month.innerHTML).toMatch(monthNames[currDate.getMonth()]);
  });

  // DOM Unit Test 6: Previous month button in January moves to correct month/year
  test('Test6:Previous month button in January moves to correct month/year (should change to December of last year)', () => {
    // Try to go to December of last year
    const backMonth = document.getElementById('backmonth');
    for (let i = 0; i < currDate.getMonth() + 1; i++) {
      backMonth.click();
    }
    const month = document.getElementById('month');
    const year = document.getElementById('year');
    expect(month.innerHTML).toMatch('December');
    expect(year.innerHTML).toMatch((currDate.getFullYear() - 1).toString());
  });

  // DOM Unit Test 7: December of last year has correct days of the week
	test('Test7: Next month has correct days of the week', () => {
    const testDate = new Date(currDate.getFullYear() - 1, 11);
		testDate.setDate(13);
		let testWeekday = testDate.getDay(); 
		let day = document.getElementById('13'); 
		expect(day.parentNode.children[testWeekday].id).toBe('13');

		testDate.setDate(3);
		testWeekday = testDate.getDay(); 
		day = document.getElementById('3'); 
		expect(day.parentNode.children[testWeekday].id).toBe('3');

		testDate.setDate(26);
		testWeekday = testDate.getDay(); 
		day = document.getElementById('26'); 
		expect(day.parentNode.children[testWeekday].id).toBe('26');
  });
  // DOM Unit Test 8: Next month button in December moves to correct month/year
  test('Test8: Next month button in December moves to correct month/year (should change to January of next year)', () => {
    // Try to go to January of next year
    const forwardMonth = document.getElementById('forwardmonth');
    for (let i = 0; i < 13; i++) {
      forwardMonth.click();
    }
    const month = document.getElementById('month');
    const year = document.getElementById('year');
    expect(month.innerHTML).toMatch('January');
    expect(year.innerHTML).toMatch((currDate.getFullYear() + 1).toString());
  });
  // DOM Unit Test 8: Check event listener for month selector
  // DOM Unit Test 9: Check event listener for each week?
  // DOM Unit Test 10: Check event listener for each day?
  // DOM Unit Test 11: Check event listener for add new bullet
  // Dom Unit Test 12: Check event listener for each bullet

  /*
  beforeAll(async () => {
    contentHtml = fs.readFileSync(path.resolve(__dirname, "../source/frontend/app/page-calendar/calendar.html"), 'utf-8');
    await page.setContent(contentHtml, {waitUntil: "domcontentloaded"});
    //await page.addScriptTag({path: "source/frontend/app/page-calendar/calendar.js"});
    //await page.addScriptTag({path: "source/frontend/app/page-calendar/sidebar.js"});
    //await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    await page.waitForTimeout(500);
  });

  // DOM Unit Test 1: Check for correct current month/year
  test("Test1: Calendar has correct current month/year", async () => {
    const monthText = await page.$eval('#month', (heading) => {
      return heading.innerHTML;
    });
    expect(monthText).toMatch('May');
  });
  */
});
