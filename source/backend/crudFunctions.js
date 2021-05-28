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
const runTimeTags = {};
let runTimeUpToDate = false;
let lastID; // this is bad

/** Gets all bullets within the specified date range
 *  @param {Date} dateStart the beginning date to query from
 *  @param {Date} dateEnd the end date to query from
 *  @return a list of bullets that should be returned
 */
// TODO build bullet classes instead of returning objects directly
export function getBulletsByDateRange(dateStart, dateEnd, objOption = null) {
  const bulletsToReturn = [];
  for (const bulletObj of runTimeBullets) {
    if (bulletObj.date >= dateStart && bulletObj.date < dateEnd) {
      bulletsToReturn.push(new Bullet(bulletObj));
    }
  }
  return bulletsToReturn;
}

//TODO
function getBulletsByDateSpan(dateStart, dateDue, option){
  const bulletsToReturn = [];
  for (const bulletObj of runTimeBullets) {
    if (bulletObj.date === dateStart && bulletObj.date === dateDue) {
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
  if (intID in runTimeBullets) return Bullet(runTimeBullets[intID]);
  else return null; 
}

/** Gets all event bullets within the specified date range
 *  @param {Date} dateStart the beginning date to query from
 *  @param {Date} dateEnd the end date to query from
 *  @return a list of bullets that should be returned
 */
export function getEventBulletsByDateRange(dateStart, dateEnd, objOption = null) {
  unfilteredBullets = getBulletsByDateRange(dateStart, dateEnd, objOption);
  return filterArray(unfilteredBullets, 'Event');
}

export function getNoteBulletsByDateRange(dateStart, dateEnd, objOption = null) {
  unfilteredBullets = getBulletsByDateRange(dateStart, dateEnd, objOption);
  return filterArray(unfilteredBullets, 'Note');
}

export function getTaskBulletsByDateRange(dateStart, dateEnd, objOption = null) {
  unfilteredBullets = getBulletsByDateRange(dateStart, dateEnd, objOption);
  return filterArray(unfilteredBullets, 'Task');
}

//TODO
function getBulletsByTag(tag, option){}
function getEventBulletsByTag(tag, option){}
function getNoteBulletsByTag(tag, option){}
function getTaskBulletsByTag(tag, option){}

function setBulletTitle(ID, title, option){}
function setBulletDate(ID, date, option){}
function setBulletTags(ID, tagList, option){}
function addBulletTag(ID, tag, option){}
function removeBulletTag(ID, tag, option){}
function setBulletContent(ID, content, option){}
function setBulletDueDate(ID, dueDate, option){}
function setBulletStatus(ID, status, option){}

function getAvailableTags() {
  return Object.keys(tags);
}

function createTag(strTag, option = null) {
  if (!(strTag in tags)) {
    tags[strTag] = [];
  }
}

function removeTagGlobably(tag, option) {

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
export function createBullet(strType, strTitle, strDate, lstTags, strContent, option = null) {
  function writeNewBullet(bullet) {
    lastID++;
    localStorage.setItem('lastID', lastID);
    writeBulletToStorage(bullet);
    creationSuccessful = true;
  }

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
    bullet.dueDate = option.dueDate;
    writeNewBullet(bullet);
  } else if (strType === 'Task') {
    bullet.status = option.dueDate;
    writeNewBullet(bullet);
  }

  if (creationSuccessful) { return new Bullet(bullet); } else { return null; }
}

/** Deletes a bullet by the specified ID
 *  @param {Number} intID the bullet's ID
 *  @return null
 */
export function deleteBulletById(intID) {
  if (intID in runTimeBullets)
  {
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

/** Writes bullet to local storage and runtime
 *  @param {Bullet} objBullet the bullet we want to write into storage
 *  @return null
 */
function writeBulletToStorage(objBullet) {
  runTimeBullets[objBullet.ID] = objBullet;
  localStorage.setItem(objBullet.ID, JSON.stringify(objBullet));
  const bulletIDs = readArrayFromStorage('bulletIDs');
  console.log(bulletIDs);
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
    writeArrayToStorage('tags', []);
  }

  lastID = Number(lastID);
  const bulletIDs = readArrayFromStorage('bulletIDs');
  console.log('loaded bullet ids: ', bulletIDs);
  for (const ID of bulletIDs) {
    runTimeBullets[ID] = JSON.parse(localStorage.getItem(ID));
    console.log('loaded bullet object: ', runTimeBullets[ID]);
  }
  tags = readArrayFromStorage('tags');
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
      output.push(bullet);
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
