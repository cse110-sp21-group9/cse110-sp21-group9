/* get elements from html page */
/* eslint-env jquery */
// POTENTIALLY OLD
import * as crud from '../../../backend/crudFunctions.js';
import * as utils from '../../utils.js';
import * as globals from '../../globals.js';

const MAX_TITLE_LENGTH = 35;
const MAX_TAG_LENGTH = 15;

const saveBulletBtn = document.getElementById('saveBullet');

// Creation Modal Elements
const addBtn = document.getElementById('addBullet');
const titleInput = document.getElementById('title');
const contentInput = document.querySelector('[name = "desc"]');
const hourInput = document.getElementById('hour');
const AMPMInput = document.getElementById('AMPM');
const tagSelector = document.getElementById('tags');
const selectedTags = document.getElementById('bullet_tags');
// Notespace Elements
const noteBtn = document.getElementById('addNote');
const noteOut = document.getElementById('noteSpace');
const notespace = document.getElementById('noteSpace');
// Deletion Modal Elements
const confirmBox = document.getElementById('deleteBullet');
const confirmBtn = document.getElementById('okConfirm');

// Tag Creation Modal Elements
const tagFilterSelect = document.getElementById('selecttag');
const tagCloseBtn = document.getElementById('saveTag');
const tagName = document.getElementById('tagname');

// Edit Modal Elements
const editBullet = document.getElementById('EditBullet');
const editSave = document.getElementById('editSaveAdd');
const editTitle = document.getElementById('editTitle');
const editHour = document.getElementById('editHour');
const editAMPM = document.getElementById('editAMPM');
const editContent = document.querySelector('[name = "editDesc"]');
const editTagSelector = document.getElementById('editTags');
const editSelectedTags = document.getElementById('editBulletTags');

// For creating the time table
const timeSegments = document.getElementById('time_list');

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

// Set bullet title and tag name input limits
titleInput.maxLength = MAX_TITLE_LENGTH;
editTitle.maxLength = MAX_TITLE_LENGTH;
tagName.maxLength = MAX_TAG_LENGTH;

// init crud
crud.initCrudRuntime();
loadTags();

// make timeslots
for (let i = 0; i < 24; i++) {
  const timeSlot = makeTimeSlotComponent(i);
  timeSegments.appendChild(timeSlot);

  timeSlots.push(document.getElementById('time_slot' + String(i)));
}
// load in bullets into timeslots
loadBullets();

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
addBtn.onclick = () => {
  $('#bujoSpace').modal('toggle');
  // clear settings for creation of new bullet
  titleInput.value = '';
  const typeInput = document.getElementById('type');
  typeInput.value = 'Event';
  hourInput.value = '0';
  AMPMInput.value = 'AM';

  // refresh tags
  populateTagOptions(tagSelector);

  // Remove previously selected tags
  while (selectedTags.firstChild) {
    selectedTags.removeChild(selectedTags.firstChild);
  }
};

// When user confirms bullet
saveBulletBtn.onclick = () => {
  $('#bujoSpace').modal('toggle');
  // Get info from fields
  const bulletType = document.getElementById('type').value;
  const hour = getHour(hourInput.value, AMPMInput.value);
  const bulletDate = new Date(pageDate.getFullYear(), pageDate.getMonth(), pageDate.getDate(), hour);

  // Grab tags from selected list
  const bulletTags = [];
  const tagBoxes = selectedTags.querySelectorAll('div');
  if (tagBoxes !== null) {
    for (let i = 0; i < tagBoxes.length; i++) {
      const curTag = tagBoxes[i].querySelector('li').innerHTML;
      bulletTags.push(curTag);
      tagBoxes[i].remove();
    }
  }

  // Make the bullet
  const newBullet = crud.createBullet(bulletType, titleInput.value, bulletDate, bulletTags, contentInput.value);
  const newElement = createBulletEntryElem(newBullet);
  timeSlots[hour].append(newElement);
};

/** Displays the relevant information pertaining to the given bullet in view Modal
 * @param {bullet} elemEntry the bullet element we want to display information about
 * @return null
 */
function showBulletInfo(elemEntry) {
  const curBullet = crud.getBulletById(elemEntry.id);
  const titleBar = document.getElementById('viewtitle');
  const dateBar = document.getElementById('viewdate');
  const timeBar = document.getElementById('viewtime');
  const typeBar = document.getElementById('viewtype');
  const contentBar = document.getElementById('viewdesc');
  const tagBar = document.getElementById('viewtags');

  console.log('title: ' + curBullet.title);
  // Set bullet info on view modal
  titleBar.innerHTML = curBullet.title;
  dateBar.innerHTML = monthName + ' ' + pageDate.getDay() + ',' + pageDate.getFullYear();
  timeBar.innerHTML = curBullet.date.getHours() + ':00';
  contentBar.innerHTML = curBullet.content;
  typeBar.innerHTML = curBullet.type;
  createTagElements(tagBar, curBullet);
  // Can set class of tagBar here for styling
  tagBar.classList.add('tagBar');
  const editButton = document.getElementById('editButton');
  const deleteButton = document.getElementById('deleteButton');
  editButton.onclick = () => {
    openEditDialog(elemEntry);
  };
  deleteButton.onclick = () => {
    openDeleteDialog(elemEntry);
  };
}

/**
 * Loads bullets from local storage
 * Can load bullets by a specific tag with tag parameter
 * @param strTag Can specify a tag to only load bullets of that tag
 */
// load initial bullets from local storage
function loadBullets(strTag = null) {
  // Clear bullet schedule
  for (const timeSlot of timeSlots) {
    while (timeSlot.firstChild) {
      timeSlot.removeChild(timeSlot.firstChild);
    }
  }

  // Clear note space
  while (notespace.firstChild) {
    notespace.removeChild(notespace.firstChild);
  }

  // Only load bullets from this page's day
  const bulletsToLoad = crud.getBulletsByDateRange(pageDate, new Date(
    pageDate.getFullYear(),
    pageDate.getMonth(),
    pageDate.getDate() + 1
  ));
  for (const bullet of bulletsToLoad) {
    const hour = bullet.date.getHours();
    if (bullet.type !== 'Note') {
      // If strTag == null, we want all bullets, otherwise, only want bullets with tag strTag
      if (strTag === null || bullet.tags.indexOf(strTag) !== -1) {
        const curBullet = createBulletEntryElem(bullet);
        timeSlots[hour].append(curBullet);
      }
    } else {
      // Add note bullets to the designated note writing space
      const curBullet = createBulletEntryElem(bullet);
      notespace.append(curBullet);
    }
  }
}
/** Loads new tags from runtime to display on tag modal
 *  Doesn't load in tags we already loaded in once
 *  @return null
 */
function loadTags() {
  // Grab tags saved in storage, and the part of the modal to paste them in
  const tagsToLoad = crud.getAvailableTags();
  const loadingBay = document.getElementById('taglist');
  console.log(loadingBay);

  // Grab the tags already pasted onto the modal
  const loadedTags = loadingBay.querySelectorAll('li');
  for (let i = 0; i < tagsToLoad.length; i++) {
    let curTag = tagsToLoad[i];
    // check if the tag we're putting in is already pasted if so, set our current tag to null
    for (let j = 0; j < loadedTags.length; j++) {
      if (loadedTags[j].innerHTML === curTag) {
        curTag = null;
      }
    }
    // if our current tag is null, skip over it
    if (curTag === null) {
      continue;
    } else {
      // otherwise, paste the tag onto the modal
      console.log(curTag);
      // Add to tagbox in edit tag modal
      const tagBox = document.createElement('div');
      tagBox.style = 'display: flex';
      const tag = document.createElement('li');
      tag.innerHTML = curTag;
      tagBox.appendChild(tag);

      // Add to tag filter selector
      const option = document.createElement('option');
      option.innerHTML = curTag;
      option.value = curTag;
      tagFilterSelect.insertBefore(option, tagFilterSelect.children[tagFilterSelect.length - 1]);
      // create and append delete button
      // NOTE FOR DESIGN TEAM: Make this into a little x maybe
      const deleteButton = appendButton('', '', 'btn-sm btn-danger circleButts', tagBox);
      deleteButton.innerHTML = '<i class="fas fa-trash">';
      deleteButton.addEventListener('click', () => {
        crud.removeTagGlobally(tag.innerHTML);
        tagFilterSelect.removeChild(option);
        loadingBay.removeChild(tagBox);
        loadBullets();
      });
      loadingBay.appendChild(tagBox);
    }
  }
}
/* tag filter selector */
tagFilterSelect.addEventListener('change', function() {
  if (tagFilterSelect.value === 'edit') {
    $('#tagcreation').modal('toggle');
  } else if (tagFilterSelect.value === 'ALL') {
    loadBullets();
  } else if (tagFilterSelect.value !== '') {
    loadBullets(tagFilterSelect.value);
  }
  tagFilterSelect.value = '';
});

/* if user confirms making new tag, add it to list */
tagCloseBtn.addEventListener('click', function() {
  // add tag's string to list
  $('#tagcreation').modal('toggle');
  // maybe add a confirmation box
});

/* add new tag when user presses enter on input */
tagName.addEventListener('keypress', function(e) {
  // Hit enter to actually save the thing. Is it intuitive enough?
  if (e.key === 'Enter') {
    // create the bullet element and destroy the input text + cancel button
    crud.createTag(tagName.value);
    loadTags();
    tagName.value = '';
  }
});

/**
 * Populates select element with options corresponding to tags
 * @param {HTMLSelectElement} objSelect select element to add tags to
 */
function populateTagOptions(objSelect) {
  /* get tags from localstorage */
  const tagsToLoad = crud.getAvailableTags();

  /* clear select element */
  while (objSelect.firstChild) {
    objSelect.removeChild(objSelect.firstChild);
  }

  /* populate select element with inputs */
  const defaultopt = document.createElement('option');
  defaultopt.value = 'Default';
  defaultopt.innerHTML = 'Select tag:';
  objSelect.appendChild(defaultopt);
  console.log(objSelect);
  for (let i = 0; i < tagsToLoad.length; i++) {
    const curTag = tagsToLoad[i];
    // create an option box for the tag and add it to the selector
    const option = document.createElement('option');
    option.innerHTML = curTag;
    option.value = curTag;
    console.log(option);
    objSelect.appendChild(option);
  }
}

/**
 * Creates a new tag html element to add to list
 * @param {HTMLUListElement} objUList the list we want to add tags to
 * @param {String} strTag the tag we want to create
 * @return {HTMLDivElement} div containing tag and delete button
 */
function addListTag(objUList, strTag) {
  // Set up the DOM
  const tagBox = document.createElement('div');
  tagBox.style = 'display: flex';
  const thisTag = document.createElement('li');
  tagBox.appendChild(thisTag);

  // Make sure we add the tag that is currently selected
  tagBox.querySelector('li').innerHTML = strTag;
  // Make sure user can delete tags that they realize they don't want to add
  const deleteButton = appendButton('', '', 'btn-smbtn-danger circleButts', tagBox);
  deleteButton.innerHTML = '<i class="fas fa-trash">';
  deleteButton.addEventListener('click', () => {
    objUList.removeChild(tagBox);
  });
  // add the delete button and add the tag to the appropriate space
  // tagBox.appendChild(deleteButton);
  objUList.appendChild(tagBox);
}

/** Adds a tag to a bullet.
 *  NOTE: Before saving the bullet, clicking this button shows the user that they will be adding the tag they selected
*/
// const confirmTagBtn = document.getElementById('confirmTag');
tagSelector.addEventListener('change', function() {
  if (tagSelector.value !== 'Default') {
    // Don't allow user to add duplicate tags
    const currentTags = selectedTags.querySelectorAll('li');
    for (const tag of currentTags) {
      if (tag.innerHTML === tagSelector.value) {
        tagSelector.value = 'Default';
        return;
      }
    }

    addListTag(selectedTags, tagSelector.value);
    tagSelector.value = 'Default';
  }
});

editTagSelector.addEventListener('change', function() {
  if (editTagSelector.value !== 'Default') {
    // Don't allow user to add duplicate tags
    const currentTags = editSelectedTags.querySelectorAll('li');
    for (const tag of currentTags) {
      if (tag.innerHTML === editTagSelector.value) {
        editTagSelector.value = 'Default';
        return;
      }
    }

    addListTag(editSelectedTags, editTagSelector.value);
  }
});

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
  const oldHours = entryBullet.date.getHours();

  editTitle.value = entryBullet.title;
  // editDate.value = entryBullet.date;
  editContent.value = entryBullet.content;
  if (oldHours > 11) {
    editHour.value = oldHours - 12;
    editAMPM.value = 'PM';
  } else {
    editHour.value = oldHours;
    editAMPM.value = 'AM';
  }

  // refresh tags
  populateTagOptions(editTagSelector);

  // Remove previously selected tags
  while (editSelectedTags.firstChild) {
    editSelectedTags.removeChild(editSelectedTags.firstChild);
  }

  // Add tags already on bullet
  for (const tag of entryBullet.tags) {
    addListTag(editSelectedTags, tag);
  }

  editSave.onclick = () => {
    // elemEntry.parentNode.replaceChild(createBulletEntryElem(elemEntry.id), elemEntry);
    // Get input fields
    const newTitle = editTitle.value;
    const newContent = editContent.value;
    const newHours = getHour(editHour.value, editAMPM.value);
    const newDate = new Date(entryBullet.date.getTime());
    newDate.setHours(newHours);

    // Get tags from selector list
    const bulletTags = [];
    const tagBoxes = editSelectedTags.querySelectorAll('div');
    if (tagBoxes !== null) {
      for (let i = 0; i < tagBoxes.length; i++) {
        const curTag = tagBoxes[i].querySelector('li').innerHTML;
        bulletTags.push(curTag);
        tagBoxes[i].remove();
      }
    }

    // Update fields in localStorage
    const newBullet = crud.setAttributes(elemEntry.id, { title: newTitle, date: newDate, tags: bulletTags, content: newContent });

    // Update bullet in schedule to reflect change in time
    if (oldHours === newHours) {
      timeSlots[oldHours].replaceChild(createBulletEntryElem(newBullet), elemEntry);
    } else {
      timeSlots[oldHours].removeChild(elemEntry);
      timeSlots[newHours].appendChild(createBulletEntryElem(newBullet));
    }

    // Update view modal if open
    showBulletInfo(document.getElementById(elemEntry.id));

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

/** Create a entry element for a bullet to go on webpage
 *  @param {number} intBulletID - the bullet's numerical ID
 *  @return {li} a list (bullet) object
 */
function createBulletEntryElem(objBullet) {
  const newEntry = document.createElement('li');
  const bulletInfo = document.createElement('div');
  const bulletTags = document.createElement('div');
  const bulletTitle = document.createElement('span');

  const btnSpan = document.createElement('span'); // div for both edit and delete buttons
  btnSpan.className = 'bulletBtns';

  newEntry.id = objBullet.ID;
  bulletInfo.className = 'bulletInfo';

  bulletTitle.innerHTML = objBullet.title;
  bulletTitle.id = objBullet.ID + '_title';

  if (objBullet.type === 'Task') {
    const checkbox = document.createElement('INPUT');
    checkbox.setAttribute('type', 'checkbox');
    bulletInfo.appendChild(checkbox);
  }

  // Only show bullet title on all bullets
  bulletInfo.appendChild(bulletTitle);
  bulletInfo.appendChild(btnSpan);

  // Note bullet settings
  if (objBullet.type === 'Note') {
    // Editing bullet functionality will be triggered by double clicking the bullet
    bulletInfo.addEventListener('dblclick', function() {
      editNote(newEntry);
    });

    // create and append delete button as that's all we need for notes
    const deleteButton = appendButton('', '', 'btn-sm btn-danger circleButts d-none', btnSpan);
    deleteButton.innerHTML = '<i class="fas fa-trash">';
    deleteButton.id = objBullet.ID + '_delete';
    deleteButton.addEventListener('click', () => {
      deleteNote(newEntry);
    });
    // show delete button when hover over note
    bulletInfo.addEventListener('mouseover', function() {
      deleteButton.classList.remove('d-none');
    });
    bulletInfo.addEventListener('mouseleave', function() {
      deleteButton.classList.add('d-none');
    });
    // Event/Task bullet settings
  } else {
    // Bring up bullet view modal on title click
    bulletTitle.onclick = () => {
      $('#viewBullet').modal('toggle');
      showBulletInfo(newEntry);
    };

    // Create and append edit button
    const editButton = appendButton('', '', 'btn-sm btn-primary circleButts d-none', btnSpan);
    editButton.innerHTML = '<i class="fas fa-pen"></i>';
    editButton.id = objBullet.ID + '_edit';
    editButton.addEventListener('click', () => {
      openEditDialog(newEntry);
    });

    // show edit button when hover over event
    bulletInfo.addEventListener('mouseover', function() {
      // bulletInfo.style.backgroundColor = "var(--nav-color-hover)";
      editButton.classList.remove('d-none');
    });
    bulletInfo.addEventListener('mouseleave', function() {
      editButton.classList.add('d-none');
    });

    // create and append delete button
    const deleteButton = appendButton('', '', 'btn-sm btn-danger circleButts d-none', btnSpan);
    deleteButton.innerHTML = '<i class="fas fa-trash">';
    deleteButton.id = objBullet.ID + '_delete';
    deleteButton.addEventListener('click', () => {
      openDeleteDialog(newEntry);
    });

    // show delete button when hover over event
    bulletInfo.addEventListener('mouseover', function() {
      deleteButton.classList.remove('d-none');
    });
    bulletInfo.addEventListener('mouseleave', function() {
      deleteButton.classList.add('d-none');
    });
    bulletTags.id = objBullet.ID + '_tags';

    // create and append tags div
    createTagElements(bulletTags, objBullet);
    bulletTags.classList.add('bulletTags');
    bulletInfo.appendChild(bulletTags);
  }

  newEntry.appendChild(bulletInfo);
  return newEntry;
}

/**
 * Adds all tags from a bullet as div objects into a div object for use
 * @param {div} objTagDiv HTML div element object to add tags to
 * @param {Bullet} objBullet bullet object to get tags from
 */
function createTagElements(objTagDiv, objBullet) {
  // Clear any tags in div
  while (objTagDiv.firstChild) {
    objTagDiv.removeChild(objTagDiv.firstChild);
  }

  //
  for (const tag of objBullet.tags) {
    const newTag = document.createElement('span');
    newTag.innerHTML = tag;
    // set class of tag div for styling of individual tag elements
    newTag.classList.add('tag');
    objTagDiv.appendChild(newTag);
  }
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

  // Create a div to hold input elements
  const noteDiv = document.createElement('div');
  noteDiv.id = 'note_input';
  notespace.appendChild(noteDiv);

  // Create a text input field to create bullet
  const note = document.createElement('input');
  note.type = 'text';
  noteDiv.appendChild(note);
  note.focus();

  // Create a cancel button for when you realize note-taking is stupid
  const cancel = document.createElement('button');
  cancel.classList = 'btn btn-sm btn-secondary';
  cancel.innerHTML = 'Cancel';
  noteDiv.appendChild(cancel);
  cancel.addEventListener('click', function() {
    noteBtn.disabled = false;
    notespace.removeChild(noteDiv);
  });

  // Manual save button for those who want to double-check things
  const save = document.createElement('button');
  save.classList = 'btn btn-sm btn-primary';
  save.innerHTML = 'Save';
  note.insertAdjacentElement('afterend', save);
  save.onclick = () => {
    // This is basically like pressing the cancel button
    if (note.value !== '') {
      // Make the bullet
      const bulletType = 'Note';
      const newBullet = crud.createBullet(bulletType, note.value, pageDate, [], '');
      const newElement = createBulletEntryElem(newBullet);

      // create the bullet element and destroy the input form
      notespace.append(newElement);
    }
    notespace.removeChild(noteDiv);
    noteBtn.disabled = false;
  };

  // Alternatively, you can also hit enter key to save
  note.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      // This is basically like pressing the cancel button
      if (note.value !== '') {
        // Make the bullet
        const bulletType = 'Note';
        const newBullet = crud.createBullet(bulletType, note.value, pageDate, [], '');
        const newElement = createBulletEntryElem(newBullet);

        // create the bullet element and destroy the input form
        notespace.append(newElement);
      }
      notespace.removeChild(noteDiv);
      noteBtn.disabled = false;
    }
  });
});

/** Special Editing functionality for note bullets.
 *  It will replace the selected bullet with the desired edits
 *  @param {Note Bullet} elemEntry the entry we want to edit
 *  @return null
 */
function editNote(elemEntry) {
  const entryBullet = crud.getBulletById(elemEntry.id);
  const editDiv = document.createElement('div');
  const editInput = document.createElement('input');

  editInput.type = 'text';
  editInput.value = entryBullet.title;
  editDiv.appendChild(editInput);
  editDiv.id = entryBullet.ID + '_note_edit';
  notespace.replaceChild(editDiv, elemEntry);
  editInput.focus();

  // Create a cancel button for when you realize note-taking is stupid
  const cancel = document.createElement('button');
  cancel.classList = 'btn btn-sm btn-secondary';
  cancel.innerHTML = 'Cancel';
  editInput.insertAdjacentElement('afterend', cancel);
  cancel.addEventListener('click', function() {
    noteBtn.disabled = false;
    notespace.replaceChild(elemEntry, editDiv);
  });

  const save = document.createElement('button');
  save.classList = 'btn btn-sm btn-primary';
  save.innerHTML = 'Save';
  editInput.insertAdjacentElement('afterend', save);
  save.onclick = () => {
    if (editInput.value === '') {
      // delete blyat
      crud.deleteBulletById(elemEntry.id);
      notespace.removeChild(editDiv);
    } else {
      // Get input fields
      const newTitle = editInput.value;
      // Update fields in localStorage
      const newBullet = crud.setAttributes(elemEntry.id, { title: newTitle });
      // Update bullet in schedule to reflect change in time
      notespace.replaceChild(createBulletEntryElem(newBullet), editDiv);
    }
  };

  editInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      if (editInput.value === '') {
        // delete blyat
        crud.deleteBulletById(elemEntry.id);
        notespace.removeChild(editInput);
      } else {
        // Get input fields
        const newTitle = editInput.value;
        // Update fields in localStorage
        const newBullet = crud.setAttributes(elemEntry.id, { title: newTitle });

        // Update bullet in schedule to reflect change in time
        notespace.replaceChild(createBulletEntryElem(newBullet), editDiv);
      }
    }
  });
}

/** Deletes the note we want to the shadow realm
 *  @param {bullet} elemEntry the bullet we want to delete
 *  @return null
*/
function deleteNote(elemEntry) {
  crud.deleteBulletById(elemEntry.id);
  elemEntry.remove();
}
