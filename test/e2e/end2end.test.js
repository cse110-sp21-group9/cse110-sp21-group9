import * as testUtils from '../testutils.js'

let counter = testUtils.makeTestCounter(1);

describe('Test overall user flow for app', () => {
	const monthNames = ['January', 'Feburuary', 'March', 'April', 'May', 'June', 'July',
	'August', 'September', 'October', 'November', 'December'];
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const currDate = new Date(); 
	const objEventDate = new Date(currDate.getFullYear(), currDate.getMonth(), 6, 18);
	const objNoteDate = new Date(currDate.getFullYear(), currDate.getMonth());
	const objTaskDate = new Date(currDate.getFullYear(), currDate.getMonth(), 11, 6); 
	const strTestTag = 'UCSD';
	const monthHash = 'm-'+ currDate.getFullYear() + '-' + (currDate.getMonth() + 1); 
	const currHash = 'd-'+ currDate.getFullYear() + '-' + (currDate.getMonth() + 1) + '-' + currDate.getDate();
	const eventHash = 'd-'+ currDate.getFullYear() + '-' + (currDate.getMonth() + 1) + '-' + objEventDate.getDate(); 
	const taskHash = 'd-'+ currDate.getFullYear() + '-' + (currDate.getMonth() + 1) + '-' + objTaskDate.getDate(); 
	const strEventDayID = "[id='" + String(objEventDate.getDate()) + "']"
	const strNoteDayID = "[id='" + String(objNoteDate.getDate()) + "']"
	const strTaskDayID = "[id='" + String(objTaskDate.getDate()) + "']"
	const strNewNote = 'qwerty';
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

  beforeAll(async() => {
		// Load local storage with bullets, check if they show up on page
		await page.setViewport({
			width: 1366,
			height: 768
		})
    await page.goto('http://127.0.0.1:5500');
		await page.evaluate(() => {
			localStorage.clear(); 
		});
    await page.goto('http://127.0.0.1:5500');
		await page.waitForSelector('.btn-lg');

  });

	// Landing page
	test(`Test${counter()}: Landing page has correct button`, async () => {
		// Navigate to day page
		await expect(page).toClick('.btn-lg');
		await page.waitForNavigation();
	}, 30000); 

	// Check if page is at current day
	test(`Test${counter()}: Day page has correct current day`, async () => {
		// Check day page details
    const hash = await page.evaluate(() => location.hash);
    expect(hash).toMatch(currHash);

    const monthText = await page.$eval("#date", (elem) => {
			return elem.innerHTML;
		}); 
    expect(monthText).toMatch(monthNames[currDate.getMonth()] + " " + currDate.getDate()); 

		const dayText = await page.$eval("#week_day", (elem) => {
			return elem.innerHTML;
		}); 
    expect(dayText).toMatch(dayNames[currDate.getDay()]); 
	}, 30000); 

	// Go to month view, check if its current month
	test(`Test${counter()}: Month view has correct current month`, async () => {
		// Navigate to month page
		await expect(page).toClick("a[title='Month']");
		await page.waitForNavigation();

		// Check month page details
    const hash = await page.evaluate(() => location.hash);
    expect(hash).toMatch(monthHash);

		const monthText = await page.$eval("#month", (elem) => {
			return elem.innerHTML;
		}); 
    expect(monthText).toMatch(monthNames[currDate.getMonth()]); 
	}, 30000); 

	// Go to specific day, check day hash/elements
	test(`Test${counter()}: Calendar day goes to correct day page`, async () => {
		// Navigate to specific day page
		await expect(page).toClick(strEventDayID);
		await page.waitForNavigation();

		// Check day page details
    const hash = await page.evaluate(() => location.hash);
    expect(hash).toMatch(eventHash);

    const monthText = await page.$eval("#date", (elem) => {
			return elem.innerHTML;
		}); 
    expect(monthText).toMatch(monthNames[currDate.getMonth()] + " " + objEventDate.getDate()); 

		const dayText = await page.$eval("#week_day", (elem) => {
			return elem.innerHTML;
		}); 
    expect(dayText).toMatch(dayNames[objEventDate.getDay()]); 
	}, 30000); 

	// Create a tag, check if it shows up 
	test(`Test${counter()}: Create tag creates correct tag`, async () => {
		// Create a tag
		await expect(page).toSelect('#selecttag', 'edit')
		await page.waitForSelector('#tagname');
		await expect(page).toFill('#tagname', strTestTag); 
		await expect(page).toClick('#saveTag'); 

		// Check if tag exists on page
		let tagListLength = await page.$eval('#taglist', (elem) => {
			return elem.children.length; 
		}); 
		expect(tagListLength).toBe(1); 

		let tagBoxData = await page.$eval('#taglist', (elem) => {
			return elem.children[0].innerHTML; 
		}); 
		expect(tagBoxData).toMatch(strTestTag); 

		await expect(page).toClick('#doneTag');
		await page.waitForSelector('#selecttag');
		let tagSelectLength = await page.$eval('#selecttag', (elem) => {
			return elem.children.length; 
		}); 
		expect(tagSelectLength).toBe(3); 

		let tagInput = await page.$eval('#selecttag', (elem) => {
			return elem.children[1].value; 
		}); 
		expect(tagInput).toMatch(strTestTag); 
	}, 30000); 

	// Create an event bullet w/ tag, check if it shows up 
	test(`Test${counter()}: Creating event bullet creates correct bullet`, async () => {
		let titleID = "[id='" + objTestEvent.ID + "_title']"

		// Create event bullet with tag
		await expect(page).toClick('#addBullet'); 
		await page.waitForSelector('#title'); 
		await expect(page).toFill('#title', objTestEvent.title); 
		await expect(page).toSelect('#type', objTestEvent.type);
		await expect(page).toSelect('#hour', String(objEventDate.getHours() - 12)); 
		await expect(page).toSelect('#AMPM', 'PM');
		await expect(page).toFill('[name = "desc"]', objTestEvent.content);
		await expect(page).toSelect('#tags', strTestTag);   
		await expect(page).toClick('#saveBullet'); 
		await page.waitForSelector(titleID);

		// Check if event bullet is on page
		const bulletID = await page.$eval('#time_list', (elem) => {
			let timeSlot = elem.children[18];
			let timeSlotList = timeSlot.querySelector('ul'); 
			return timeSlotList.children[0].id;
		});
		expect(bulletID).toMatch(String(objTestEvent.ID)); 
		

		const eventTitle = await page.$eval(titleID, (elem) => {
			return elem.innerHTML;
		});
		expect(eventTitle).toMatch(objTestEvent.title); 

		let tagsID = "[id='" + objTestEvent.ID + "_tags'] span"
		const eventTags = await page.$eval(tagsID, (elem) => {
			return elem.innerHTML; 
		});
		expect(eventTags).toMatch(strTestTag); 
	}, 30000);

	// Go back to month view with back button, check if still current month
	test(`Test${counter()}: Back button goes back to correct month page`, async () => {
		// Use back button
		await page.goBack(); 

		// Check month page details
		const hash = await page.evaluate(() => location.hash);
		expect(hash).toMatch(monthHash);

		const monthText = await page.$eval("#month", (elem) => {
			return elem.innerHTML;
		}); 
		expect(monthText).toMatch(monthNames[currDate.getMonth()]); 
	}, 30000); 

	// Check if new bullet shows up in month view
	test(`Test${counter()}: New event bullet shows on calendar`, async () => {
		let numChildren = await page.$eval(strEventDayID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strEventDayID, (elem) => {
			let list = elem.querySelector('ul'); 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(1);
		expect(dateList).toMatch(objTestEvent.title);
	}, 30000); 

	// Go forwards to day page, check if still correct day
	test(`Test${counter()}: Forward button goes back to correct day page`, async () => {
		// Use back button
		await page.goForward(); 

		// Check day page details
    const hash = await page.evaluate(() => location.hash);
    expect(hash).toMatch(eventHash);

    const monthText = await page.$eval("#date", (elem) => {
			return elem.innerHTML;
		}); 
    expect(monthText).toMatch(monthNames[currDate.getMonth()] + " " + objEventDate.getDate()); 

		const dayText = await page.$eval("#week_day", (elem) => {
			return elem.innerHTML;
		}); 
    expect(dayText).toMatch(dayNames[objEventDate.getDay()]); 
	}, 30000); 

	// create a note bullet, check if it shows up
	test(`Test${counter()}: Creating note bullet creates correct bullet`, async () => {
		let titleID = "[id='" + objTestNote.ID + "_title']"
		// Create note bullet
		await expect(page).toClick('#addNote');
		await page.waitForSelector('#note_input');
		await expect(page).toFill('#note_input input', objTestNote.title); 
		await expect(page).toClick('#note_input button'); 
		await page.waitForSelector(titleID); 

		// Check if note bullet is on page
		const bulletID = await page.$eval('#noteSpace', (elem) => {
			return elem.children[0].id;
		});
		expect(bulletID).toMatch(String(objTestNote.ID)); 

		const noteTitle = await page.$eval(titleID, (elem) => {
			return elem.innerHTML;
		});
		expect(noteTitle).toMatch(objTestNote.title); 
	}, 30000); 

	// Go back to month view, check if it shows up
	test(`Test${counter()}: New note bullet shows on calendar`, async () => {
		// Go back to month view
		await page.goBack(); 

		let numChildren = await page.$eval(strEventDayID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strEventDayID, (elem) => {
			let list = elem.querySelector('ul'); 
      return list.children[1].innerHTML;
    });
		expect(numChildren).toBe(2);
		expect(dateList).toMatch(objTestNote.title);
	}, 30000); 

	// Go to another day, check if this day is correct 
	// Go to specific day, check day hash/elements
	test(`Test${counter()}: Calendar day goes to correct second day page`, async () => {
		// Navigate to specific day page
		await expect(page).toClick(strTaskDayID);
		await page.waitForNavigation();

		// Check day page details
    const hash = await page.evaluate(() => location.hash);
    expect(hash).toMatch(taskHash);

    const monthText = await page.$eval("#date", (elem) => {
			return elem.innerHTML;
		}); 
    expect(monthText).toMatch(monthNames[currDate.getMonth()] + " " + objTaskDate.getDate()); 

		const dayText = await page.$eval("#week_day", (elem) => {
			return elem.innerHTML;
		}); 
    expect(dayText).toMatch(dayNames[objTaskDate.getDay()]); 
	}, 30000); 

	// Add task bullet w/ tag, check if it shows 
	test(`Test${counter()}: Creating task bullet creates correct bullet`, async () => {
		let titleID = "[id='" + objTestTask.ID + "_title']"

		// Create event bullet with tag
		await expect(page).toClick('#addBullet'); 
		await page.waitForSelector('#title'); 
		await expect(page).toFill('#title', objTestTask.title); 
		await expect(page).toSelect('#type', objTestTask.type);
		await expect(page).toSelect('#hour', String(objTaskDate.getHours())); 
		await expect(page).toSelect('#AMPM', 'AM');
		await expect(page).toFill('[name = "desc"]', objTestTask.content);
		await expect(page).toSelect('#tags', strTestTag);   
		await expect(page).toClick('#saveBullet'); 
		await page.waitForSelector(titleID);

		// Check if event bullet is on page
		const bulletID = await page.$eval('#time_list', (elem) => {
			let timeSlot = elem.children[6];
			let timeSlotList = timeSlot.querySelector('ul'); 
			return timeSlotList.children[0].id;
		});
		expect(bulletID).toMatch(String(objTestTask.ID)); 
		

		const taskTitle = await page.$eval(titleID, (elem) => {
			return elem.innerHTML;
		});
		expect(taskTitle).toMatch(objTestTask.title); 

		let tagsID = "[id='" + objTestTask.ID + "_tags'] span"
		const taskTags = await page.$eval(tagsID, (elem) => {
			return elem.innerHTML; 
		});
		expect(taskTags).toMatch(strTestTag); 
	}, 30000);

	// Go back to month view check if it shows up 
	test(`Test${counter()}: New task bullet shows on calendar`, async () => {
		// Go back to month view
		await page.goBack(); 

		let numChildren = await page.$eval(strTaskDayID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strTaskDayID, (elem) => {
			let list = elem.querySelector('ul'); 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(1);
		expect(dateList).toMatch(objTestTask.title);
	}, 30000); 

	// Go to 1st day, Edit 1st bullet  
	test(`Test${counter()}: Editing 1st event bullet edits correct bullet`, async () => {
		let titleID = "[id='" + objTestEvent.ID + "_title']"
		let editID = "[id='" + objTestEvent.ID + "_edit']"

		// Go back to 1st day 
		await expect(page).toClick(strEventDayID); 
		await page.waitForNavigation(); 

		// Create event bullet with tag
		await page.hover(titleID);
		await page.waitForSelector(editID);
		await expect(page).toClick(editID); 
		await page.waitForSelector('#editTitle'); 
		await expect(page).toFill('#editTitle', objTestTask.title); 
		await expect(page).toSelect('#editHour', String(objTaskDate.getHours())); 
		await expect(page).toSelect('#editAMPM', 'AM');
		await expect(page).toFill('[name = "editDesc"]', objTestTask.content);   
		await expect(page).toClick('#editSaveAdd'); 
		await page.waitForSelector(titleID);

		// Check if new event bullet is in correct location page
		const prevSlotLength = await page.$eval('#time_list', (elem) => {
			let timeSlot = elem.children[18];
			let timeSlotList = timeSlot.querySelector('ul'); 
			return timeSlotList.children.length;
		});

		const bulletID = await page.$eval('#time_list', (elem) => {
			let timeSlot = elem.children[6];
			let timeSlotList = timeSlot.querySelector('ul'); 
			return timeSlotList.children[0].id;
		});
		expect(prevSlotLength).toBe(0);
		expect(bulletID).toMatch(String(objTestEvent.ID)); 
		
		const eventTitle = await page.$eval(titleID, (elem) => {
			return elem.innerHTML;
		});
		expect(eventTitle).toMatch(objTestTask.title); 

		let tagsID = "[id='" + objTestEvent.ID + "_tags'] span"
		const eventTags = await page.$eval(tagsID, (elem) => {
			return elem.innerHTML; 
		});
		expect(eventTags).toMatch(strTestTag); 
	}, 30000);

	// Go back to month view check if its changed
	test(`Test${counter()}: New event bullet shows on calendar`, async () => {
		// Go back to month view
		await page.goBack(); 

		let numChildren = await page.$eval(strEventDayID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strEventDayID, (elem) => {
			let list = elem.querySelector('ul'); 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(2);
		expect(dateList).toMatch(objTestTask.title);
	}, 30000); 

	// Go to 2nd day, Edit 2nd bullet 
	test(`Test${counter()}: Editing 2nd task bullet edits correct bullet`, async () => {
		let titleID = "[id='" + objTestTask.ID + "_title']"
		let editID = "[id='" + objTestTask.ID + "_edit']"

		// Go back to 1st day 
		await expect(page).toClick(strTaskDayID); 
		await page.waitForNavigation(); 

		// Create event bullet with tag
		await page.hover(titleID);
		await page.waitForSelector(editID);
		await expect(page).toClick(editID); 
		await page.waitForSelector('#editTitle'); 
		await expect(page).toFill('#editTitle', objTestEvent.title); 
		await expect(page).toFill('[name = "editDesc"]', objTestEvent.content);  
		await expect(page).toClick('#editBulletTags button'); 
		await expect(page).toClick('#editSaveAdd'); 
		await page.waitForSelector(titleID);

		// Check if new task bullet is correct
		const bulletID = await page.$eval('#time_list', (elem) => {
			let timeSlot = elem.children[6];
			let timeSlotList = timeSlot.querySelector('ul'); 
			return timeSlotList.children[0].id;
		});
		expect(bulletID).toMatch(String(objTestTask.ID)); 
		
		const taskTitle = await page.$eval(titleID, (elem) => {
			return elem.innerHTML;
		});
		expect(taskTitle).toMatch(objTestEvent.title); 

		let tagsID = "[id='" + objTestTask.ID + "_tags']"
		const taskTags = await page.$eval(tagsID, (elem) => {
			return elem.innerHTML; 
		});
		expect(taskTags).not.toMatch(strTestTag); 
	}, 30000);

	// Go back to month view check if its changed
	test(`Test${counter()}: New task bullet shows on calendar`, async () => {
		// Go back to month view
		await page.goBack(); 

		let numChildren = await page.$eval(strTaskDayID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strTaskDayID, (elem) => {
			let list = elem.querySelector('ul'); 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(1);
		expect(dateList).toMatch(objTestEvent.title);
	}, 30000); 

	// Edit note bullet on 1st day  
	test(`Test${counter()}: Editing 1st note bullet edits correct bullet`, async () => {
		let titleID = "[id='" + objTestNote.ID + "_title']"
		let editID = "[id='" + objTestNote.ID + "_note_edit']"
		// Go back to 1st day 
		await expect(page).toClick(strEventDayID); 
		await page.waitForNavigation(); 

		// Create event bullet with tag
		await expect(page).toClick(titleID, {clickCount: 2});
		await page.waitForSelector(editID); 
		await expect(page).toFill(editID + ' input', strNewNote); 
		await expect(page).toClick(editID + ' button'); 
		await page.waitForSelector(titleID); 

		// Check if note bullet is on page
		const bulletID = await page.$eval('#noteSpace', (elem) => {
			return elem.children[0].id;
		});
		expect(bulletID).toMatch(String(objTestNote.ID)); 

		const noteTitle = await page.$eval(titleID, (elem) => {
			return elem.innerHTML;
		});
		expect(noteTitle).toMatch(strNewNote); 
	}, 30000);

	// Go back to month view check if its changed
	test(`Test${counter()}: New note bullet shows on calendar`, async () => {
		// Go back to month view
		await page.goBack(); 

		let numChildren = await page.$eval(strEventDayID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
			return listItems.length;
		});
		let dateList = await page.$eval(strEventDayID, (elem) => {
			let list = elem.querySelector('ul'); 
			return list.children[1].innerHTML;
		});
		expect(numChildren).toBe(2);
		expect(dateList).toMatch(strNewNote);
	}, 30000); 

	// Remove tags globally check if bullet on 1st day has no tag
	test(`Test${counter()}: Removing tag globally removes it from correct bullets`, async () => {
		// Go back to 1st day 
		await expect(page).toClick(strEventDayID); 
		await page.waitForNavigation(); 

		// Remove tag globally
		await expect(page).toSelect('#selecttag', 'edit')
		await page.waitForSelector('#tagname');
		await expect(page).toClick('#taglist button');

		// Check if tag exists on page
		let tagListLength = await page.$eval('#taglist', (elem) => {
			return elem.children.length; 
		}); 
		expect(tagListLength).toBe(0); 

		await expect(page).toClick('#doneTag');
		await page.waitForSelector('#selecttag');
		let tagSelectLength = await page.$eval('#selecttag', (elem) => {
			return elem.children.length; 
		}); 
		expect(tagSelectLength).toBe(2); 

		let tagInput = await page.$eval('#selecttag', (elem) => {
			return elem.children[1].value; 
		}); 
		expect(tagInput).not.toMatch(strTestTag);

		let tagsID = "[id='" + objTestEvent.ID + "_tags']"
		const eventTags = await page.$eval(tagsID, (elem) => {
			return elem.innerHTML; 
		});
		expect(eventTags).not.toMatch(strTestTag); 
	}, 30000);

	// Remove 1st event bullet, check if its gone from day view
	test(`Test${counter()}: Removing 1st event bullet edits correct bullet`, async () => {
		let titleID = "[id='" + objTestEvent.ID + "_title']"
		let deleteID = "[id='" + objTestEvent.ID + "_delete']"

		// Create event bullet with tag
		await page.hover(titleID);
		await page.waitForSelector(deleteID);
		await expect(page).toClick(deleteID); 
		await expect(page).toClick('#okConfirm'); 

		// Check if event bullet is gone
		const timeSlotLength = await page.$eval('#time_list', (elem) => {
			let timeSlot = elem.children[6];
			let timeSlotList = timeSlot.querySelector('ul'); 
			return timeSlotList.children.length;
		});
		expect(timeSlotLength).toBe(0); 
	}, 30000);

	// Go back to month view check if its gone
	test(`Test${counter()}: Removed bullet is removed from calendar`, async () => {
		// Go back to month view
		await page.goBack(); 

		let numChildren = await page.$eval(strEventDayID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strEventDayID, (elem) => {
			let list = elem.querySelector('ul'); 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(1);
		expect(dateList).not.toMatch(objTestTask.title);
	}, 30000); 

	// Go to 2nd day, Remove bullet 
	test(`Test${counter()}: Removing 2nd task bullet removes correct bullet`, async () => {
		// Go to 2nd day 
		await expect(page).toClick(strTaskDayID); 
		await page.waitForNavigation(); 

		let titleID = "[id='" + objTestTask.ID + "_title']"
		let deleteID = "[id='" + objTestTask.ID + "_delete']"

		// Create event bullet with tag
		await page.hover(titleID);
		await page.waitForSelector(deleteID);
		await expect(page).toClick(deleteID); 
		await expect(page).toClick('#okConfirm'); 

		// Check if event bullet is gone
		const timeSlotLength = await page.$eval('#time_list', (elem) => {
			let timeSlot = elem.children[6];
			let timeSlotList = timeSlot.querySelector('ul'); 
			return timeSlotList.children.length;
		});
		expect(timeSlotLength).toBe(0); 
	}, 30000);

	// Go back to month view check if its gone
	test(`Test${counter()}: Removed bullet is removed from calendar`, async () => {
		// Go back to month view
		await page.goBack(); 

		let numChildren = await page.$eval(strTaskDayID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strTaskDayID, (elem) => {
			let list = elem.querySelector('ul'); 
			if(list === null)
				return ""; 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(0);
		expect(dateList).not.toMatch(objTestEvent.title);
	}, 30000); 

	// Go to 1st day, remove note bullet
	test(`Test${counter()}: Removing note bullet removes correct bullet`, async () => {
		// Go to 1st day 
		await expect(page).toClick(strEventDayID); 
		await page.waitForNavigation();

		let titleID = "[id='" + objTestNote.ID + "_title']"
		let deleteID = "[id='" + objTestNote.ID + "_delete']"

		// Remove note bullet
		await page.hover(titleID);
		await page.waitForSelector(deleteID);
		await expect(page).toClick(deleteID); 

		// Check if note bullet is removed from page
		const noteSpaceLength = await page.$eval('#noteSpace', (elem) => {
			return elem.children.length;
		});
		expect(noteSpaceLength).toBe(0); 
	}, 30000); 

	// Go back to month view check if its gone
	test(`Test${counter()}: Removed bullet is removed from calendar`, async () => {
		// Go back to month view
		await page.goBack(); 

		let numChildren = await page.$eval(strEventDayID, (elem) => {
			let listItems = elem.querySelectorAll('li'); 
      return listItems.length;
    });
    let dateList = await page.$eval(strEventDayID, (elem) => {
			let list = elem.querySelector('ul'); 
			if(list === null)
				return ""; 
      return list.children[0].innerHTML;
    });
		expect(numChildren).toBe(0);
		expect(dateList).not.toMatch(strNewNote);
	}, 30000); 
});