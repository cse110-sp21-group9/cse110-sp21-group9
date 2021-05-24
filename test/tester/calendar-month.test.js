/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Basic unit tests for monthly calendar ', () => {
  const currDate = new Date();
  const currMonth = currDate.getMonth();
  const currYear = currDate.getFullYear();
  const monthNames = ["January", "Feburuary", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  let contentHtml;
  beforeAll(() => {
    contentHtml = fs.readFileSync(path.resolve(__dirname, "../../source/frontend/app/page-calendar-monthly/calendar.html"), 'utf-8');
    document.documentElement.innerHTML = contentHtml;
    require('../../source/frontend/app/page-calendar-monthly/calendar.js');
    require('../../source/frontend/app/page-calendar-monthly/sidebar.js');

  });

  // DOM Unit Test 1: Page has correct current month/year
  test("Test1: Page has correct current month/year", () => {
    const month = document.getElementById('month');
    const year = document.getElementById('year');
    expect(month.innerHTML).toMatch(monthNames[currMonth]);
    expect(year.innerHTML).toMatch(currYear.toString());
  });

  // DOM Unit Test 2: Next month button moves calendar to correct month
  test("Test2: Next month button moves calendar to correct month", () => {
    const forwardMonth = document.getElementById("forwardmonth");
    forwardMonth.click();
    const month = document.getElementById('month');
    expect(month.innerHTML).toMatch(monthNames[currMonth + 1]);
  });

  // DOM Unit Test 3: Previous month button moves calendar to correct month
  test("Test3: Previous month button moves calendar to correct month", () => {
    const backMonth = document.getElementById("backmonth");
    backMonth.click();
    const month = document.getElementById('month');
    expect(month.innerHTML).toMatch(monthNames[currMonth]);
  });

  // DOM Unit Test 4: Next year button moves calendar to correct year 
  test("Test4: Next year button moves calendar to correct year ", () => {
    const forwardYear = document.getElementById("forwardyear");
    forwardYear.click();
    const year = document.getElementById('year');
    expect(year.innerHTML).toMatch((currYear + 1).toString());
  });

  // DOM Unit Test 5: Previous year button moves calendar to correct year
  test("Test5: Previous year button moves calendar to correct year", () => {
    const backYear = document.getElementById("backyear");
    backYear.click();
    const year = document.getElementById('year');
    expect(year.innerHTML).toMatch(currYear.toString());
  });

  // DOM Unit Test 6: Previous month button in January moves to correct month/year
  test("Test6:Previous month button in January moves to correct month/year (should change to December of last year)", () => {
    // Try to go to December of last year 
    const backMonth = document.getElementById("backmonth");
    for (let i = 0; i < currMonth + 1; i++) {
      backMonth.click();
    }
    const month = document.getElementById('month');
    const year = document.getElementById('year');
    expect(month.innerHTML).toMatch("December");
    expect(year.innerHTML).toMatch((currYear - 1).toString());
  });

  // DOM Unit Test 7: Next month button in December moves to correct month/year 
  test("Test7: Next month button in December moves to correct month/year (should change to January of next year)", () => {
    // Try to go to January of next year 
    const forwardMonth = document.getElementById("forwardmonth");
    for (let i = 0; i < 13; i++) {
      forwardMonth.click();
    }
    const month = document.getElementById('month');
    const year = document.getElementById('year');
    expect(month.innerHTML).toMatch("January");
    expect(year.innerHTML).toMatch((currYear + 1).toString());
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

