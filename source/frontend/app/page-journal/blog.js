/** This file handles a lot of the event listeners associated with a CRUD
 *  application. It makes sure all created bullets and tags are registered
 *  on the DOM. It also calls on methods from crudFunctions.js to properly
 *  implement the CRUD functions.
 *  TODO: Ability to edit and delete tags
 */

/* eslint-env jquery */
// import "./DOMPurify/dist/purify.min.js";
import * as crud from './crudFunctions.js';

/* get elements from html page */
// buttons and general writing space
const formButton = document.getElementById('addBulletBut');
// const bujoSpace = document.getElementById('bujoSpace');
const saveBtn = document.getElementById('saveAdd');

// creation inputs
const titleInput = document.getElementById('title');
// const typeInput = document.getElementById('type');
const dateInput = document.getElementById('time');
const descInput = document.querySelector('[name = "desc"]');
// const tagInput = document.getElementById('tags');

// output of creation
const eventOut = document.getElementById('eventlist');
const taskOut = document.getElementById('tasklist');
const noteOut = document.getElementById('notelist');

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

crud.initCrudRuntime();
// TODO: Write a date getter function to pass into here
let bulletsToLoad = crud.getBulletsByDateRange('2020-06-12T19:00', '2020-06-12T20:00');
for (const bullet of bulletsToLoad) {
  if (bullet.type === 'note') {
    noteOut.append(createBulletEntryElem(bullet.ID));
  } else if (bullet.type === 'event') {
    eventOut.append(createBulletEntryElem(bullet.ID));
  } else if (bullet.type === 'task') {
    taskOut.append(createBulletEntryElem(bullet.ID));
  }
}

/* on click show new tag box */
tagBtn.addEventListener('click', function() {
  $('#tagcreation').modal('toggle');
});

/* if user confirms making new tag, add it to list */
tagAddBtn.addEventListener('click', function() {
  // add tag's string to list
  crud.createTag(tagName.value);
  $('#tagcreation').modal('toggle');
  // maybe add a confirmation box
});

/* on click show new blog box */
formButton.addEventListener('click', function() {
  $('#bujoSpace').modal('toggle');
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
  crud.deleteBulletById(elemEntry.id);
  elemEntry.remove();
}

/** Opens edit dialog box and saves edits if the associated event listener is
 *  triggered
 *  @param {bullet} elemEntry the bullet we want to edit
 *  @return a modal to edit a bullet.
*/
function openEditDialog(elemEntry) {
  let entryBullet = crud.getBulletById(elemEntry.id);

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
  let elemBold = document.createElement('b');

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
  let elemButton = document.createElement('BUTTON');
  let elemText = document.createTextNode(strDisp);

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
  let newEntry = document.createElement('li');
  let div = document.createElement('div');
  let bullet = crud.getBulletById(intBulletID);

  newEntry.id = intBulletID;
  div.style = 'margin: 10px; padding: 5px; border: 5px solid black';

  newEntry.append(div);

  // create and append title of bullet
  appendTextNode('Title: ', bullet.data.title, div);

  // create and append date and time bullet was created
  appendTextNode(' Date: ', bullet.date, div);

  // create and append description for bullet
  appendTextNode(' Note: ', bullet.data.note, div);

  // create and append bullet type
  appendTextNode(' Type: ', bullet.type, div);

  // create and append bullet's tags
  appendTextNode(' Tags: ', bullet.tags, div);

  // create and append edit button
  let editButton = appendButton('Edit', '', 'btn btn-secondary', div);
  editButton.addEventListener('click', () => {
    $('#EditBullet').modal('toggle');
    openEditDialog(newEntry);
  });

  // create and append delete button
  let deleteButton = appendButton('Delete', '', 'btn btn-secondary', div);
  deleteButton.addEventListener('click', () => {
    $('#deleteBullet').modal('toggle');
    openDeleteDialog(newEntry);
  });

  return newEntry;
}

/* if user confirms make new bullet and add it to page */
saveBtn.addEventListener('click', function() {
  // make tag array for new bullet
  let newBulletTags = crud.getCheckBoxResults();
  let newBulletType = crud.getType();

  console.log(newBulletType);
  // make a new bullet with the crud functions
  let newBulletID = crud.createBullet(
    { title: titleInput.value, note: descInput.value },
    newBulletType,
    dateInput.value,
    newBulletTags
  );

  // add the bullet to the DOM
  if (newBulletType === 'Note') {
    noteOut.append(createBulletEntryElem(newBulletID));
  } else if (newBulletType === 'Event') {
    eventOut.append(createBulletEntryElem(newBulletID));
  } else if (newBulletType === 'Task') {
    taskOut.append(createBulletEntryElem(newBulletID));
  }

  $('#bujoSpace').modal('toggle');
});
