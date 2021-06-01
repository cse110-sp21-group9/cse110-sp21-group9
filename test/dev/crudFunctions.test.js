import * as crud from '../../source/backend/crudFunctions.js';
import * as utils from '../testutils.js'

let counter = utils.makeTestCounter(1);

describe('Unit Tests for CRUD Backend API', () => {
  const objEventDate = new Date(2021, 5, 20);
  const objNoteDate = new Date(2021, 3, 10);
  const objTaskDate = new Date(2021, 6, 10);
  const objStartDate = new Date(2021, 3, 21);
  const objDueDate = new Date(2021, 5, 22);
  const objEndDate = new Date(2021, 7, 10);
  const strTestTag = 'UCSD'
  const strTestTag2 = 'work'

  const objTestEvent = {
    ID: null,
    title: 'TestEvnt',
    type: 'Event',
    date: objEventDate,
    tags: [strTestTag],
    content: 'Evntcntnt',
    dueDate: objDueDate,
    status: null
  };
  const objTestNote = {
    ID: null,
    title: 'TestNt',
    type: 'Note',
    date: objNoteDate,
    tags: [strTestTag],
    content: 'Ntcntnt',
    dueDate: null,
    status: null
  };
  const objTestTask = {
    ID: null,
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
  });


  // Initcrudruntime
  test(`Test${counter()}: initCrudRuntime() intiializes correct values`, () => {
    crud.initCrudRuntime();
    const lastID = localStorage.getItem('lastID');
    const bulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
    const tags = JSON.parse(localStorage.getItem('tags'));
    expect(lastID).toMatch('0');
    expect(bulletIDs).toEqual([]);
    expect(tags).toEqual({});
  });

  // createTag
  test(`Test${counter()}: createTag creates correct tag`, () => {
    crud.createTag(strTestTag);
    const objTags = JSON.parse(localStorage.getItem('tags'));
    expect(objTags[strTestTag]).toBeTruthy();
    expect(objTags['SDSU']).toBeUndefined();
  });

  // createBullet(event)
  test(`Test${counter()}: createBullet() creates correct event bullet`, () => {
    const objReturnBullet = crud.createBullet(objTestEvent.type, objTestEvent.title, objTestEvent.date, objTestEvent.tags, objTestEvent.content, { dueDate: objTestEvent.dueDate });
    const lastID = Number(localStorage.getItem('lastID'));
    objTestEvent.ID = lastID;
    expect(objReturnBullet).toEqual(objTestEvent);

    const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs).toContain(lastID);

    const objEventBullet = JSON.parse(localStorage.getItem(lastID));
    expect(objEventBullet.title).toMatch(objTestEvent.title);
    expect(objEventBullet.type).toMatch(objTestEvent.type);
    expect(objEventBullet.date).toMatch(objTestEvent.date.toISOString());
    expect(objEventBullet.tags).toEqual(objTestEvent.tags);
    expect(objEventBullet.content).toMatch(objTestEvent.content);
    expect(objEventBullet.dueDate).toMatch(objTestEvent.dueDate.toISOString());
  });

  // createBullet(note) 
  test(`Test${counter()}: createBullet() creates correct note bullet`, () => {
    const objReturnBullet = crud.createBullet(objTestNote.type, objTestNote.title, objTestNote.date, objTestNote.tags, objTestNote.content);
    const lastID = Number(localStorage.getItem('lastID'));
    objTestNote.ID = lastID;
    expect(objReturnBullet).toEqual(objTestNote);

    const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs).toContain(lastID);

    const objNoteBullet = JSON.parse(localStorage.getItem(lastID));
    expect(objNoteBullet.title).toMatch(objTestNote.title);
    expect(objNoteBullet.type).toMatch(objTestNote.type);
    expect(objNoteBullet.date).toMatch(objTestNote.date.toISOString());
    expect(objNoteBullet.tags).toEqual(objTestNote.tags);
    expect(objNoteBullet.content).toMatch(objTestNote.content);
  });

  // createBullet(task) 
  test(`Test${counter()}: createBullet() creates correct task bullet`, () => {
    const objReturnBullet = crud.createBullet(objTestTask.type, objTestTask.title, objTestTask.date, objTestTask.tags, objTestTask.content, { dueDate: objTestTask.dueDate, status: objTestTask.status });
    const lastID = Number(localStorage.getItem('lastID'));
    objTestTask.ID = lastID;
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

  // getAvailableTags
  test(`Test${counter()}: getAvailableTags() returns correct tags`, () => {
    let arrTags = crud.getAvailableTags();
    expect(arrTags).toContain(strTestTag);
    expect(arrTags).not.toContain(strTestTag2);
  });

  // getBulletById
  test(`Test${counter()}: getBulletByID() returns correct bullet`, () => {
    const objEventBullet = crud.getBulletById(1);
    expect(objEventBullet.title).toMatch(objTestEvent.title);
    expect(objEventBullet.type).toMatch(objTestEvent.type);
    expect(objEventBullet.date.getTime()).toBe(objTestEvent.date.getTime());
    expect(objEventBullet.tags).toEqual(objTestEvent.tags);
    expect(objEventBullet.content).toMatch(objTestEvent.content);
    expect(objEventBullet.dueDate.getTime()).toBe(objTestEvent.dueDate.getTime());
  });


  // getBulletsByTag
  test(`Test${counter()}: getBulletsByTag() returns bullets with correct tags`, () => {
    const arrBullets = crud.getBulletsByTag(strTestTag);
    for (let bulletObj of arrBullets) {
      expect(bulletObj.tags).toContain(strTestTag);
    }
  });

  // getEventBulletsByTag
  test(`Test${counter()}: getEventBulletsByTag() returns events with correct tags`, () => {
    const arrBullets = crud.getEventBulletsByTag(strTestTag);
    for (bulletObj of arrBullets) {
      expect(bulletObj.type).toMatch('Event');
      expect(bulletObj.tags).toContain(strTestTag);
    }
  });

  // getNoteBulletsByTag
  test(`Test${counter()}: getNoteBulletsByTag() returns events with correct tags`, () => {
    const arrBullets = crud.getNoteBulletsByTag(strTestTag);
    for (bulletObj in arrBullets) {
      expect(bulletObj.type).toMatch('Note');
      expect(bulletObj.tags).toContain(strTestTag);
    }
  });

  // getTaskBulletsByTag
  test(`Test${counter()}: getTaskBulletsByTag() returns events with correct tags`, () => {
    const arrBullets = crud.getTaskBulletsByTag(strTestTag);
    for (bulletObj in arrBullets) {
      expect(bulletObj.type).toMatch('Task');
      expect(bulletObj.tags).toContain(strTestTag);
    }
  });

  // getBulletsByDateRange
  test(`Test${counter()}: getBulletsByDateRange() returns bullets with correct dates`, () => {
    const arrBullets = crud.getBulletsByDateRange(objStartDate, objEndDate);
    let startTime = objStartDate.getTime();
    let endTime = objEndDate.getTime();
    for (let bulletObj of arrBullets) {
      expect(bulletObj.date.getTime()).toBeGreaterThanOrEqual(startTime);
      expect(bulletObj.date.getTime()).toBeLessThanOrEqual(endTime);
    }
  });


  // getBulletsByDateSpan
  test(`Test${counter()}: getBulletsByDateSpan() returns bullets with correct span`, () => {
    const arrBullets = crud.getBulletsByDateSpan(objEventDate, objDueDate);
    let startTime = objEventDate.getTime();
    let endTime = objDueDate.getTime();
    for (let bulletObj of arrBullets) {
      expect(bulletObj.date.getTime()).toBe(startTime);
      expect(bulletObj.dueDate.getTime()).toBe(endTime);
    }
  });

  // getEventBulletsByDateRange
  test(`Test${counter()}: getEventBulletsByDateRange() returns events with correct dates`, () => {
    const arrBullets = crud.getEventBulletsByDateRange(objStartDate, objEndDate);
    let startTime = objStartDate.getTime();
    let endTime = objEndDate.getTime();
    for (let bulletObj of arrBullets) {
      expect(bulletObj.type).toMatch('Event');
      expect(bulletObj.date.getTime()).toBeGreaterThanOrEqual(startTime);
      expect(bulletObj.date.getTime()).toBeLessThanOrEqual(endTime);
    }
  });

  // getNoteBulletsByDateRange
  test(`Test${counter()}: getNoteBulletsByDateRange() returns notes with correct dates`, () => {
    const arrBullets = crud.getNoteBulletsByDateRange(objStartDate, objEndDate);
    let startTime = objStartDate.getTime();
    let endTime = objEndDate.getTime();
    for (let bulletObj of arrBullets) {
      expect(bulletObj.type).toMatch('Note');
      expect(bulletObj.date.getTime()).toBeGreaterThanOrEqual(startTime);
      expect(bulletObj.date.getTime()).toBeLessThanOrEqual(endTime);
    }
  });

  // getTaskBulletsByDateRange
  test(`Test${counter()}: getTaskBulletsByDateRange() returns tasks with correct dates`, () => {
    const arrBullets = crud.getEventBulletsByDateRange(objStartDate, objEndDate);
    let startTime = objStartDate.getTime();
    let endTime = objEndDate.getTime();
    for (bulletObj of arrBullets) {
      expect(bulletObj.type).toMatch('Task');
      expect(bulletObj.date.getTime()).toBeGreaterThanOrEqual(startTime);
      expect(bulletObj.date.getTime()).toBeLessThanOrEqual(endTime);
    }
  });

  // setBulletTitle
  test(`Test${counter()}: setBulletTitle() sets correct title`, () => {
    const arrBulletIDs1 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    const objReturnBullet = crud.setBulletTitle(objTestEvent.ID, objTestNote.title);
    expect(objReturnBullet.title).toMatch(objTestNote.title);
    
    const arrBulletIDs2 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs1).toEqual(arrBulletIDs2); 
    const objLocalBullet = JSON.parse(localStorage.getItem(objTestEvent.ID));
    expect(objLocalBullet.title).toMatch(objTestNote.title);
  });

  // setBulletDate
  test(`Test${counter()}: setBulletDate() sets correct date`, () => {
    const arrBulletIDs1 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    const objReturnBullet = crud.setBulletDate(objTestEvent.ID, objTestNote.date);
    expect(objReturnBullet.date.getTime()).toBe(objTestNote.date.getTime());
    
    const arrBulletIDs2 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs1).toEqual(arrBulletIDs2); 
    const objLocalBullet = JSON.parse(localStorage.getItem(objTestEvent.ID));
    expect(objLocalBullet.date).toMatch(objTestNote.date.toISOString());
  });

  // setBulletContent
  test(`Test${counter()}: setBulletContent() sets correct content`, () => {
    const arrBulletIDs1 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    const objReturnBullet = crud.setBulletContent(objTestEvent.ID, objTestNote.content);
    expect(objReturnBullet.content).toMatch(objTestNote.content);

    const arrBulletIDs2 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs1).toEqual(arrBulletIDs2);
    const objLocalBullet = JSON.parse(localStorage.getItem(objTestEvent.ID));
    expect(objLocalBullet.content).toMatch(objTestNote.content);
  });

  // setBulletDueDate
  test(`Test${counter()}: setBulletDueDate() sets correct due Date`, () => {
    const arrBulletIDs1 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    const objReturnBullet = crud.setBulletDueDate(objTestEvent.ID, objTestTask.dueDate);
    expect(objReturnBullet.dueDate.getTime()).toBe(objTestTask.dueDate.getTime());

    const arrBulletIDs2 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs1).toEqual(arrBulletIDs2);
    const objLocalBullet = JSON.parse(localStorage.getItem(objTestEvent.ID));
    expect(objLocalBullet.dueDate).toMatch(objTestTask.dueDate.toISOString());
  });

  // setBulletStatus
  test(`Test${counter()}: setBulletStatus() sets correct status`, () => {
    const arrBulletIDs1 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    const testStatus = 'over';
    const objReturnBullet = crud.setBulletStatus(objTestTask.ID, testStatus);
    expect(objReturnBullet.status).toMatch(testStatus);

    const arrBulletIDs2 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs1).toEqual(arrBulletIDs2);
    const objLocalBullet = JSON.parse(localStorage.getItem(objTestTask.ID));
    expect(objLocalBullet.status).toMatch(testStatus);
  });

  // addBulletTag 
  test(`Test${counter()}: addBulletTag() adds correct tag to bullet`, () => {
    const arrBulletIDs1 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    crud.createTag(strTestTag2);
    const objReturnBullet = crud.addBulletTag(objTestEvent.ID, strTestTag2);
    expect(objReturnBullet.tags).toContain(strTestTag2);

    const arrBulletIDs2 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs1).toEqual(arrBulletIDs2);
    const objLocalBullet = JSON.parse(localStorage.getItem(objTestEvent.ID));
    expect(objLocalBullet.tags).toEqual(objReturnBullet.tags);
  });

  // removeBulletTag
  test(`Test${counter()}: removeBulletTag() removes correct tag from bullet`, () => {
    const arrBulletIDs1 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    const objReturnBullet = crud.removeBulletTag(objTestEvent.ID, strTestTag2);
    expect(objReturnBullet).not.toContain(strTestTag2);

    const arrBulletIDs2 = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs1).toEqual(arrBulletIDs2);
    const objLocalBullet = JSON.parse(localStorage.getItem(objTestEvent.ID));
    expect(objLocalBullet.tags).toEqual(objReturnBullet.tags);
  });

  // removeTagGlobally 
  test(`Test${counter()}: removeTagGlobally removes correct tag globally`, () => {
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
  
  // deleteBulletById
  test(`Test${counter()}: deleteBulletById removes correct bullet`, () => {
    crud.deleteBulletById(objTestEvent.ID) 

    const arrBulletIDs = JSON.parse(localStorage.getItem('bulletIDs')).array;
    expect(arrBulletIDs).not.toContain(objTestEvent.ID); 
    expect(localStorage.getItem(objTestEvent.ID)).toBeNull();  
  });
});
