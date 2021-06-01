import * as crud from '../../source/backend/crudFunctions.js';
import * as utils from '../testutils.js'

let counter = utils.makeTestCounter(1);

describe('Unit Tests for CRUD Backend API, parsing bullets from local storage', () => {
  const objEventDate = new Date(2021, 5, 20);
  const objNoteDate = new Date(2021, 3, 10);
  const objTaskDate = new Date(2021, 6, 10);
  const objDueDate = new Date(2021, 5, 22);
  const objEndDate = new Date(2021, 7, 10);
  const strTestTag = 'UCSD'

  const objTestEvent = {
    ID: 1,
    title: 'TestEvnt',
    type: 'Event',
    date: objEventDate,
    tags: [strTestTag],
    content: 'Evntcntnt',
    dueDate: objDueDate,
    status: null
  };
  const objTestNote = {
    ID: 2,
    title: 'TestNt',
    type: 'Note',
    date: objNoteDate,
    tags: [strTestTag],
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
    dueDate: objEndDate,
    status: 'done'
  };

  beforeAll(() => {
    global.localStorage = new utils.LocalStorageMock();
		localStorage.setItem('bulletIDs', JSON.stringify({ array: [objTestEvent.ID, objTestNote.ID] }));
		localStorage.setItem(objTestEvent.ID, JSON.stringify(objTestEvent)); 
		localStorage.setItem(objTestNote.ID, JSON.stringify(objTestNote)); 
		localStorage.setItem('lastID', objTestNote.ID);
		localStorage.setItem('tags', JSON.stringify({[strTestTag]: true})); 
  });

	// Initcrudruntime/tags
	test(`Test${counter()}: initCrudRuntime() intiializes correct tags from localStorage`, () => {
		crud.initCrudRuntime();
		const tags = crud.getAvailableTags();
		expect(tags).toEqual([strTestTag]);
	});

	// Loaded bullets
	test(`Test${counter()}: Correct bullets were loaded from localStorage`, () => {
		const objReturnEvent = crud.getBulletById(objTestEvent.ID);
		expect(objReturnEvent).toEqual(objTestEvent);

		const objReturnNote = crud.getBulletById(objTestNote.ID);
		expect(objReturnNote).toEqual(objTestNote);
	});

	// RunTime bullets
  test(`Test${counter()}: Runtime bullets are correct`, () => {
    const arrBulletIDs1 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    crud.removeTagGlobally(strTestTag);

    const arrBulletIDs2 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs1).toEqual(arrBulletIDs2);
    for (let id of arrBulletIDs2) {
      let objLocalBullet = JSON.parse(localStorage.getItem(id));
      expect(objLocalBullet.tags).not.toContain(strTestTag);
    }
    const tags = JSON.parse(localStorage.getItem('tags'));
    expect(tags[strTestTag]).toBeUndefined();
  });

	// lastID
	test(`Test${counter()}: correct lastID was loaded from local storage`, () => {
    const objReturnBullet = crud.createBullet(objTestTask.type, objTestTask.title, objTestTask.date, objTestTask.tags, objTestTask.content, { dueDate: objTestTask.dueDate, status: objTestTask.status});
		const lastID = Number(localStorage.getItem('lastID'));
		expect(objReturnBullet).toEqual(objTestTask);

    const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs).toContain(lastID);

    const objTaskBullet = JSON.parse(localStorage.getItem(lastID));
    expect(objTaskBullet.title).toMatch(objTestTask.title);
    expect(objTaskBullet.type).toMatch(objTestTask.type);
    expect(objTaskBullet.date).toMatch(objTestTask.date.toISOString());
    expect(objTaskBullet.tags).toEqual(objTestTask.tags);
    expect(objTaskBullet.content).toMatch(objTestTask.content);
    expect(objTaskBullet.dueDate).toMatch(objTestTask.dueDate.toISOString());
    expect(objTaskBullet.status).toMatch(objTestTask.status);
  });


}); 