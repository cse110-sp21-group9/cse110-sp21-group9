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
const contentInput = document.querySelector('[name = "desc"]');
const hourInput = document.getElementById('hour');
const AMPMInput = document.getElementById('AMPM');
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
const editHour = document.getElementById('edithour');
const editAMPM = document.getElementById('editAMPM');
const editDesc = document.getElementById('editdesc');
const editTags = document.getElementById('edittag');

// for the note space box
const noteBtn = document.getElementById('addNote');

// For creating the time table
const timeSegments = document.getElementById('time_list');

const createBulletButton = document.getElementById('addBullet');
const tagSelectionOptions = document.getElementById('tagSelect');
const timeSlots = [];

// generate hash of the day we're in if we don't have one already
if (!document.URL.includes('#')) {
  const url = new URL(document.URL);
  const date = new Date();
  url.hash = utils.hashString('d', date.getFullYear(), date.getMonth() + 1, date.getDate());
  document.location.href = url.href;
}

// set date by url hash
const pageDate = utils.readHash(document.location.hash);
const monthName = globals.MONTH_NAMES_LONG[pageDate.getMonth()];
const dayName = globals.DAY_NAMES_LONG[pageDate.getDay()];

// Update date
document.getElementById('date').innerHTML = monthName + ' ' + pageDate.getDate();
document.getElementById('week_day').innerHTML = dayName;

// init crud
crud.initCrudRuntime();
loadTags();

// make timeslots
for (let i = 0; i < 24; i++) {
  const timeSlot = makeTimeSlotComponent(i);
  timeSegments.appendChild(timeSlot);

  timeSlots.push(document.getElementById('time_slot' + String(i)));
}

function makeTimeSlotComponent(intTime) {
  let stringTime = String(intTime);
  if (intTime < 10) stringTime = '0' + stringTime;
  const timeSlot = document.createElement('div');
  const timeText = document.createTextNode(`${stringTime}:00`);
  const bulletList = document.createElement('ul');
  bulletList.id = 'time_slot' + String(intTime);

  timeSlot.appendChild(timeText);
  timeSlot.appendChild(bulletList);
  timeSlot.className = 'time_slot';

  return timeSlot;
}

// Populate time selectors 1- 12
// 12:00 - 0, everything else is normal
// Add 12 to final time if AMPM input is PM
let opt = document.createElement('option');
opt.value = 0;
opt.innerHTML = '12:00';
hourInput.appendChild(opt);
for (let i = 1; i < 12; i++) {
  opt = document.createElement('option');
  opt.value = i;
  opt.innerHTML = i + ':00';
  hourInput.appendChild(opt);
}

opt = document.createElement('option');
opt.value = 0;
opt.innerHTML = '12:00';
editHour.appendChild(opt);
for (let i = 1; i < 12; i++) {
  opt = document.createElement('option');
  opt.value = i;
  opt.innerHTML = i + ':00';
  editHour.appendChild(opt);
}

// on create bullet,
createBulletButton.onclick = () => { $('#bujoSpace').modal('toggle'); };
saveBulletBtn.onclick = () => {
  $('#bujoSpace').modal('toggle');
  const bulletType = document.getElementById('type').value;
  const hour = getHour(hourInput.value, AMPMInput.value);
  const bulletDate = new Date(pageDate.getFullYear(), pageDate.getMonth(), pageDate.getDate(), hour);
  const newBullet = crud.createBullet(bulletType, titleInput.value, bulletDate, [], contentInput.value);
  console.log(newBullet);
  const newElement = createBulletEntryElem(newBullet);
  timeSlots[hour].append(newElement);
};

// load initial bullets from local storage
const bulletsToLoad = crud.getBulletsByDateRange(pageDate, new Date(
  pageDate.getFullYear(),
  pageDate.getMonth(),
  pageDate.getDate() + 1
));
for (const bullet of bulletsToLoad) {
  const hour = bullet.date.getHours();
  if (bullet.type !== 'Note') {
    timeSlots[hour].append(createBulletEntryElem(bullet));
  }
}
/*
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
*/

/** Loads new tags from runtime to display on tag modal
 *  Doesn't load in tags we already loaded in once
 *  @return null
 */
function loadTags() {
  // Grab tags saved in storage, and the part of the modal to paste them in
  let tagsToLoad = crud.getAvailableTags();
  let loadingBay = document.getElementById('taglist');
  // Grab the tags already pasted onto the modal
  let loadedTags = loadingBay.querySelectorAll('li');
  console.log(loadedTags);
  for (let i = 0; i < tagsToLoad.length; i++) {
    let curTag = tagsToLoad[i];
    // check if the tag we're putting in is already pasted if so, set our current tag to null
    for (let j = 0; j < loadedTags.length; j++) {
      if(loadedTags[j].innerHTML === curTag) {
        curTag = null;
      }
    }
    // if our current tag is null, skip over it
    if(curTag === null) {
      continue;
    } else {
      // otherwise, paste the tag onto the modal
      console.log(curTag);
      let tagBox = document.createElement('div');
      tagBox.style = 'display: flex';
      let tag = document.createElement('li');
      tag.innerHTML = curTag;
      tagBox.appendChild(tag);
       // Make tag editable
      tagBox.addEventListener('dblclick', () => {
        tagBox.disabled = true;
        let prevValue = tag.innerHTML;
        deleteButton.hidden = true;
        tag.innerHTML = '';
        // Create a text input field to edit the tag
        const editBox = document.createElement('input');
        editBox.type = 'text';
        editBox.value = prevValue;
        tagBox.appendChild(editBox);
    
        // Create a cancel button for when you realize note-taking is stupid
        const cancel = document.createElement('button');
        cancel.classList = 'btn btn-sm btn-secondary';
        cancel.innerHTML = 'Cancel';
        tagBox.appendChild(cancel);
        cancel.addEventListener('click', function() {
          tagBox.removeChild(editBox);
          tagBox.removeChild(cancel);
          tag.innerHTML = prevValue;
          deleteButton.hidden = false;
          tagBox.disabled = false;
        });

        editBox.addEventListener('keypress', function(e) {
          // Hit enter to actually save the thing. Is it intuitive enough?
          if (e.key === 'Enter') {
            // if you have an empty input box, just delete the thing
            if(editBox.value === '') {
              crud.removeTagGlobally(prevValue);
              loadingBay.removeChild(tagBox);
            } else {
              let newTag = editBox.value;
              // create the tag and destroy the input text + cancel button
              crud.editTag(prevValue, newTag);
              tagBox.removeChild(editBox);
              tagBox.removeChild(cancel);
              tag.innerHTML = newTag;
              deleteButton.hidden = false;
              tagBox.disabled = false;
            }
          }
        });
      });
      // create and append delete button
      // NOTE FOR DESIGN TEAM: Make this into a little x maybe
      const deleteButton = appendButton('', '', 'btn-sm btn-danger circleButts', tagBox);
      deleteButton.innerHTML = '<i class="fas fa-trash">';
      deleteButton.addEventListener('click', () => {
        crud.removeTagGlobally(tag.innerHTML);
        loadingBay.removeChild(tagBox);
      }); 
      loadingBay.appendChild(tagBox);
    }
  }
}

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


tagName.addEventListener('keypress', function(e) {
  // Hit enter to actually save the thing. Is it intuitive enough?
  if (e.key === 'Enter') {
    let newTag = tagName.value;
    // create the bullet element and destroy the input text + cancel button
    crud.createTag(tagName.value);
    loadTags();
    tagName.value = '';
  }
});

const tagSelector = document.getElementById('tags');
function populateBulletTags() {
  let tagsToLoad = crud.getAvailableTags();
  let loadedTags = tagSelector.querySelector('option');
  console.log(loadedTags);
  for (let i = 0; i < tagsToLoad.length; i++) {
    let curTag = tagsToLoad[i];
    // check if the tag we're putting in is already pasted if so, set our current tag to null
    for (let j = 0; j < loadedTags.length; j++) {
      if(loadedTags[j].innerHTML === curTag) {
        curTag = null;
      }
    }
    if (curTag === null) {
      continue;
    } else {
      let option = document.createElement('option');
      option.innerHTML = curTag;
      option.value = curTag;
      tagSelector.appendChild(option);
      option.addEventListener('click', function() {
        let selectedTags = document.getElementById('bullet_tags');
        let tagBox = document.createElement('div');
        tagBox.style = 'display: flex';
        let thisTag = document.createElement('li');
        thisTag.innerHTML = curTag;
        tagBox.appendChild(thisTag);
        const deleteButton = appendButton('', '','btn-smbtn-danger circleButts', tagBox);
        deleteButton.innerHTML = '<i class="fas fa-trash">';
        deleteButton.addEventListener('click', () => {
          selectedTags.removeChild(tagBox);
        });
        selectedTags.appendChild(tagBox);
      });
    }
  }
}
populateBulletTags();
/** Opens the delete dialog box and listens for delete button to get clicked
 *  @param {bullet} elemEntry the bullet we want to delete
 *  @return null
*/
function openDeleteDialog(elemEntry) {
  $('#deleteBullet').modal('toggle');
  confirmBtn.onclick = function() {
    crud.deleteBulletById(elemEntry.id);
    elemEntry.remove();
    $('#deleteBullet').modal('toggle');
  };
}

/** Opens edit dialog box and saves edits if the associated event listener is
 *  triggered
 *  @param {bullet} elemEntry the bullet we want to edit
 *  @return a modal to edit a bullet.
*/
function openEditDialog(elemEntry) {
  $('#EditBullet').modal('toggle');
  const entryBullet = crud.getBulletById(elemEntry.id);

  editTitle.value = entryBullet.title;
  // editDate.value = entryBullet.date;
  editDesc.value = entryBullet.content;
  editTags.value = entryBullet.tags;

  editSave.onclick = () => {
    // elemEntry.parentNode.replaceChild(createBulletEntryElem(elemEntry.id), elemEntry);
    $('#EditBullet').modal('toggle');
  };
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
function createBulletEntryElem(objBullet) {
  const newEntry = document.createElement('li');
  const div = document.createElement('div');

  newEntry.id = objBullet.ID;
  div.style = 'margin: 10px; padding: 5px; border: 5px solid black';

  newEntry.append(div);
  div.append(document.createTextNode(objBullet.title));
  div.append(document.createTextNode(objBullet.content));

  // create and append edit button
  const editButton = appendButton('', '', 'btn-sm btn-primary circleButts', div);
  editButton.innerHTML = '<i class="fas fa-pen"></i>';
  editButton.addEventListener('click', () => {
    openEditDialog(newEntry);
  });

  // create and append delete button
  const deleteButton = appendButton('', '', 'btn-sm btn-danger circleButts', div);
  deleteButton.innerHTML = '<i class="fas fa-trash">';
  deleteButton.addEventListener('click', () => {
    openDeleteDialog(newEntry);
  });

  return newEntry;
}

/**
 * Gets the hour in military time based on input hour and AMPM string
 * @param {Number} hour number of the hour from 0-11
 * @param {String} AMPM AM/PM of hour
 * @return the correct hour in military time
 */
function getHour(hour, AMPM) {
  if (AMPM === 'PM') {
    return Number(hour) + 12;
  }
  return Number(hour);
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
  cancel.classList = 'btn btn-sm btn-secondary';
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
      date = pageDate + time;
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
