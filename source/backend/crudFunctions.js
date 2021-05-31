import { Bullet } from './bullet.js';

/**
 *  Handles the backend of creating and editing bullet objects and tags and
 *  making sure they're properly stored.
 *  most of the code in here should be considered wip
 *  TODO: Create more comprehensive ID system
 *  Extend created bullet object to do events and tasks on top of the currently available notes
 *    Be able to edit and delete tags
 *  Change storage from local to the external database
 *  Completed: Add type and tag functionality
 */

const runTimeBullets = {};
let runTimeTags = {};
let runTimeUpToDate = false;
let lastID; // this is bad

/** Gets all bullets within the specified date range
 *  @param {Date} dateStart the beginning date to query from
 *  @param {Date} dateEnd the end date to query from
 *  @return a list of bullets that should be returned
 */
export function getBulletsByDateRange(dateStart, dateEnd, objOption = null) {
  const bulletsToReturn = [];
  for (const bulletObj of runTimeBullets) {
    if (bulletObj === null) continue;
    else if (bulletObj.date >= dateStart && bulletObj.date < dateEnd) {
      bulletsToReturn.push(new Bullet(bulletObj));
    }
  }
  return bulletsToReturn;
}

export function getBulletsByDateSpan(dateStart, dateDue, objOption = null) {
  const bulletsToReturn = [];
  for (const bulletObj of runTimeBullets) {
    if (bulletObj === null) continue;
    else if (bulletObj.date === dateStart && bulletObj.dueDate === dateDue) {
      bulletsToReturn.push(new Bullet(bulletObj));
    }
  }
  return bulletsToReturn;
}

/** Gets a bullet by the specified ID
 *  @param {Number} intID the bullet's ID
 *  @return the bullet we were looking for
 */
export function getBulletById(intID, objOption = null) {
  if (intID in runTimeBullets && runTimeBullets[intID] !== null) return Bullet(runTimeBullets[intID]);
  else return null;
}

/** Gets all event bullets within the specified date range
 *  @param {Date} dateStart the beginning date to query from
 *  @param {Date} dateEnd the end date to query from
 *  @return a list of bullets that should be returned
 */
export function getEventBulletsByDateRange(dateStart, dateEnd, objOption = null) {
  const unfilteredBullets = getBulletsByDateRange(dateStart, dateEnd, objOption);
  return filterArray(unfilteredBullets, 'Event');
}

export function getNoteBulletsByDateRange(dateStart, dateEnd, objOption = null) {
  const unfilteredBullets = getBulletsByDateRange(dateStart, dateEnd, objOption);
  return filterArray(unfilteredBullets, 'Note');
}

export function getTaskBulletsByDateRange(dateStart, dateEnd, objOption = null) {
  const unfilteredBullets = getBulletsByDateRange(dateStart, dateEnd, objOption);
  return filterArray(unfilteredBullets, 'Task');
}

export function getBulletsByTag(strTag, objOption = null) {
  const bulletsToReturn = [];
  for (const bulletObj of runTimeBullets) {
    if (bulletObj === null) continue;
    else if (bulletObj.tags.indexOf(strTag) !== -1) { bulletsToReturn.push(Bullet(bulletObj)); }
  }
  return bulletsToReturn;
}
export function getEventBulletsByTag(strTag, objOption = null) {
  const unfilteredBullets = getBulletsByTag(strTag);
  return filterArray(unfilteredBullets, 'event');
}
export function getNoteBulletsByTag(strTag, objOption = null) {
  const unfilteredBullets = getBulletsByTag(strTag);
  return filterArray(unfilteredBullets, 'note');
}
export function getTaskBulletsByTag(strTag, objOption = null) {
  const unfilteredBullets = getBulletsByTag(strTag);
  return filterArray(unfilteredBullets, 'task');
}
export function setBulletTitle(intID, strTitle, objOption = null) {
  return updateBullet(intID, 'title', strTitle);
}
export function setBulletDate(intID, dateDate, objOption = null) {
  return updateBullet(intID, 'date', dateDate);
}
// note tag must first be registered globally
export function addBulletTag(intID, strTag, objOption = null) {
  if (runTimeBullets[intID] === null) return null;
  const bulletObj = runTimeBullets[intID];
  if (!(strTag in runTimeTags)) return null;
  bulletObj.tags.push(strTag);
  writeBulletToStorage(bulletObj);
  return new Bullet(bulletObj);
}
export function removeBulletTag(intID, strTag, objOption = null) {
  if (runTimeBullets[intID] === null) return null;
  const bulletObj = runTimeBullets[intID];
  if (!(strTag in runTimeTags)) return null;
  const index = bulletObj.tags.indexOf(strTag);
  if (index === -1) return null;
  bulletObj.tags.splice(index, 1);
  writeBulletToStorage(bulletObj);
  return new Bullet(bulletObj);
}
export function setBulletContent(intID, strContent, objOption = null) {
  return updateBullet(intID, 'content', strContent);
}
export function setBulletDueDate(intID, strdueDate, objOption = null) {
  return updateBullet(intID, 'dueDate', strdueDate);
}
export function setBulletStatus(intID, strstatus, objOption = null) {
  return updateBullet(intID, 'status', strstatus);
}

export function getAvailableTags() {
  const tagsToRetrun = [];
  for (const tag of runTimeTags) {
    if (tag === true) { tagsToRetrun.push(tag); }
  }
  return tagsToRetrun;
}

export function createTag(strTag, objOption = null) {
  if (!(strTag in runTimeTags)) {
    runTimeTags[strTag] = true;
    localStorage.setItem('tags', JSON.stringify(runTimeTags));
  }
}

export function removeTagGlobally(strTag, objOption = null) {
  if (strTag in runTimeTags) {
    runTimeTags[strTag] = null;
    localStorage.setItem('tags', JSON.stringify(runTimeTags));
    for (const bulletObj in runTimeBullets) {
      if (bulletObj !== null) {
        removeBulletTag(bulletObj.ID, strTag);
      }
    }
  }
}

/**
 * Creates a bullet object
 * @param {string} strType    - bullet type
 * @param {string} strTitle   - bullet title
 * @param {string} strDate    - bullet date
 * @param {string} strContent - bullet content
 * @param {list}   lstTags    - list of bullet tags
 * @param {JSONObject} option - defulats to null, one or more extra feilds based on bullet type
 *  eg:{dueDate: strDueDate, status: strStatus}
 * @returns the created bullet object
 */
export function createBullet(strType, strTitle, strDate, lstTags, strContent, objOption = null) {
  function writeNewBullet(bulletObj) {
    lastID++;
    bulletObj.ID = lastID;
    localStorage.setItem('lastID', lastID);
    writeBulletToStorage(bulletObj);
    creationSuccessful = true;
  }

  lstTags.forEach((tag, index) => {
    if (!(tag in runTimeTags)) return null;
  });

  let creationSuccessful = false;
  const bullet =
  {
    ID: null,
    title: strTitle,
    type: strType,
    date: strDate,
    tags: lstTags,
    content: strContent,
    dueDate: null,
    status: null
  };

  if (strType === 'Note') {
    writeNewBullet(bullet);
  } else if (strType === 'Event') {
    bullet.dueDate = objOption.dueDate;
    writeNewBullet(bullet);
  } else if (strType === 'Task') {
    bullet.status = objOption.status;
    writeNewBullet(bullet);
  }

  if (creationSuccessful) { return new Bullet(bullet); } else { return null; }
}

/** Deletes a bullet by the specified ID
 *  @param {Number} intID the bullet's ID
 *  @return null
 */
export function deleteBulletById(intID) {
  if (intID in runTimeBullets) {
    runTimeBullets[intID] = null;
    deleteBulletFromStorage(intID);
  }
  return null;
}

/** Renders all bullets and tags onto the DOM
 *  @return null
 */
export function initCrudRuntime() {
  fillRunTimeBullets();
}

// ----------------helpers----------------

function updateBullet(intID, strField, data) {
  if (runTimeBullets[intID] === null) return null;
  const bulletObj = runTimeBullets[intID];
  bulletObj[strField] = data;
  writeBulletToStorage(bulletObj);
  return new Bullet(bulletObj);
}

/** Writes bullet to local storage and runtime
 *  @param {Bullet} objBullet the bullet we want to write into storage
 *  @return null
 */
function writeBulletToStorage(objBullet) {
  runTimeBullets[objBullet.ID] = objBullet;
  localStorage.setItem(objBullet.ID, JSON.stringify(objBullet));
  const bulletIDs = readArrayFromStorage('bulletIDs');
  bulletIDs.push(objBullet.ID);
  localStorage.setItem('lastID', lastID);
  writeArrayToStorage('bulletIDs', bulletIDs);
}

/** Deletes a bullet from storage
 *  @param {Number} intID - ID of the bullet we want to delet
 */
function deleteBulletFromStorage(intID) {
  intID = Number(intID);
  localStorage.removeItem(intID);

  // possibly can be made more efficient or just outsource to API
  const bulletIDs = readArrayFromStorage('bulletIDs');
  const bulletIndex = bulletIDs.indexOf(intID);
  bulletIDs.splice(bulletIndex, 1);
  writeArrayToStorage('bulletIDs', bulletIDs);
}

/** TODO: should populate the runtime list from local storage
 *  Renders bullets from storage into runtime.
 *  @return null
 */
function fillRunTimeBullets() {
  if (runTimeUpToDate) return;
  lastID = localStorage.getItem('lastID');
  if (lastID === 'null' || lastID == null) {
    localStorage.setItem('lastID', lastID);
    lastID = 0;
    writeArrayToStorage('bulletIDs', []);
    writeArrayToStorage('tags', JSON.stringify({}));
  }

  lastID = Number(lastID);
  const bulletIDs = readArrayFromStorage('bulletIDs');
  console.log('loaded bullet ids: ', bulletIDs);
  for (const ID of bulletIDs) {
    runTimeBullets[ID] = JSON.parse(localStorage.getItem(ID));
    console.log('loaded bullet object: ', runTimeBullets[ID]);
  }
  runTimeTags = JSON.parse(localStorage.getItem('tags'));
  runTimeUpToDate = true;
}

/** Helper function to filter array of bullets
 *  @param {Array} arrayIn
 *  @param {String} bulletFilter
 *  @return a filtered list according to the bullet type filter
 */
function filterArray(arrayIn, bulletFilter) {
  const arrayOut = [];
  for (const bullet in arrayIn) {
    if (bullet.type === bulletFilter) {
      arrayOut.push(bullet);
    }
  }
  return arrayOut;
}

/** NOTE: Can be made more efficient or just outsource to API
 *  Writes an array to storage with an associated key
 *  @param {string} strKey the array's key
 *  @param {Array} lstArray the array we want to store
 *  @return null
 */
function writeArrayToStorage(strKey, lstArray) {
  localStorage.setItem(strKey, JSON.stringify({ array: lstArray }));
}

/** Reads an array given an associated key
 *  @param {string} strArrayKey the array's key
 *  @return the array we want to read
 */
function readArrayFromStorage(strArrayKey) {
  const array = localStorage.getItem(strArrayKey);
  // JSON.parse(array)['array'] turned to JSON.parse(array).'array'
  return JSON.parse(array).array;
}
