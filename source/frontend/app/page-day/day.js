/** This file handles a lot of the event listeners associated with a CRUD
 *  application. It makes sure all created bullets and tags are registered
 *  on the DOM. It also calls on methods from crudFunctions.js to properly
 *  implement the CRUD functions.
 *  TODO: Ability to edit and delete tags
 *  TODO: Fix multi-add bug
 *  TODO: Add note bullet functionality - DONE
 *  TODO: Integrate with firebase backend
 *  TODO: Update outdated crudFunctions calls - Check with Evan when crudFunction was updated
 *  TODO: Account for updated date format - Date navigation works but still needs to use agreed upon hash
 *  TODO: Plan to read url hash: If the hash is empty, just bring us to the current day
 *        Otherwise, load bullets from the date in the urlhash - DONE I think
 */

/* get elements from html page */
/* eslint-env jquery */
// POTENTIALLY OLD
import * as crud from '../../../backend/crudFunctions.js';
import * as utils from '../../utils.js';
import * as globals from '../../globals.js';

const saveBulletBtn = document.getElementById('saveBullet');

// creation inputs
const addBtn = document.getElementById('addBulletBut');
const titleInput = document.getElementById('title');
const startTimeInput = document.getElementById('start_time');
const endTimeInput = document.getElementById('end_time');
const descInput = document.querySelector('[name = "desc"]');

// output of creation for note bullets
const noteOut = document.getElementById('noteSpace');

// deletion stuff
const confirmBox = document.getElementById('deleteBullet');
const confirmBtn = document.getElementById('okConfirm');

// tag creation stuff
const tagBtn = document.getElementById('createtag');
const tagAddBtn = document.getElementById('saveTag');
const tagName = document.getElementById('tagname');

// edit inputs
const editBullet = document.getElementById('EditBullet');
const editSave = document.getElementById('editSaveAdd');
const editTitle = document.getElementById('edittitle');
const editDate = document.getElementById('editdate');
const editDesc = document.getElementById('editdesc');
const editTags = document.getElementById('edittag');

// for the note space box
const noteBtn = document.getElementById('addNote');

// For creating the time table
const timeSegments = document.getElementById('time_list');

// Navigate back to month view
const monthBtn = document.getElementById('curMonth');

// make sure this changes depending on the day you pick
let defMonth = '04';
let defYear = '2021';
let defDay = '01';
const timeStart = 'T00:00';
const timeEnd = 'T23:59';
// generate hash of the day we're in if we don't have one already

const hash = utils.hashString('d', defYear, defMonth, defDay);
utils.updateURL(hash);
const dateHash = utils.readHash(document.location.hash);
// update the date variables we have accordingly and the url
defYear = dateHash.getFullYear();
defMonth = dateHash.getMonth();
defDay = dateHash.getDate();

// set the UI to display the current day
setDay([defMonth, defYear, defDay]);
const curDay = defYear + '-' + defMonth + '-' + defDay;
console.log('Current Day: ' + curDay);

// generate date+time strings to load bullets from
const loadStart = curDay + timeStart;
const loadEnd = curDay + timeEnd;
console.log('Bullet load time start: ' + loadStart);
console.log('Bullet load time end: ' + loadEnd);

// POTENTIALLY OLD
crud.initCrudRuntime();

for (let i = 0; i < 24; i++) {
  timeSegments.appendChild(makeTimeSlotComponent(i));
}

function makeTimeSlotComponent(intTime) {
  let stringTime = String(intTime);
  if (intTime < 10) stringTime = '0' + stringTime;
  const timeSlot = document.createElement('div');
  const timeText = document.createTextNode(`${stringTime}:00`);
  const bulletList = document.createElement('ul');

  timeSlot.appendChild(timeText);
  timeSlot.appendChild(bulletList);
  timeSlot.className = 'time_slot';

  return timeSlot;
}

// TODO: Write a date getter function to pass into here
// TODO: Make sure the date here is all the bullets of the current day we're in
// POTENTIALLY OLD
const bulletsToLoad = crud.getBulletsByDateRange(loadStart, loadEnd);
for (const bullet of bulletsToLoad) {
  if (bullet.type === 'note') {
    console.log('Loading Note bullet');
    // paste bullet on notespace
    noteOut.append(createBulletEntryElem(bullet.ID));
  } else {
    for (let hourIt = 0; hourIt < 24; hourIt++) {
      const hours = document.querySelectorAll('[class = "time_slot"]');
      const curHour = hours[hourIt];
      console.log(curHour);
      let bulHour = bullet.date.toString();
      bulHour = bulHour.substring(10, 12);
      const bulHourNum = parseInt(bulHour);
      if (bulHourNum === hourIt) {
        console.log('pasting bullet from storage to timetable');
        const list = curHour.querySelector('ul');
        if (bullet.type === 'event') {
          list.append(createBulletEntryElem(bullet.ID));
          break;
        } else if (bullet.type === 'task') {
          list.append(createBulletEntryElem(bullet.ID));
          break;
        }
      }
    }
  }
}

addBtn.addEventListener('click', function() {
  console.log('Add button was clicked');
  $('#bujoSpace').modal('toggle');
});

/** Opens create bullet dialog box and saves additions if associated event listener is
 *  triggered
 *  @param {ul element} bulletList the list where we want to append to
 *  @return the created bullet
 * if user confirms, make new bullet and add it to page
 */
saveBulletBtn.addEventListener('click', function() {
  const startTime = startTimeInput.value;
  const startHour = startTime.substring(0, 2);
  const bulStartHour = parseInt(startHour);
  let bulletList;
  for (let hourIt = 0; hourIt < 24; hourIt++) {
    const hours = document.querySelectorAll('[class = "time_slot"]');
    const curHour = hours[hourIt];
    console.log(curHour);
    if (bulStartHour === hourIt) {
      bulletList = curHour.querySelector('ul');
      console.log('found timespace: ' + bulletList);
      break;
    }
  }
  const endTime = endTimeInput.value;
  const endHour = endTime.substring(0, 2);
  const bulEndHour = parseInt(endHour);
  try {
    if (bulStartHour >= bulEndHour) {
      throw new TimeDiscrepancyError('Start Time must come before End Time');
    }
  } catch (err) {
    const errorMessage = document.getElementById('error');
    errorMessage.innerHTML = err.message;
    errorMessage.hidden = false;
    return;
  }
  // make tag array for new bullet
  // POTENTIALLY OLD
  // const newBulletTags = getCheckBoxResults();
  const date = new Date();
  let dateString = JSON.stringify(date);
  dateString = dateString.split('T')[0];
  console.log(dateString);
  const startDate = dateString + 'T' + startTime;
  console.log(startDate);
  const endDate = dateString + 'T' + endTime;
  console.log(endDate);
  // POTENTIALLY OLD
  const newBulletType = getType();
  const newBulletID = crud.createBullet(newBulletType, titleInput.value, startDate, null, descInput.value, endDate);
  console.log(newBulletID);

  console.log('appending event');
  bulletList.append(createBulletEntryElem(newBulletID));
  $('#bujoSpace').modal('toggle');
});

/* on click show new tag box */
tagBtn.addEventListener('click', function() {
  $('#tagcreation').modal('toggle');
});

/* if user confirms making new tag, add it to list */
tagAddBtn.addEventListener('click', function() {
  // add tag's string to list
  // POTENTIALLY OLD
  crud.createTag(tagName.value);
  $('#tagcreation').modal('toggle');
  // maybe add a confirmation box
});

/* on click set confirm button to true */
confirmBtn.addEventListener('click', function() {
  confirmBtn.value = 'true';
});

/** Opens the delete dialog box and listens for delete button to get clicked
 *  @param {bullet} elemEntry the bullet we want to delete
 *  @return null
*/
function openDeleteDialog(elemEntry) {
  confirmBtn.addEventListener('click', function() {
    deleteBulletEntry(elemEntry);
    $('#deleteBullet').modal('toggle');
  });
}

/** Companion function to openDeleteDialog. Removes the event listener and
 *  deletes entry if ok was clicked
 *  @param {bullet} elemEntry the bullet we want to delete
 *  @return null
 */
function deleteBulletEntry(elemEntry) {
  confirmBox.onclose = null;
  if (confirmBtn.value === 'false') return;
  confirmBtn.value = false;
  // POTENTIALLY OLD
  crud.deleteBulletById(elemEntry.id);
  elemEntry.remove();
}

/** Opens edit dialog box and saves edits if the associated event listener is
 *  triggered
 *  @param {bullet} elemEntry the bullet we want to edit
 *  @return a modal to edit a bullet.
*/
function openEditDialog(elemEntry) {
  // POTENTIALLY OLD
  const entryBullet = crud.getBulletById(elemEntry.id);

  editTitle.value = entryBullet.data.title;
  editDate.value = entryBullet.date;
  editDesc.value = entryBullet.data.note;
  editTags.value = entryBullet.tags;

  editSave.addEventListener('click', function() {
    editBulletEntry(elemEntry);
    $('#EditBullet').modal('toggle');
  });
  // TODO:Add functionality to edit type and tags
}

/** Edits a bullet's information and replaces it on storage
 *  @param {bullet} elemEntry the bullet we want to edit
 *  @return the modified bullet in storage and the DOM
 */
function editBulletEntry(elemEntry) {
  // POTENTIALLY OLD
  crud.setBulletAttributes(elemEntry.id, {
    title: editTitle.value,
    note: editDesc.value
  }, null, editDate.value);

  elemEntry.parentNode.replaceChild(createBulletEntryElem(elemEntry.id), elemEntry);

  editBullet.onclose = null;
}

/** helper function to add text to bullet entry
 *  @param {string} strTitle the bullet's title
 *  @param {string} strText the bullet's text
 *  @param {bullet} elemParent tbh no idea what this one does
 *  @return null
 */
function appendTextNode(strTitle, strText, elemParent) {
  const elemBold = document.createElement('b');

  elemBold.append(document.createTextNode(strTitle));
  elemParent.append(elemBold);
  elemParent.append(document.createTextNode(strText));
}

/** helper function to add buttons to bullet entry
 *  @param {string} strDisp what we want the bullet to read on the DOM
 *  @param {string} strStyle the style we want the button in
 *  @param {string} strClass what kind of button
 *  @param {bullet} elemParent the bullet we want to tie the button to
 *  @return a button
 */
function appendButton(strDisp, strStyle, strClass, elemParent) {
  const elemButton = document.createElement('BUTTON');
  const elemText = document.createTextNode(strDisp);

  elemButton.style = strStyle;
  elemButton.className = strClass;
  elemButton.appendChild(elemText);
  elemParent.append(elemButton);

  return elemButton;
}

/** Create a bullet entry element
 *  @param {number} intBulletID - the bullet's numerical ID
 *  @return {li} a list (bullet) object
 */
function createBulletEntryElem(intBulletID) {
  const newEntry = document.createElement('li');
  const div = document.createElement('div');
  // POTENTIALLY OLD
  const bullet = crud.getBulletById(intBulletID);

  newEntry.id = intBulletID;
  div.style = 'margin: 10px; padding: 5px; border: 5px solid black';

  newEntry.append(div);
  if (bullet.type === 'note') {
    div.style = 'border: 0px';
    appendTextNode('', bullet.title, div);
  } else if (bullet.type === 'event') {
    // create and append title of bullet
    appendTextNode('Title: ', bullet.title, div);

    // create and append description for bullet
    appendTextNode(' Note: ', bullet.note, div);

    // create and append bullet's tags
    appendTextNode(' Tags: ', bullet.tags, div);
  } else {
    appendTextNode('Title: ', bullet.title, div);
  }
  // create and append edit button
  const editButton = appendButton('', '', 'btn-sm btn-primary circleButts', div);
  editButton.innerHTML = '<i class="fas fa-pen"></i>';
  editButton.addEventListener('click', () => {
    $('#EditBullet').modal('toggle');
    openEditDialog(newEntry);
  });

  // create and append delete button
  const deleteButton = appendButton('', '', 'btn-sm btn-danger circleButts', div);
  deleteButton.innerHTML = '<i class="fas fa-trash">';
  deleteButton.addEventListener('click', () => {
    $('#deleteBullet').modal('toggle');
    openDeleteDialog(newEntry);
  });

  return newEntry;
}

/** Generates a month, year, and day given a url hash
 *  @param {string} hash the url hash
 *  @return the month, year, and day that we're in
 *
function getCurrentDay(urlHash) {
  let curMonth;
  let curYear;
  let curDay;

  // parse the hash
  const day = utils.readHash(urlHash);
  curMonth = day.getMonth();
  curYear = day.getFullYear();
  curDay = day.getDate();

  // return the date
  console.log('Month: ' + curMonth + ' ' + 'Year: ' + curYear + ' ' + 'Day: ' + curDay);
  return [curMonth, curYear, curDay];
}

/** TODO: Make this function work with new hash system
 *  Generates a hash based on either:
 *  1. The URL we inherited from
 *  2. Today's date
 *  3. A default date
 *  @param {boolean} onload tells us whether we are inheriting a URL or not
 *  @return a hash that tells us which month, year, and day we're in
 *
function generateHash(onload = true) {
  let currentURL = document.URL;
  if (onload)
  {
    if (!currentURL.includes('#')) //do nothing
    {
      const url = new URL(document.URL);
      const date = new Date();
      url.hash = utils.hashString('w', date.getFullYear(), date.getMonth(), date.getDate());
      document.location.href = url.href;
    }
  }
  else
  {
    const url = new URL(document.URL);
    url.hash = utils.hashString('m', defMonth, defYear);
    document.location.href = url.href;
  }
}
*/

/** Updates the url of the page we are in based on the given hash
 *  @param {string} hash the hash we want to update our url with
 *  @return null
 *
function updateURL(hash) {
  const url = new URL(document.URL);
  url.hash = hash;
  document.location.href = url.href;
}
*/

/** Sets the day view's date-related variables
 *  NOTE: params may actually be in string format rather than int
 *  @param {Number} month the month of the current day
 *  @param {Number} year the year of the current day
 *  @param {Number} day the day of the current day
 *  @param {Number} week the weekday of the current day
 *  @return null
 */
function setDay([month, year, day]) {
  const curMonth = month;
  const curYear = year;
  const curDay = day;

  // Update month
  const monthDisplay = document.getElementById('curMonth');
  console.log(monthDisplay);
  monthDisplay.innerHTML = globals.MONTH_NAMES_LONG[curMonth];

  // Update date
  const dateDisplay = document.getElementById('date');
  dateDisplay.innerHTML = curMonth + '/' + curDay + '/' + curYear;
  console.log(dateDisplay);

  // Update weekday
  const weekDisplay = document.getElementById('week_day');
  let weekDay = getWeekday([curMonth, curYear, curDay]);
  weekDay = Math.round(weekDay) % 7;
  weekDisplay.innerHTML = globals.WEEK_NAMES_LONG[weekDay];
}

/** Gets the current day of the week based on the day's month,
 *  day and year.
 *  Credit for week calculation formula:
 *  https://www.geeksforgeeks.org/find-day-of-the-week-for-a-given-date/
 *  @param {String} month the month of hte current day;
 *  @param {String} year the year of the current day
 *  @param {String} day the day of the current year
 *  @return the current weekday in number form
 */
function getWeekday([month, year, day]) {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  let y = year;
  y -= (month < 3) ? 1 : 0;
  return (y + y / 4 - y / 100 + y / 400 + t[month - 1] + day) % 7;
}

// Open option to create a note bullet on the note space
// if you click this button
noteBtn.addEventListener('click', function() {
  // Take things one at a time when creating note bullets
  noteBtn.disabled = true;
  const notespace = document.getElementById('noteSpace');

  // Create a text input field to create bullet
  const note = document.createElement('input');
  note.type = 'text';
  notespace.appendChild(note);

  // Create a cancel button for when you realize note-taking is stupid
  const cancel = document.createElement('button');
  cancel.innerHTML = 'Cancel';
  notespace.appendChild(cancel);
  cancel.addEventListener('click', function() {
    noteBtn.disabled = false;
    notespace.removeChild(note);
    notespace.removeChild(cancel);
  });

  // Create note bullet
  let time = new Date();
  let date = new Date();
  note.addEventListener('keypress', function(e) {
    // Hit enter to actually save the thing. Is it intuitive enough?
    if (e.key === 'Enter') {
      time = 'T01:00';
      date = curDay + time;
      const newBulletID = crud.createBullet(
        { title: note.value, note: null },
        'Note',
        date,
        null
      );
      // create the bullet element and destroy the input text + cancel button
      notespace.append(createBulletEntryElem(newBulletID));
      notespace.removeChild(note);
      notespace.removeChild(cancel);

      // reenable the create note button
      noteBtn.disabled = false;
    }
  });
});

// This button takes you back to the month calendar
monthBtn.addEventListener('click', function() {
  const root = document.URL.split('/')[2];
  document.location.hash = utils.hashString('m', defYear, defMonth);
  const path = 'http://' + root + '/source/frontend/app/page-calendar-monthly/calendar.html';
  document.location = path;
});

/** loads tags from storage
 *  @return null
 *
function fillRunTimeTags() {
  const tags = localStorage.getItem('tags');
  if (tagList == null || tagList === 'null') {
    tagList = [];
  }
  console.log('loaded tags: ', tagList);
}

/** Creates a checklist in the dialog form of all the tags we have established in tagList
 *  @return null
 *
function updateTags() {
  // taglist is already defined
  const checkList = document.getElementById('tags');
  for (const tag in tagList) {
    // create checkbox
    const options = document.createElement('input');

    // specify element attributes
    options.setAttribute('type', 'checkbox');
    options.setAttribute('value', tagList[tag]);
    options.setAttribute('name', tagList[tag]);

    // create label for checkbox and define attributes
    const label = document.createElement('label');
    label.setAttribute('for', tagList[tag]);

    // append text to the label
    label.appendChild(document.createTextNode(tagList[tag]));

    // append checkbox and label to the form
    checkList.appendChild(options);
    checkList.appendChild(label);
  }
}

/** Get the results of the created tag checkboxes to display on the CRUD app.
 *  @returns an array containing the names of all tags that the user selected
 *
// this function takes the user's specified tag entries and loads it onto the bullet object we are creating
function getCheckBoxResults() {
  const chosenTags = [];
  if (tagList.size === 0) {
    return chosenTags;
  }

  const options = document.querySelectorAll('input[type = "checkbox"]:checked');
  for (const checkbox of options) {
    chosenTags.push(checkbox.value);
  }
  return chosenTags;
}
*/
class TimeDiscrepancyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GlobalError';
  }
}

/** Gets a bullet's selected type from the creation dialog
 *  @returns The bullet's selected type
 */
export function getType() {
  const opt = document.getElementById('type').value;
  return opt;
}
