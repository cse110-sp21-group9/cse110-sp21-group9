import * as testUtils from '../testutils.js'

let counter = testUtils.makeTestCounter(1);

describe('End-to-end tests for calendar month view', () => {
	const monthNames = ['January', 'Feburuary', 'March', 'April', 'May', 'June', 'July',
	'August', 'September', 'October', 'November', 'December'];

	const currDate = new Date(); 
	const objEventDate = new Date(currDate.getFullYear(), currDate.getMonth(), 6);
	const objNoteDate = new Date(currDate.getFullYear(), currDate.getMonth(), 20);
	objNoteDate.setMonth(objNoteDate.getMonth() + 1);
	const objTaskDate = new Date(currDate.getFullYear(), currDate.getMonth(), 11); 
	const strTestTag = 'UCSD';
	const monthHash = 'm-'+ currDate.getFullYear() + '-' + (currDate.getMonth() + 1); 
	const nextMonthHash = 'm-'+ objNoteDate.getFullYear() + '-' + (objNoteDate.getMonth() + 1);
	const strEventID = "[id='" + String(objEventDate.getDate()) + "']"
	const strNoteID = "[id='" + String(objNoteDate.getDate()) + "']"
	const strTaskID = "[id='" + String(objTaskDate.getDate()) + "']"
  const objTestEvent = {
    ID: 1,
    title: 'TestEvnt',
    type: 'Event',
    date: objEventDate,
    tags: [strTestTag],
    content: 'Evntcntnt',
    dueDate: null,
    status: null
  };
  const objTestNote = {
    ID: 2,
    title: 'TestNt',
    type: 'Note',
    date: objNoteDate,
    tags: [],
    content: 'Ntcntnt',
    dueDate: null,
    status: null
  };
  const objTestTask = {
    ID: 3,
    title: 'TestTsk',
    type: 'Task',
    date: objTaskDate,
    tags: [strTestTag],
    content: 'Tskcntnt',
    dueDate: null,
    status: 'done'
  };
	function setLocalStorage(bulletIDs, bullets, lastID, tags) {
		localStorage.clear(); 
		localStorage.setItem('bulletIDs', JSON.stringify({ array: bulletIDs}));
		for (const bullet of bullets) {
			localStorage.setItem(bullet.ID, JSON.stringify(bullet)); 
		}
		localStorage.setItem('lastID', lastID);
		localStorage.setItem('tags', JSON.stringify(tags)); 
	}

  beforeAll(async() => {
		// Load local storage with bullets, check if they show up on page
		await page.setViewport({
			width: 1366,
			height: 768
		})
    await page.goto('http://127.0.0.1:5500');
		await page.evaluate(setLocalStorage, [objTestEvent.ID, objTestNote.ID, objTestTask.ID], [objTestEvent, objTestNote, objTestTask], objTestTask.ID, {[strTestTag]: true});
    await page.goto('http://127.0.0.1:5500');
		await page.waitForTimeout(1000);

  });

	// Navigate to month view, check url hash
	test(`Test${counter()}: Month view shows correct bullets from current month`, async () => {
		//Navigate to day page
		await expect(page).toClick('.btn-lg');
		await page.waitForNavigation();

		await expect(page).toClick("a[title='Month']");
		await page.waitForNavigation();
    const hash = await page.evaluate(() => location.hash);
    expect(hash).toMatch(monthHash);
	}, 30000); 

	// Check bullets for current month
	test(`Test${counter()}: Check bullets for current month`, async () => {
		//Check event day
		let numChildren = await page.$eval(strEventID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strEventID, (elem) => {
			let list = elem.querySelector('ul'); 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(1);
		expect(dateList).toMatch(objTestEvent.title);

		//Check task day 
		numChildren = await page.$eval(strTaskID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    dateList = await page.$eval(strTaskID, (elem) => {
			let list = elem.querySelector('ul'); 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(1);
		expect(dateList).toMatch(objTestTask.title);
	}, 30000); 

	// Check navigation to next month 
	test(`Test${counter()}: Navigate to next month, check hash`, async () => {
		//Check event day
		await expect(page).toClick("#forwardmonth");

    const hash = await page.evaluate(() => location.hash);
    expect(hash).toMatch(nextMonthHash);		
	}, 30000); 

	// Check bullets to next month 
	test(`Test${counter()}: Check bullets for next month`, async () => {
		// Check note bullet
		let numChildren = await page.$eval(strNoteID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strNoteID, (elem) => {
			let list = elem.querySelector('ul'); 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(1);
		expect(dateList).toMatch(objTestNote.title);
	}, 30000); 

	// Check filtering
	// Check filtering of event bullets
	test(`Test${counter()}: Filtering of event bullets shows correct bullets`, async () => {
		// Filter by event
		await expect(page).toSelect('#filter', 'Event')
		// Check note day
		let numChildren = await page.$eval(strNoteID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strNoteID, (elem) => {
			let list = elem.querySelector('ul');
			if(list === null)
				return ""; 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(0);
		expect(dateList).not.toMatch(objTestNote.title);

		// Check other bullets from current month
		await expect(page).toClick("#backmonth");
		//Check event day
		numChildren = await page.$eval(strEventID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
		});
		dateList = await page.$eval(strEventID, (elem) => {
			let list = elem.querySelector('ul');
			if(list === null)
				return ""; 
      return list.children[0].innerHTML;
		});
		expect(numChildren).toBe(1);
		expect(dateList).toMatch(objTestEvent.title);

		//Check task day 
		numChildren = await page.$eval(strTaskID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
		});
		dateList = await page.$eval(strTaskID, (elem) => {
			let list = elem.querySelector('ul');
			if(list === null)
				return ""; 
      return list.children[0].innerHTML;
		});
		expect(numChildren).toBe(0);
		expect(dateList).not.toMatch(objTestTask.title);
	}, 30000); 

	// Check filtering of task bullets
	test(`Test${counter()}: Filtering of task bullets shows correct bullets`, async () => {
		// Filter by task
		await expect(page).toSelect('#filter', 'Task')
		
		//Check event day
		let numChildren = await page.$eval(strEventID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
			return listItems.length;
		});
		let dateList = await page.$eval(strEventID, (elem) => {
			let list = elem.querySelector('ul');
			if(list === null)
				return ""; 
			return list.children[0].innerHTML;
		});
		expect(numChildren).toBe(0);
		expect(dateList).not.toMatch(objTestEvent.title);

		//Check task day 
		numChildren = await page.$eval(strTaskID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
			return listItems.length;
		});
		dateList = await page.$eval(strTaskID, (elem) => {
			let list = elem.querySelector('ul');
			if(list === null)
				return ""; 
			return list.children[0].innerHTML;
		});
		expect(numChildren).toBe(1);
		expect(dateList).toMatch(objTestTask.title);

		// Check other bullets from next month
		await expect(page).toClick("#forwardmonth");

		// Check note day
		numChildren = await page.$eval(strNoteID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    dateList = await page.$eval(strNoteID, (elem) => {
			let list = elem.querySelector('ul');
			if(list === null)
				return ""; 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(0);
		expect(dateList).not.toMatch(objTestNote.title);
	}, 30000); 

	// Check filtering of note bullets
	test(`Test${counter()}: Filtering of note bullets shows correct bullets`, async () => {
		// Filter by event
		await expect(page).toSelect('#filter', 'Note')
		// Check note day
		let numChildren = await page.$eval(strNoteID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strNoteID, (elem) => {
			let list = elem.querySelector('ul');
			if(list === null)
				return ""; 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(1);
		expect(dateList).toMatch(objTestNote.title);

		// Check other bullets from current month
		await expect(page).toClick("#backmonth");
		//Check event day
		numChildren = await page.$eval(strEventID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
		});
		dateList = await page.$eval(strEventID, (elem) => {
			let list = elem.querySelector('ul');
			if(list === null)
				return ""; 
      return list.children[0].innerHTML;
		});
		expect(numChildren).toBe(0);
		expect(dateList).not.toMatch(objTestEvent.title);

		//Check task day 
		numChildren = await page.$eval(strTaskID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
		});
		dateList = await page.$eval(strTaskID, (elem) => {
			let list = elem.querySelector('ul');
			if(list === null)
				return ""; 
      return list.children[0].innerHTML;
		});
		expect(numChildren).toBe(0);
		expect(dateList).not.toMatch(objTestTask.title);
	}, 30000); 

}); 