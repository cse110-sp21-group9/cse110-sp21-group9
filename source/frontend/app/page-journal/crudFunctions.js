/*
    most of the code in here should be considered wip
    TODO: Create more comprehensive ID system
          Extend created bullet object to do events and tasks on top of the currently available notes
    Completed: Add type and tag functionality
*/

let runTimeBullets = {};
let tagList = [];
let runTimeUpToDate = false;
let lastID; // this is bad
// placeholder var to appease linter
const IDArray = [];

export function setBulletAttributes(intID, objData = null, strType = null, dateDate = null, lstTags = null) {
  let bullet = Object.assign({}, runTimeBullets[intID]); // make a shallow copy first
  if (objData) {
    bullet.data = objData;
  }
  if (strType) {
    bullet.data = objData;
  }
  if (dateDate) {
    bullet.date = dateDate;
  }
  if (lstTags) {
    bullet.tags = lstTags;
  }

  updateBulletInStorage(bullet);
}

export function getBulletsByDateRange(dateStart, dateEnd, objOption = null) {
  let bulletsToReturn = [];
  for (const [ID, bullet] of Object.entries(runTimeBullets)) {
    if (bullet.date >= dateStart && bullet.date < dateEnd) {
      bulletsToReturn.push(bullet);
      IDArray.push(ID);
    }
  }
  return bulletsToReturn;
}

export function getBulletById(intID, objOption = null) {
  return runTimeBullets[intID];
}

/**
 * Creates a bullet object
 * @param {string} objData - Bullet description
 * @param {string} strType - The bullet's type
 * @param {date} dateDate - Date bullet was created
 * @param {Number} intID - Bullet's ID
 * @returns the created bullet object's ID
 */
export function createBullet(objData, strType, dateDate, lstTags) {
  let bullet;
  if (strType === 'Note') {
    lastID++;
    bullet = makeNoteBullet(objData, dateDate, lstTags, lastID);
    localStorage.setItem('lastID', lastID);
    writeBulletToStorage(bullet);
  } else if (strType === 'Event') {
    // might need to collect more user input info for this
    // EG: Date and Time of Event
    lastID++;
    bullet = makeEventBullet(objData, dateDate, lstTags, lastID);
    localStorage.setItem('lastID', lastID);
    writeBulletToStorage(bullet);
  } else if (strType === 'Task') {
    lastID++;
    bullet = makeTaskBullet(objData, dateDate, lstTags, lastID);
    localStorage.setItem('lastID', lastID);
    writeBulletToStorage(bullet);
  }

  // TODO: write ids into local storage array for later querying
  return bullet.ID;
}

export function deleteBulletById(intID) {
  runTimeBullets[intID] = null;
  deleteBulletFromStorage(intID);
}

export function initCrudRuntime() {
  fillRunTimeBullets();
  updateTags();
  editTags();
}

/**
 * Helper function for creating Note Bullets
 * @param {string} objData - Bullet description
 * @param {date} dateDate - Date bullet was created
 * @param {array} lstTags - List of tags associated with bullet
 * @param {Number} intID - Bullet's ID
 * @returns A Note Bullet object containing all param info
 */
function makeNoteBullet(objData, dateDate, lstTags, intID) {
  return {
    ID: intID,
    date: dateDate,
    type: 'note',
    tags: lstTags,
    data: objData
  };
}

/** TODO: Might need more parameters
 * Helper function for creating Event Bullets
 * @param {string} objData - Bullet description
 * @param {date} dateDate - Date bullet was created
 * @param {array} lstTags - List of tags associated with bullet
 * @param {Number} intID - Bullet's ID
 * @returns An Event Bullet object containing all param info
 */
function makeEventBullet(objData, dateDate, lstTags, intID) {
  return {
    ID: intID,
    date: dateDate,
    type: 'event',
    tags: lstTags,
    data: objData
  };
}

/** TODO: Might need more parameters
 * Helper function for creating Task Bullets
 * @param {string} objData - Bullet Description
 * @param {date} dateDate - Date bullet was created
 * @param {array} lstTags - List of tags associated with bullet
 * @param {Number} intID - Bullet's ID
 * @returns A Task Bullet object containing all param info
 */
function makeTaskBullet(objData, dateDate, lstTags, intID) {
  return {
    ID: intID,
    date: dateDate,
    type: 'task',
    tags: lstTags,
    data: objData
  };
}

function updateBulletInStorage(objBullet) {
  runTimeBullets[objBullet.ID] = objBullet;
  localStorage.setItem(objBullet.ID, JSON.stringify(objBullet));
}

// writes bullet to local storage and runtime
function writeBulletToStorage(objBullet) {
  runTimeBullets[objBullet.ID] = objBullet;
  localStorage.setItem(objBullet.ID, JSON.stringify(objBullet));
  let bulletIDs = readArrayFromStorage('bulletIDs');
  console.log(bulletIDs);
  bulletIDs.push(objBullet.ID);
  localStorage.setItem('lastID', lastID);
  writeArrayToStorage('bulletIDs', bulletIDs);
}

/**
 * Deletes a bullet from storage
 * @param {Number} intID - ID of the bullet we want to delet
 */
function deleteBulletFromStorage(intID) {
  intID = Number(intID);
  localStorage.removeItem(intID);

  // possibly can be made more efficient or just outsource to API
  let bulletIDs = readArrayFromStorage('bulletIDs');
  const bulletIndex = bulletIDs.indexOf(intID);
  bulletIDs.splice(bulletIndex, 1);
  writeArrayToStorage('bulletIDs', bulletIDs);
}

// TODO: should populate the runtime list from local storage
function fillRunTimeBullets() {
  if (runTimeUpToDate) return;
  lastID = localStorage.getItem('lastID');
  if (lastID === 'null' || lastID == null) {
    localStorage.setItem('lastID', lastID);
    lastID = 0;
    writeArrayToStorage('bulletIDs', []);
  }

  lastID = Number(lastID);
  let bulletIDs = readArrayFromStorage('bulletIDs');
  console.log('loaded bullet ids: ', bulletIDs);
  for (const ID of bulletIDs) {
    runTimeBullets[ID] = JSON.parse(localStorage.getItem(ID));
    console.log('loaded bullet object: ', runTimeBullets[ID]);
  }

  // makes sure tags are also loaded
  fillRunTimeTags();
  runTimeUpToDate = true;
}

/**
 * loads tags from storage
 * @return null
 */
function fillRunTimeTags() {
  let tags = localStorage.getItem('tags');
  console.log(tags);
  if (tagList == null || tagList === 'null') {
    tagList = [];
  }
  console.log('loaded tags: ', tagList);
}

// Can be made more efficient or just outsource to API
function writeArrayToStorage(strKey, lstArray) {
  localStorage.setItem(strKey, JSON.stringify({ array: lstArray }));
}

function readArrayFromStorage(strArrayKey) {
  let array = localStorage.getItem(strArrayKey);
  // JSON.parse(array)['array'] turned to JSON.parse(array).'array'
  return JSON.parse(array).array;
}

/**
 * Creates a checklist in the dialog form of all the tags we have established in tagList
 * @return null
 */
function updateTags() {
  // taglist is already defined
  let checkList = document.getElementById('tags');
  for (const tag in tagList) {
    // create checkbox
    let options = document.createElement('input');

    // specify element attributes
    options.setAttribute('type', 'checkbox');
    options.setAttribute('value', tagList[tag]);
    options.setAttribute('name', tagList[tag]);

    // create label for checkbox and define attributes
    let label = document.createElement('label');
    label.setAttribute('for', tagList[tag]);

    // append text to the label
    label.appendChild(document.createTextNode(tagList[tag]));

    // append checkbox and label to the form
    checkList.appendChild(options);
    checkList.appendChild(label);
  }
}

/**
 * Get the results of the created tag checkboxes to display on the CRUD app.
 * @returns an array containing the names of all tags that the user selected
 */
// this function takes the user's specified tag entries and loads it onto the bullet object we are creating
export function getCheckBoxResults() {
  let chosenTags = [];
  if (tagList.size === 0) {
    return chosenTags;
  }

  let options = document.querySelectorAll('input[type = "checkbox"]:checked');
  for (let checkbox of options) {
    chosenTags.push(checkbox.value);
  }
  return chosenTags;
}

/**
 * Creates a checklist in the "EditBullet" dialog form to change which tags this bullet has
 * The checkboxes should be properly checked according to the bullet's stored tags
 * @return null
 */
function editTags() {
  let checkList = document.getElementById('edittag');
  // using tagList defined earlier
  for (const tag in tagList) {
    // create checkbox
    let options = document.createElement('input');
    // specify element attributes
    options.setAttribute('type', 'checkbox');
    options.setAttribute('value', tagList[tag]);
    options.setAttribute('name', tagList[tag]);

    // create label for checkbox and define attributes
    let label = document.createElement('label');
    label.setAttribute('for', tagList[tag]);

    // append text to the label
    label.appendChild(document.createTextNode(tagList[tag]));

    // append checkbox and label to the form
    checkList.appendChild(options);
    checkList.appendChild(label);
  }
}

/**
 * Gets a bullet's selected type from the creation dialog
 * @returns The bullet's selected type
 */
export function getType() {
  let opt = document.getElementById('type').value;
  return opt;
}

/**
 * Creates a tag based on user's input
 * @param {string} tagName - The tag's name
 * @return null
 */
export function createTag(tagName) {
  tagList.push(tagName);
  console.log(tagList);
  localStorage.setItem('tags', tagList);
  updateTags();
}
