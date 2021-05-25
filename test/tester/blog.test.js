/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');
global.$ = require('jquery');
$.fn.modal = jest.fn();

describe('Basic unit tests for CRUD page', () => {
  const testDate = '2020-06-12T19:30';
  const testDate2 = '2021-07-23T08:15';
  let contentHtml;
  beforeAll(() => {
    contentHtml = fs.readFileSync(path.resolve(__dirname, '../../source/frontend/app/page-journal/page-CRUD.html'), 'utf-8');
    document.documentElement.innerHTML = contentHtml;

    require('../../source/frontend/app/page-journal/crudFunctions.js');
    require('../../source/frontend/app/page-journal/blog.js');

    class LocalStorageMock {
      constructor() {
        this.store = {};
      }

      clear() {
        this.store = {};
      }

      getItem(key) {
        return this.store[key] || null;
      }

      setItem(key, value) {
        this.store[key] = String(value);
      }

      removeItem(key) {
        delete this.store[key];
      }
    };

    global.localStorage = new LocalStorageMock();
  });

  // DOM Unit Test 1: Tag modal creates correct tag
  test('Test1: Tag modal creates correct tag', () => {
    document.getElementById('createtag').click();
    document.getElementById('tagname').value = 'testTag';
    document.getElementById('saveTag').click();
    expect(document.querySelector('#tags > input').value).toMatch('testTag');
  });

  // DOM Unit Test 2: Bullet modal creates correct event bullet
  test('Test2: Bullet modal creates correct event bullet', () => {
    // Create event bullet
    document.getElementById('addBulletBut').click();
    document.getElementById('title').value = 'Test Event 1';
    document.getElementById('type').value = 'Event';
    document.getElementById('time').value = testDate;
    document.querySelector('#title ~ textarea').value = 'waaaarghbobo';
    document.querySelector('#tags > input').checked = true;

    // Check to see if creation went through
    document.getElementById('saveAdd').click();
    const eventList = document.querySelector('#eventlist');
    expect(eventList.children.length).toBe(1);
    const bulletItem = eventList.children[0];
    const bulletContent = bulletItem.children[0].textContent;
    expect(bulletContent).toMatch('Test Event 1');
    expect(bulletContent).toMatch('event');
    expect(bulletContent).toMatch(testDate);
    expect(bulletContent).toMatch('waaaarghbobo');
    expect(bulletContent).toMatch('testTag');
  });

  // DOM Unit Test 3: Bullet modal creates correct task bullet
  test('Test3: Bullet modal creates correct task bullet', () => {
    // Create task bullet
    document.getElementById('addBulletBut').click();
    document.getElementById('title').value = 'Test Task 1';
    document.getElementById('type').value = 'Task';
    document.getElementById('time').value = testDate;
    document.querySelector('#title ~ textarea').value = 'asdfasdf';
    document.querySelector('#tags > input').checked = false;
    document.getElementById('saveAdd').click();

    // Check to see if creation went through
    const taskList = document.querySelector('#tasklist');
    expect(taskList.children.length).toBe(1);
    const bulletItem = taskList.children[0];
    const bulletContent = bulletItem.children[0].textContent;
    expect(bulletContent).toMatch('Test Task 1');
    expect(bulletContent).toMatch('task');
    expect(bulletContent).toMatch(testDate);
    expect(bulletContent).toMatch('asdfasdf');
    expect(bulletContent).not.toMatch('testTag');
  });

  // DOM Unit Test 4: Bullet modal creates correct note bullet
  test('Test4: Bullet modal creates correct note bullet', () => {
    // Create note bullet
    document.getElementById('addBulletBut').click();
    document.getElementById('title').value = 'Test Note 1';
    document.getElementById('type').value = 'Note';
    document.getElementById('time').value = testDate;
    document.querySelector('#title ~ textarea').value = 'jkl;jkl;';
    document.getElementById('saveAdd').click();

    // Check to see if creation went through
    const noteList = document.querySelector('#notelist');
    expect(noteList.children.length).toBe(1);
    const bulletItem = noteList.children[0];
    const bulletContent = bulletItem.children[0].textContent;
    expect(bulletContent).toMatch('Test Note 1');
    expect(bulletContent).toMatch('note');
    expect(bulletContent).toMatch(testDate);
    expect(bulletContent).toMatch('jkl;jkl;');
    expect(bulletContent).not.toMatch('testTag');
  });

  // DOM Unit Test 5: Bullet modal creates correct second event bullet
  test('Test5: Bullet modal creates correct second event bullet', () => {
    // Create 2nd event bullet
    document.getElementById('addBulletBut').click();
    document.getElementById('title').value = 'Test Event 2';
    document.getElementById('type').value = 'Event';
    document.getElementById('time').value = testDate;
    document.querySelector('#title ~ textarea').value = 'waaaarghbobo2';
    document.getElementById('saveAdd').click();

    // Check if creation went through
    const eventList = document.querySelector('#eventlist');
    expect(eventList.children.length).toBe(2);
    const bulletItem = eventList.children[1];
    const bulletContent = bulletItem.children[0].textContent;
    expect(bulletContent).toMatch('Test Event 2');
    expect(bulletContent).toMatch('event');
    expect(bulletContent).toMatch(testDate);
    expect(bulletContent).toMatch('waaaarghbobo2');
    expect(bulletContent).not.toMatch('testTag');
  });

  // DOM Unit Test 6: Edit button edits correct event bullet
  test('Test6: Edit button edits correct event bullet', () => {
    const eventList = document.querySelector('#eventlist');
    const bulletItem = eventList.children[0];
    const bulletEditBut = bulletItem.querySelectorAll('button')[0];

    // Edit the event bullet
    bulletEditBut.click();
    document.getElementById('edittitle').value = 'Edit Event 1';
    document.getElementById('editdate').value = testDate2;
    document.getElementById('editdesc').value = 'editwaaaarghbobo';
    document.querySelector('#edittag > input').checked = false;
    document.getElementById('editSaveAdd').click();

    // Check to see if the edit went through
    const newBulletItem = eventList.children[0];
    const bulletContent = newBulletItem.children[0].textContent;
    expect(bulletContent).toMatch('Edit Event 1');
    expect(bulletContent).toMatch('event');
    expect(bulletContent).toMatch(testDate2);
    expect(bulletContent).toMatch('editwaaaarghbobo');
    expect(bulletContent).not.toMatch('testTag');
  });

  // DOM Unit Test 7: Edit button edits correct task bullet
  test('Test7: Edit button edits correct task bullet', () => {
    const taskList = document.querySelector('#tasklist');
    const bulletItem = taskList.children[0];
    const bulletEditBut = bulletItem.querySelectorAll('button')[0];

    // Edit the task bullet
    bulletEditBut.click();
    document.getElementById('edittitle').value = 'Edit Task 1';
    document.getElementById('editdate').value = testDate2;
    document.getElementById('editdesc').value = 'editasdfasdf';
    document.querySelector('#edittag > input').checked = true;
    document.getElementById('editSaveAdd').click();

    // Check to see if the edit went through
    const newBulletItem = taskList.children[0];
    const bulletContent = newBulletItem.children[0].textContent;
    expect(bulletContent).toMatch('Edit Task 1');
    expect(bulletContent).toMatch('task');
    expect(bulletContent).toMatch(testDate2);
    expect(bulletContent).toMatch('editasdfasdf');
    expect(bulletContent).toMatch('testTag');
  });

  // DOM Unit Test 8: Edit button edits correct note bullet
  test('Test8: Edit button edits correct note bullet', () => {
    const noteList = document.querySelector('#notelist');
    const bulletItem = noteList.children[0];
    const bulletEditBut = bulletItem.querySelectorAll('button')[0];

    // Edit the note bullet
    bulletEditBut.click();
    document.getElementById('edittitle').value = 'Edit Note 1';
    document.getElementById('editdate').value = testDate2;
    document.getElementById('editdesc').value = 'editjkl;jkl;';
    document.querySelector('#edittag > input').checked = true;
    document.getElementById('editSaveAdd').click();

    // Check to see if the edit went through
    const newBulletItem = noteList.children[0];
    const bulletContent = newBulletItem.children[0].textContent;
    expect(bulletContent).toMatch('Edit Note 1');
    expect(bulletContent).toMatch('note');
    expect(bulletContent).toMatch(testDate2);
    expect(bulletContent).toMatch('editjkl;jkl;');
    expect(bulletContent).toMatch('testTag');
  });

  // DOM Unit Test 9: Delete button deletes correct event bullet
  test('Test9: Delete button deletes correct event bullet', () => {
    const eventList = document.querySelector('#eventlist');
    const bulletItem = eventList.children[0];
    const bulletDeleteBut = bulletItem.querySelectorAll('button')[1];

    // Delete the event bullet
    bulletDeleteBut.click();
    document.getElementById('okConfirm').click();

    // Check to see if the delete went through
    expect(eventList.children.length).toBe(1);
    const newBulletItem = eventList.children[0];
    const bulletContent = newBulletItem.children[0].textContent;
    expect(bulletContent).toMatch('Test Event 2');
    expect(bulletContent).toMatch('event');
    expect(bulletContent).toMatch(testDate);
    expect(bulletContent).toMatch('waaaarghbobo2');
    expect(bulletContent).not.toMatch('testTag');
  });

  // DOM Unit Test 10: Delete button deletes correct task bullet
  test('Test10: Delete button deletes correct task bullet', () => {
    const taskList = document.querySelector('#tasklist');
    const bulletItem = taskList.children[0];
    const bulletDeleteBut = bulletItem.querySelectorAll('button')[1];

    // Delete the task bullet
    bulletDeleteBut.click();
    document.getElementById('okConfirm').click();

    // Check to see if the delete went through
    expect(taskList.children.length).toBe(0);
  });

  // DOM Unit Test 11: Delete button deletes correct note bullet
  test('Test11: Delete button deletes correct note bullet', () => {
    const noteList = document.querySelector('#notelist');
    const bulletItem = noteList.children[0];
    const bulletDeleteBut = bulletItem.querySelectorAll('button')[1];

    // Delete the note bullet
    bulletDeleteBut.click();
    document.getElementById('okConfirm').click();

    // Check to see if delete went through
    expect(noteList.children.length).toBe(0);
  });
});
