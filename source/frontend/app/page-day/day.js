/** This file handles a lot of the event listeners associated with a CRUD
 *  application. It makes sure all created bullets and tags are registered
 *  on the DOM. It also calls on methods from crudFunctions.js to properly
 *  implement the CRUD functions.
 *  TODO: Ability to edit and delete tags
 *  TODO: Fix multi-add bug
 *  TODO: Add note bullet functionality
 *  TODO: Integrate with firebase backend
 *  TODO: Update outdated crudFunctions calls
 */

/* get elements from html page */
// buttons and general writing space
/* eslint-env jquery */
// POTENTIALLY OLD
import * as crud from '../page-journal/crudFunctions.js';

// const bujoSpace = document.getElementById('bujoSpace');
const saveBtn = document.getElementById('saveAdd');

// creation inputs
const titleInput = document.getElementById('title');
// const typeInput = document.getElementById('type');
const descInput = document.querySelector('[name = "desc"]');
// const tagInput = document.getElementById('tags');

// output of creation for note bullets
const noteOut = document.getElementById('undated_notes');

// deletion stuff
const confirmBox = document.getElementById('deleteBullet');
const confirmBtn = document.getElementById('okConfirm');

// tag creation stuff
const tagBtn = document.getElementById('createtag');
// const tagBox = document.getElementById('tagcreation');
const tagAddBtn = document.getElementById('saveTag');
const tagName = document.getElementById('tagname');

// edit inputs
const editBullet = document.getElementById('EditBullet');
const editSave = document.getElementById('editSaveAdd');
const editTitle = document.getElementById('edittitle');
const editDate = document.getElementById('editdate');
const editDesc = document.getElementById('editdesc');
// const editType = document.getElementById('edittype');
const editTags = document.getElementById('edittag');

const timeSegments = document.getElementById('time_list');

// make sure this changes depending on the day you pick
const curDay = '2020-04-01';
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
  const addBtn = document.createElement('button');
  addBtn.classList = "btn btn-primary btn-sm circleButts";
  
  // TODO: Make this button have an icon. This is a failed attempt
  addBtn.innerHTML = '<i class="fas fa-plus"></i>';
  //addBtn.innerHTML = 'Add Bullet';
  timeSlot.appendChild(timeText);
  timeSlot.appendChild(bulletList);
  timeSlot.appendChild(addBtn);
  timeSlot.className = 'time_slot';

  // Performs same function as addBulletBut
  addBtn.addEventListener('click', function() {
    console.log('Add button was clicked');
    openCreationDialog(stringTime, bulletList);
    $('#bujoSpace').modal('toggle');
  });

  return timeSlot;
}

// TODO: Write a date getter function to pass into here
// TODO: Make sure the date here is all the bullets of the current day we're in
// POTENTIALLY OLD
const bulletsToLoad = crud.getBulletsByDateRange('2020-04-01T00:00', '2020-04-01T23:59');
for (const bullet of bulletsToLoad) {
  if (bullet.type === 'note') {
    // paste bullet on notespace
    noteOut.append(createBulletEntryElem(bullet.ID));
  } else {
    for (let hourIt = 0; hourIt < 24; hourIt++) {
      const hours = document.querySelectorAll('[class = "time_slot"]');
      const curHour = hours[hourIt];
      let bulHour = bullet.date.toString();
      bulHour = bulHour.substring(11, 13);
      console.log("Bullet's Hour: " + bulHour);
      if (bulHour === hourIt) {
        const list = curHour.querySelector('ul');
        if (bullet.type === 'event') {
          list.append(createBulletEntryElem(bullet.ID));
        } else if (bullet.type === 'task') {
          list.append(createBulletEntryElem(bullet.ID));
        }
      }
    }
  }
}

/** Opens create bullet dialog box and saves additions if associated event listener is
 *  triggered
 *  @param {string} timeStr string for the time we want to add the bullet in
 *  @param {ul element} bulletList the list where we want to append to
 *  @return the created bullet
 */
function openCreationDialog(timeStr, bulletList) {
  console.log('Entering openCreationDialog');
  const title = titleInput;
  let time = new Date();
  let date = new Date();
  const desc = descInput;
  saveBtn.addEventListener('click', function() {
    console.log('hit the save button');
    // make tag array for new bullet
    // POTENTIALLY OLD
    const newBulletTags = crud.getCheckBoxResults();
    const newBulletType = crud.getType();
    console.log(newBulletType);
    // set date and time to be today's date and clicked time
    // since this is a note, we just get the current time
    if (newBulletType === 'note') {
      time = 'T' + time.getHours() + ':' + time.getMinutes();
      date = curDay + time;
    } else {
      time = 'T' + timeStr + ':' + '00';
      date = curDay + time;
      // console.log(date);
    }
    // make a new bullet with the crud functions
    // POTENTIALLY OLD
    const newBulletID = crud.createBullet(
      { title: titleInput.value, note: descInput.value },
      newBulletType,
      date,
      newBulletTags
    );

    console.log('In appending mode');
    // add the bullet to the DOM
    if (newBulletType === 'Note') {
      noteOut.append(createBulletEntryElem(newBulletID));
    } else if (newBulletType === 'Event') {
    // paste onto specific hour
      console.log('appending event');
      bulletList.append(createBulletEntryElem(newBulletID));
    } else if (newBulletType === 'Task') {
    // paste onto specific hour
      console.log('appending task');
      bulletList.append(createBulletEntryElem(newBulletID));
    }

    $('#bujoSpace').modal('toggle');
  });
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

  // create and append title of bullet
  appendTextNode('Title: ', bullet.data.title, div);

  // create and append description for bullet
  appendTextNode(' Note: ', bullet.data.note, div);

  // create and append bullet's tags
  appendTextNode(' Tags: ', bullet.tags, div);

  // create and append edit button
  const editButton = appendButton('', '', 'btn-sm btn-primary circleButts', div);
  editButton.innerHTML = '<i class="fas fa-pen"></i>'
  editButton.addEventListener('click', () => {
    $('#EditBullet').modal('toggle');
    openEditDialog(newEntry);
  });

  // create and append delete button
  const deleteButton = appendButton('', '', 'btn-sm btn-danger circleButts', div);
  deleteButton.innerHTML = '<i class="fas fa-trash">'
  deleteButton.addEventListener('click', () => {
    $('#deleteBullet').modal('toggle');
    openDeleteDialog(newEntry);
  });

  return newEntry;
}
