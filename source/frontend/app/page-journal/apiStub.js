/*
    architecture log:
        5/10/2021: decided bullets will be class based in order to easily extend functionality
        5/10/2021: decided that get function will return bullet objects rather than ids, since
            this seems like a a less round about method.
*/

/*
    current bullet object structure
    bullet
    {
        ID: intID,
        date: dateObjDate,
        type: strType,
        tags: lstTags,
        data: objData,
    }
*/

function getBulletsByDateRange(start, end, option){}      //=> List of bullet objects;

function getBulletByDate(date, option){}                  //=> list of bullet objects in date range date->date (aka specific time);

function getBulletById(id, option){}                      //=> bulletObject;

function getEventBulletsByDateRange(start, end, option){} //=> List of Event Bullets
function getNoteBulletsByDateRange(start, end, option){}        //=> List of Note Bullets
function getTaskBulletsByDateRange(start, end, option){}        //=> List of Task Bullets
function getTrackerBulletsByDateRange(start, end, option){}     //=> List of Tracker Bullets

function getBulletsByTag(tag, option){}                   //=> returns all elements with that tag

function getEventBulletsByTag(tag, option){}              //=> List of event bullets that have the specified tag
function getNoteBulletsByTag(tag, option){}               //=> List of note bullets that have the specified tag
function getTaskBulletsByTag(tag, option){}               //=> List of task bullets that have the specified tag
function getTrackerBulletsByTag(tag, option){}            //=> List of tracker bullets that have the specified tag

function setBulletData(id, data, option){}                //=> sets the data object for the bullet
function setBulletDate(id, date, option){}                //=> sets the date for the bullet
//should type changing be allowed?
function setBulletType(id, type, option){}                //=> sets the type for the bullet
//how should tags work?
function setBulletAttributes(id, data = null, type=null, date=null, tags=null) //=> set one or more attributes of a bullet


function createBullet(data, type, date, tags){}           //=> returns the id of the created bullet;

function deleteBulletById(id){}                           //=> return null or throw exception if id not found