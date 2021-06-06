/**
 * @jest-environment jsdom
 */
/**
 * @jest-environment jsdom
 */
 import * as testUtils from '../testutils.js'

 let counter = testUtils.makeTestCounter(1);


const fs = require('fs');
const path = require('path');
global.$ = require('jquery');

//mock functions
$.fn.modal = jest.fn();

describe('Integration Test CRUD functions with localStorage for day view:', () => {
	const monthNames = ['January', 'Feburuary', 'March', 'April', 'May', 'June', 'July',
	'August', 'September', 'October', 'November', 'December'];
	const currDate = new Date(); 
  const objEventDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), 4);
	const objNoteDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()); 
	const objTestDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), 18); 
	const objTaskDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), 11); 
	const objEditDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), 17);
  const strTestTag = 'UCSD';
	const strTestTag2 = 'work'; 
	const strTestNote = 'waaarghbobo'; 
	const strTestNote2 = 'bazinga';

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

  let contentHtml;

	let timeList;
	let noteSpace;
	let noteBtn;

	let tagFilterSelect;
	let tagInput;
	let tagList; 
	
	let addBtn;
	let titleInput;
	let typeInput;
	let contentInput;
	let hourInput;
	let AMPMInput;
	let tagSelector;
	let selectedTags; 
	let saveBulletBtn;

	let editSave;
	let editTitle;
	let editHour;
	let editAMPM;
	let editContent;
	let editTagSelector;
	let editSelectedTags;

	let deleteSave; 

  beforeAll(() => {
		// Set up localstorage 
		global.localStorage = new testUtils.LocalStorageMock();
		localStorage.setItem('bulletIDs', JSON.stringify({ array: [objTestEvent.ID, objTestNote.ID] }));
		localStorage.setItem(objTestEvent.ID, JSON.stringify(objTestEvent)); 
		localStorage.setItem(objTestNote.ID, JSON.stringify(objTestNote)); 
		localStorage.setItem('lastID', objTestNote.ID);
		localStorage.setItem('tags', JSON.stringify({[strTestTag]: true})); 

		// Load day page
    contentHtml = fs.readFileSync(path.resolve(__dirname, '../../source/frontend/app/page-day/day.html'), 'utf-8');
    document.documentElement.innerHTML = contentHtml;
    require('../../source/frontend/app/sidebar/sidebar.js');
    require('../../source/backend/crudFunctions.js');
    require('../../source/frontend/utils.js');
		require('../../source/frontend/globals.js');
		require('../../source/frontend/app/page-day/day.js');
		
		// Get HTML elements we might need later 
		timeList = document.getElementById('time_list'); 
		noteSpace = document.getElementById('noteSpace'); 
		noteBtn = document.getElementById('addNote');
		
		tagFilterSelect = document.getElementById('selecttag');
		tagInput = document.getElementById('tagname'); 
		
		tagList = document.getElementById('taglist'); 
		addBtn = document.getElementById('addBullet');
	  titleInput = document.getElementById('title');
		typeInput = document.getElementById('type');
	  contentInput = document.querySelector('[name = "desc"]');
	  hourInput = document.getElementById('hour');
	  AMPMInput = document.getElementById('AMPM');
	  tagSelector = document.getElementById('tags');
	  selectedTags = document.getElementById('bullet_tags');
		saveBulletBtn = document.getElementById('saveBullet');

		editSave = document.getElementById('editSaveAdd');
		editTitle = document.getElementById('editTitle');
		editHour = document.getElementById('editHour');
		editAMPM = document.getElementById('editAMPM');
		editContent = document.querySelector('[name = "editDesc"]');
		editTagSelector = document.getElementById('editTags');
		editSelectedTags = document.getElementById('editBulletTags');

		deleteSave = document.getElementById('okConfirm');
  });

  // Check if correct bullets are loaded from localStorage 
	test(`Test${counter()}: Correct bullets are loaded from localStorage`, () => {
		// Check event bullet 
		const eventHour = objEventDate.getHours(); 
		const timeBulletList = timeList.children[eventHour].querySelector('ul'); 
		const eventTitle = document.getElementById(objTestEvent.ID + '_title'); 
		const eventTags = document.getElementById(objTestEvent.ID + '_tags'); 
		expect(timeBulletList.children[0].id).toMatch(String(objTestEvent.ID));
		expect(eventTitle.innerHTML).toMatch(objTestEvent.title);
		expect(eventTags.children[0].innerHTML).toMatch(objTestEvent.tags[0]); 

		// Check note bullet
		const noteTitle = document.getElementById(objTestNote.ID + '_title'); 
		expect(noteSpace.children[0].id).toMatch(String(objTestNote.ID)); 
		expect(noteTitle.innerHTML).toMatch(objTestNote.title);
		
	});   

	// Check create functions 
	describe('Test Create functions:', () => {
		// Tag creation
		test(`Test${counter()}: Create tag creates correct tag in page/localStorage`, () => {
			tagFilterSelect.value = 'edit'; 
			tagInput.value = strTestTag2; 
			tagInput.dispatchEvent(new KeyboardEvent('keypress', {'key': 'Enter'})); 
			expect(tagList.children.length).toBe(2); 
			expect(tagList.children[1].innerHTML).toMatch(strTestTag2); 
			expect(tagFilterSelect.children.length).toBe(4); 
			expect(tagFilterSelect.children[2].value).toBe(strTestTag2);
		}); 

		// Create task bullet - check if shows up on page/localstorage
		test(`Test${counter()}: Create task bullet creates correct bullet in page/localStorage`, () => {
			// Create event bullet using inputs 
			addBtn.click(); 

			// Check if tags are populated correctly 
			const currTags = [strTestTag, strTestTag2]; 
			for (let i = 0; i < currTags.length; i++) {
				expect(tagSelector.children[i + 1].innerHTML).toMatch(currTags[i]);
			}

			titleInput.value = objTestTask.title; 
			typeInput.value = 'Task';
			contentInput.value = objTestTask.content; 
			hourInput.value = objTaskDate.getHours(); 
			AMPMInput.value = 'AM'; 
			tagSelector.value = strTestTag;
			tagSelector.dispatchEvent(new Event("change"));
			expect(selectedTags.children.length).toBe(1); 
			expect(selectedTags.children[0].innerHTML).toMatch(strTestTag); 
			saveBulletBtn.click(); 

			// Check if bullet shows on page
			const timeBulletList = timeList.children[objTaskDate.getHours()].querySelector('ul'); 
			const eventTitle = document.getElementById(3 + '_title'); 
			const eventTags = document.getElementById(3  + '_tags'); 
			expect(timeBulletList.children[0].id).toMatch(String(objTestTask.ID));
			expect(eventTitle.innerHTML).toMatch(objTestTask.title);
			expect(eventTags.children[0].innerHTML).toMatch(strTestTag); 

			// Check if bullet shows in localStorage 
			const lastID = Number(localStorage.getItem('lastID'));
			expect(lastID).toEqual(3);
	
			const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
			expect(arrBulletIDs).toContain(lastID);
	
			const objTaskBullet = JSON.parse(localStorage.getItem(lastID));
			expect(objTaskBullet.title).toMatch(objTestTask.title);
			expect(objTaskBullet.type).toMatch('Task');
			expect(objTaskBullet.date).toMatch(objTaskDate.toISOString());
			expect(objTaskBullet.tags).toEqual([strTestTag]);
			expect(objTaskBullet.content).toMatch(objTestTask.content);
		}); 

		// Create event bullet - check if shows up on page/localStorage
		test(`Test${counter()}: Create event bullet with test note data creates correct bullet in page/localStorage`, () => {
			// Create event bullet using inputs 
			addBtn.click(); 
			titleInput.value = objTestNote.title; 
			typeInput.value = 'Event';
			contentInput.value = objTestNote.content; 
			hourInput.value = objTestDate.getHours() - 12; 
			AMPMInput.value = 'PM'; 
			tagSelector.value = strTestTag;
			tagSelector.dispatchEvent(new Event("change"));
			expect(selectedTags.children.length).toBe(1); 
			expect(selectedTags.children[0].innerHTML).toMatch(strTestTag); 
			tagSelector.value = strTestTag2;
			tagSelector.dispatchEvent(new Event("change"));
			expect(selectedTags.children.length).toBe(2); 
			expect(selectedTags.children[1].innerHTML).toMatch(strTestTag2); 
			saveBulletBtn.click(); 

			// Check if bullet shows on page
			const timeBulletList = timeList.children[objTestDate.getHours()].querySelector('ul'); 
			const eventTitle = document.getElementById(4 + '_title'); 
			const eventTags = document.getElementById(4  + '_tags'); 
			expect(timeBulletList.children[0].id).toMatch('4');
			expect(eventTitle.innerHTML).toMatch(objTestNote.title);
			expect(eventTags.children[0].innerHTML).toMatch(strTestTag); 
			expect(eventTags.children[1].innerHTML).toMatch(strTestTag2); 

			// Check if bullet shows in localStorage 
			const lastID = Number(localStorage.getItem('lastID'));
			expect(lastID).toEqual(4);
	
			const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
			expect(arrBulletIDs).toContain(lastID);
	
			const objEventBullet = JSON.parse(localStorage.getItem(lastID));
			expect(objEventBullet.title).toMatch(objTestNote.title);
			expect(objEventBullet.type).toMatch('Event');
			expect(objEventBullet.date).toMatch(objTestDate.toISOString());
			expect(objEventBullet.tags).toEqual([strTestTag, strTestTag2]);
			expect(objEventBullet.content).toMatch(objTestNote.content);
		}); 

		// Create bullet and cancel - check if nothing shows up on page/localstorage
		test(`Test${counter()}: Cancel creation creates nothing new on page/localStorage`, () => {
			// Try Create event bullet using inputs 
			addBtn.click(); 
			titleInput.value = objTestNote.title; 
			contentInput.value = objTestNote.content; 
			hourInput.value = objTestDate.getHours() - 12; 
			AMPMInput.value = 'PM'; 
			
			// Cancel the bullet 
			const cancelBtn = document.getElementById('canceladd'); 
			cancelBtn.click(); 

			// Check if no new bullet shows on page
			const timeBulletList = timeList.children[objTestDate.getHours()].querySelector('ul'); 
			expect(timeBulletList.children.length).toBe(1); 

			// Check if localStorage is unchanged
			const lastID = Number(localStorage.getItem('lastID'));
			expect(lastID).toEqual(4);
	
			const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
			expect(arrBulletIDs).toEqual([1, 2, 3, 4]);
	
			expect(localStorage.getItem('5')).toBeNull();
		}); 
	
		// Create note bullet with save button - check if shows up on page/localstorage
		test(`Test${counter()}: Create note bullet with save creates correct bullet on page/localStorage`, () => {
			// Try Create event bullet using inputs 
			noteBtn.click(); 
			const noteInput = document.getElementById('note_input');
			noteInput.children[0].value = strTestNote; 
			noteInput.children[0].dispatchEvent(new KeyboardEvent('keypress', {'key': 'Enter'})); 
			
			// Check note bullet
			const noteTitle = document.getElementById(5 + '_title'); 
			expect(noteSpace.children[1].id).toMatch('5'); 
			expect(noteTitle.innerHTML).toMatch(strTestNote);

			// Check for new bullet in localStorage
			const lastID = Number(localStorage.getItem('lastID'));
			expect(lastID).toEqual(5);
	
			const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
			expect(arrBulletIDs).toContain(lastID);
	
			const objNoteBullet = JSON.parse(localStorage.getItem(lastID));
			expect(objNoteBullet.title).toMatch(strTestNote);
			expect(objNoteBullet.type).toMatch('Note');
			expect(objNoteBullet.date).toMatch(objNoteDate.toISOString());
		}); 

		
		// Create note bullet with enter - check if shows up on page/localstorage
		test(`Test${counter()}: Create note bullet with enter creates correct bullet on page/localStorage`, () => {
			// Try Create event bullet using inputs 
			noteBtn.click(); 
			const noteInput = document.getElementById('note_input');
			noteInput.children[0].value = strTestNote2; 
			noteInput.children[1].click();
			
			// Check note bullet
			const noteTitle = document.getElementById(6 + '_title'); 
			expect(noteSpace.children[2].id).toMatch('6'); 
			expect(noteTitle.innerHTML).toMatch(strTestNote2);

			// Check for new bullet in localStorage
			const lastID = Number(localStorage.getItem('lastID'));
			expect(lastID).toEqual(6);

			const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
			expect(arrBulletIDs).toContain(lastID);

			const objNoteBullet = JSON.parse(localStorage.getItem(lastID));
			expect(objNoteBullet.title).toMatch(strTestNote2);
			expect(objNoteBullet.type).toMatch('Note');
			expect(objNoteBullet.date).toMatch(objNoteDate.toISOString());
		}); 
	
		// Create note bullet and cancel - check if nothing new shows up on page/localStorage
		test(`Test${counter()}: Cancel note creation should create nothing new on page/localStorage`, () => {
			// Try Create event bullet using inputs 
			noteBtn.click(); 
			const noteInput = document.getElementById('note_input');
			noteInput.children[0].value = strTestNote2; 
			noteInput.children[2].click();
			
			// Check notes for nothing new
			expect(noteSpace.children.length).toBe(3);

			// Check for nothing new in localStorage
			const lastID = Number(localStorage.getItem('lastID'));
			expect(lastID).toEqual(6);

			const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
			expect(arrBulletIDs).toEqual([1, 2, 3, 4, 5, 6]);

			expect(localStorage.getItem(7)).toBeNull(); 
		}); 
	}); 

 	// Check Read functions 
	describe('Test Read functions:', () => {
		// Clicking on bullet should populate view modal with correct info
		test(`Test${counter()}: Clicking on bullet should populate view modal with correct info`, () => {
			const titleBar = document.getElementById('viewtitle');
			const dateBar = document.getElementById('viewdate');
			const timeBar = document.getElementById('viewtime');
			const typeBar = document.getElementById('viewtype');
			const contentBar = document.getElementById('viewdesc');
			const tagBar = document.getElementById('viewtags');
			const tags = tagBar.querySelectorAll('span'); 

			// click on bullet and check modal
			const eventTitle = document.getElementById(objTestEvent.ID + '_title'); 
			eventTitle.click(); 

			expect(titleBar.innerHTML).toMatch(objTestEvent.title);
			expect(dateBar.innerHTML).toMatch(monthNames[objEventDate.getMonth()] + ' ' + objEventDate.getDate() + ', ' + objEventDate.getFullYear()); 
			expect(timeBar.innerHTML).toMatch(objEventDate.getHours() + ':00 AM'); 
			expect(typeBar.innerHTML).toMatch(objTestEvent.type);
			expect(contentBar.innerHTML).toMatch(objTestEvent.content);

			for (let i = 0; i < tags.length; i++) {
				expect(tags[i].innerHTML).toMatch(objTestEvent.tags[i]);
			}
		}); 

		// tagFilterSelector should only show bullets with that tag 
		test(`Test${counter()}: Filter by tag should only show bullets with that tag`, () => {
			tagFilterSelect.value = strTestTag2; 
			tagFilterSelect.dispatchEvent(new Event("change"));
			// click on bullet and check modal

			const tagBoxes = document.querySelectorAll('.bulletTags'); 
			for (let tagBox of tagBoxes) {
				expect(tagBox.innerHTML).toMatch(strTestTag2); 
			}

			const bulletItems = document.querySelectorAll('.time_slot li'); 
			for (let bulletItem of bulletItems) {
				let objBullet = JSON.parse(localStorage.getItem(bulletItem.id)); 
				expect(objBullet.tags).toContain(strTestTag2);
			}
			
			// Reset tag filter
			tagFilterSelect.value = 'ALL'; 
			tagFilterSelect.dispatchEvent(new Event("change"));
		}); 
	}); 

	// Check Edit functions
	describe('Test Edit functions:', () => {
		// Edit fields of bullet, check if they show up on page/localstorage
		test(`Test${counter()}: Edit fields of bullet should update correct bullet on page/localstorage`, () => {
			const eventEditBtn = document.getElementById(objTestEvent.ID + '_edit');
			// click on bullet and check if edit modal is populated with correct info
			eventEditBtn.click(); 
			expect(editTitle.value).toMatch(objTestEvent.title); 
			expect(editHour.value).toMatch(String(objEventDate.getHours()));
			expect(editAMPM.value).toMatch('AM');
			expect(editContent.value).toMatch(objTestEvent.content); 
			
			const tags = document.querySelectorAll('#editBulletTags li'); 
			for (let i = 0; i < tags.length; i++) {
				expect(tags[i].innerHTML).toMatch(objTestEvent.tags[i]);
			}

			// Check if tags are populated correctly in edit tag selector
			const currTags = [strTestTag, strTestTag2]; 
			for (let i = 0; i < currTags.length; i++) {
				expect(editTagSelector.children[i + 1].innerHTML).toMatch(currTags[i]);
			}
			// Edit title/content of bullet, check if it shows on page
			editTitle.value = strTestNote; 
			editContent.value = strTestNote2; 
			editSave.click(); 
			const timeBulletList = timeList.children[objEventDate.getHours()].querySelector('ul'); 
			const eventTitle = document.getElementById(objTestEvent.ID + '_title'); 
			expect(timeBulletList.children[0].id).toMatch(String(objTestEvent.ID));
			expect(eventTitle.innerHTML).toMatch(strTestNote);

			// Check if edited changes are in localStorage
			const objEventBullet = JSON.parse(localStorage.getItem(String(objTestEvent.ID)));
			expect(objEventBullet.title).toMatch(strTestNote);
			expect(objEventBullet.type).toMatch(objTestEvent.type);
			expect(objEventBullet.date).toMatch(objEventDate.toISOString());
			expect(objEventBullet.tags).toEqual([strTestTag]);
			expect(objEventBullet.content).toMatch(strTestNote2);
		}); 

		// Edit hour of bullet, check if it shows on page/localstorage
		test(`Test${counter()}: Edit hour of bullet should change bullet position on page/localstorage`, () => {
			const eventEditBtn = document.getElementById(objTestEvent.ID + '_edit');
			// click on bullet
			eventEditBtn.click(); 

			// Edit fields of bullet and cancel
			editHour.value = objEditDate.getHours() - 12;
			editAMPM.value = 'PM';  
			editSave.click(); 

			const oldBulletList = timeList.children[objEventDate.getHours()].querySelector('ul');
			const newBulletList = timeList.children[objEditDate.getHours()].querySelector('ul'); 
			expect(oldBulletList.children.length).toBe(0);
			expect(newBulletList.children.length).toBe(1); 
			expect(newBulletList.children[0].id).toMatch(String(objTestEvent.ID));
			const eventTitle = document.getElementById(objTestEvent.ID + '_title'); 
			expect(eventTitle.innerHTML).toMatch(strTestNote);

			// Check if edited changes are in localStorage
			const objEventBullet = JSON.parse(localStorage.getItem(String(objTestEvent.ID)));
			expect(objEventBullet.title).toMatch(strTestNote);
			expect(objEventBullet.type).toMatch(objTestEvent.type);
			expect(objEventBullet.date).toMatch(objEditDate.toISOString());
			expect(objEventBullet.tags).toEqual([strTestTag]);
			expect(objEventBullet.content).toMatch(strTestNote2);
		}); 

		// Add tag to bullet, check if it shows on page/localstorage
		test(`Test${counter()}: Add tag to bullet should add correct tag to page/localStorage`, () => {
			const eventEditBtn = document.getElementById(objTestEvent.ID + '_edit');
			// click on bullet
			eventEditBtn.click(); 

			// Add tag to bullet
			editTagSelector.value = strTestTag2;
			editTagSelector.dispatchEvent(new Event("change"));
			const tags = document.querySelectorAll('#editBulletTags li'); 
			expect(tags[1].innerHTML).toMatch(strTestTag2);
			editSave.click(); 
			
			// Check if tag was added on page
			const eventTags = document.getElementById(objTestEvent.ID  + '_tags'); 
			expect(eventTags.children[0].innerHTML).toMatch(strTestTag); 
			expect(eventTags.children[1].innerHTML).toMatch(strTestTag2); 

			// Check if tag was added on localStorage
			const objEventBullet = JSON.parse(localStorage.getItem(String(objTestEvent.ID)));
			expect(objEventBullet.tags).toEqual([strTestTag, strTestTag2]);
		}); 

		// Edit fields of bullet and cancel - check if nothing changed on page/localstorage
		test(`Test${counter()}: Edit hour of bullet should change bullet position on page/localstorage`, () => {
			const eventEditBtn = document.getElementById(objTestEvent.ID + '_edit');
			const cancelEditBtn = document.getElementById('canceledit');
			// click on bullet
			eventEditBtn.click(); 

			// Try to edit bullet and cancel
			editTitle.value = objTestEvent.title; 
			editContent.value = objTestEvent.content; 
			editHour.value = objEventDate.getHours();
			editAMPM.value = 'AM';  
			cancelEditBtn.click(); 

			// Check if nothing changed on page
			const timeBulletList = timeList.children[objEditDate.getHours()].querySelector('ul'); 
			expect(timeBulletList.children.length).toBe(1); 
			expect(timeBulletList.children[0].id).toMatch(String(objTestEvent.ID));
			const eventTitle = document.getElementById(objTestEvent.ID + '_title'); 
			expect(eventTitle.innerHTML).toMatch(strTestNote);

			// Check if nothing changed are in localStorage
			const objEventBullet = JSON.parse(localStorage.getItem(String(objTestEvent.ID)));
			expect(objEventBullet.title).toMatch(strTestNote);
			expect(objEventBullet.type).toMatch(objTestEvent.type);
			expect(objEventBullet.date).toMatch(objEditDate.toISOString());
			expect(objEventBullet.tags).toEqual([strTestTag, strTestTag2]);
			expect(objEventBullet.content).toMatch(strTestNote2);
		}); 

		// Edit note bullet with save button - check if shows up on page/localstorage
		test(`Test${counter()}: Edit note bullet with save creates correct bullet on page/localStorage`, () => {
			// Open note edit dialog 
			noteBtn.click(); 
			const noteInfo = document.getElementById(objTestNote.ID).children[0];
			noteInfo.dispatchEvent(new MouseEvent('dblclick')); 
			const editNoteInput = document.getElementById(objTestNote.ID + '_note_edit');
			expect(editNoteInput.children.length).toBe(3);

			// Edit the note bullet with save
			editNoteInput.children[0].value = objTestEvent.title; 
			editNoteInput.children[1].click(); 
			
		
			// Check for new note bullet title on page
			const noteTitle = document.getElementById(objTestNote.ID + '_title'); 
			expect(noteSpace.children[0].id).toMatch(String(objTestNote.ID)); 
			expect(noteTitle.innerHTML).toMatch(objTestEvent.title);

			// Check for changes  in localStorage
			const objNoteBullet = JSON.parse(localStorage.getItem(String(objTestNote.ID)));
			expect(objNoteBullet.title).toMatch(objTestEvent.title);
			expect(objNoteBullet.type).toMatch('Note');
		}); 

		// Edit note bullet with enter - check if shows up on page/localstorage
		test(`Test${counter()}: Edit note bullet with enter creates correct bullet on page/localStorage`, () => {
			// Open note edit dialog 
			noteBtn.click(); 
			const noteInfo = document.getElementById(objTestNote.ID).children[0];
			noteInfo.dispatchEvent(new MouseEvent('dblclick')); 
			const editNoteInput = document.getElementById(objTestNote.ID + '_note_edit');

			// Edit the note bullet with save
			editNoteInput.children[0].value = objTestTask.title; 
			editNoteInput.children[0].dispatchEvent(new KeyboardEvent('keypress', {'key': 'Enter'})); 
			
			// Check for new note bullet title on page
			const noteTitle = document.getElementById(objTestNote.ID + '_title'); 
			expect(noteSpace.children[0].id).toMatch(String(objTestNote.ID)); 
			expect(noteTitle.innerHTML).toMatch(objTestTask.title);

			// Check for changes  in localStorage
			const objNoteBullet = JSON.parse(localStorage.getItem(String(objTestNote.ID)));
			expect(objNoteBullet.title).toMatch(objTestTask.title);
			expect(objNoteBullet.type).toMatch('Note');
		}); 

		// Edit note bullet with cancel - check if nothing changed on page/localstorage
		test(`Test${counter()}: Edit note bullet with enter creates correct bullet on page/localStorage`, () => {
			// Open note edit dialog 
			noteBtn.click(); 
			const noteInfo = document.getElementById(objTestNote.ID).children[0];
			noteInfo.dispatchEvent(new MouseEvent('dblclick')); 
			const editNoteInput = document.getElementById(objTestNote.ID + '_note_edit');

			// Edit the note bullet but cancel
			editNoteInput.children[0].value = objTestEvent.title; 
			editNoteInput.children[2].click()
			
			// Check for no changes in note bullet title on page
			const noteTitle = document.getElementById(objTestNote.ID + '_title'); 
			expect(noteSpace.children[0].id).toMatch(String(objTestNote.ID)); 
			expect(noteTitle.innerHTML).toMatch(objTestTask.title);

			// Check for no changes in localStorage
			const objNoteBullet = JSON.parse(localStorage.getItem(String(objTestNote.ID)));
			expect(objNoteBullet.title).toMatch(objTestTask.title);
			expect(objNoteBullet.type).toMatch('Note');
		}); 
	}); 

	// Check delete functions 
	describe('Test delete functions:', () => {
		// Remove tag from bullet, check if it shows on page/localstorage
		test(`Test${counter()}: Remove tag from bullet should remove correct tag to page/localStorage`, () => {
			const eventEditBtn = document.getElementById(objTestEvent.ID + '_edit');
			// click on bullet
			eventEditBtn.click(); 

			// Remove tag from bullet
			editTagSelector.dispatchEvent(new Event("change"));
			const tagButtons = document.querySelectorAll('#editBulletTags button'); 
			expect(tagButtons.length).toBe(2);
			tagButtons[1].click();
			editSave.click(); 
			
			// Check if tag was removed from page
			const eventTags = document.getElementById(objTestEvent.ID  + '_tags'); 
			expect(eventTags.children.length).toBe(1); 
			expect(eventTags.children[0].innerHTML).toMatch(strTestTag); 

			// Check if tag was removed on localStorage
			const objEventBullet = JSON.parse(localStorage.getItem(String(objTestEvent.ID)));
			expect(objEventBullet.tags).toEqual([strTestTag]);
		}); 

		// Remove tag globally, check all bullets on page/localstorage to see if tag is gone
		test(`Test${counter()}: Remove tag globally should remove correct tag from page/localStorage`, () => {
			tagFilterSelect.value = 'edit'; 
			const tagButtons = document.querySelectorAll('#taglist button'); 
			expect(tagButtons.length).toBe(2);
			tagButtons[0].click();

			expect(tagList.children.length).toBe(1); 
			expect(tagList.children[0].innerHTML).toMatch(strTestTag2); 
			expect(tagFilterSelect.children.length).toBe(3); 
			expect(tagFilterSelect.children[1].value).toBe(strTestTag2);

			// Check if tag was removed from all bullets on page
			const tagBoxes = document.querySelectorAll('.bulletTags'); 
			for (let tagBox of tagBoxes) {
				expect(tagBox.innerHTML).not.toMatch(strTestTag); 
			}

			// Check if tag was removed from all bullets in localStorage
			const bulletItems = document.querySelectorAll('.time_slot li'); 
			for (let bulletItem of bulletItems) {
				let objBullet = JSON.parse(localStorage.getItem(bulletItem.id)); 
				expect(objBullet.tags).not.toContain(strTestTag);
			}
		}); 

		// Delete event bullet, check if bullet is gone from page/localstorage
		test(`Test${counter()}: Deleting event bullet should delete correct bullet from page/localStorage`, () => {
			const eventDeleteBtn = document.getElementById(objTestEvent.ID + '_delete');
			// delete bullet
			eventDeleteBtn.click(); 
			deleteSave.click(); 

			// Check if bullet was deleted on page
			const timeBulletList = timeList.children[objEditDate.getHours()].querySelector('ul'); 
			expect(timeBulletList.children.length).toBe(0); 
			expect(document.getElementById(String(objTestEvent.ID))).toBeNull(); 

			// Check if bullet was deleted in localStorage
			const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
			expect(arrBulletIDs).toEqual([2, 3, 4, 5, 6]);

			expect(localStorage.getItem(String(objTestEvent.ID))).toBeNull(); 
		});

		// Try to delete task bullet, and cancel, check if nothing changed on page/localStorage
		test(`Test${counter()}: Deleting event bullet should delete correct bullet from page/localStorage`, () => {
			const taskDeleteBtn = document.getElementById(objTestTask.ID + '_delete');
			const cancelBtn = document.getElementById('canceldelete');
			// click on delete button, but cancel
			taskDeleteBtn.click();
			cancelBtn.click(); 

			// Check if bullet is still on page
			const timeBulletList = timeList.children[objTaskDate.getHours()].querySelector('ul'); 
			expect(timeBulletList.children.length).toBe(1); 
			expect(document.getElementById(String(objTestTask.ID))).not.toBeNull(); 

			// Check if bullet is still in localStorage
			const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
			expect(arrBulletIDs).toContain(objTestTask.ID);

			expect(localStorage.getItem(String(objTestTask.ID))).not.toBeNull(); 
		});

		// Delete note bullet, check if bullet is gone from page/localstorage
		test(`Test${counter()}: Deleting note bullet should delete correct bullet from page/localStorage`, () => {
			const noteDeleteBtn = document.getElementById(objTestNote.ID + '_delete');
			// click on delete button for note
			noteDeleteBtn.click();

			// Check if bullet is removed from page
			expect(noteSpace.children.length).toBe(2);
			for (let note of noteSpace.children) {
				expect(note.id).not.toMatch(String(objTestNote.ID)); 
			}
			expect(document.getElementById(String(objTestNote.ID))).toBeNull(); 

			// Check if bullet is removed from localStorage
			const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
			expect(arrBulletIDs).toEqual([3, 4, 5, 6]);

			expect(localStorage.getItem(String(objTestNote.ID))).toBeNull(); 
		});
	}); 


});
