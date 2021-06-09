/*
    architecture log:
        5/10/2021: decided bullets will be class based in order to easily extend functionality
        5/10/2021: decided that get function will return bullet objects rather than ids, since
            this seems like a a less round about method.
        5/24/2021:
        -crud functions will now construct and return a bullet class
        -bullets will no longer have a data object, but instead store all possible feilds at the top level 
*/

/*
    current bullet object structure
    bullet
    {
        ID: ID,
        title: strTitle,
        type: strType,
        date: dateDate,
        tags: lstTags,
        content: strContent,
        dueDate: dateDueDate,
        status: strStatus,
    }
*/

function getBulletsByDateRange(start, end, option){}       //=> List of bullet classes

//get bullets that match date and dueDate exactly
function getBulletsByDateSpan(start, due, option){}        //=> List of bullet classes

function getBulletById(ID, option){}                       //=> returns bullet class

function getEventBulletsByDateRange(start, end, option){}  //=> List of Event Bullets
function getNoteBulletsByDateRange(start, end, option){}   //=> List of Note Bullets
function getTaskBulletsByDateRange(start, end, option){}   //=> List of Task Bullets

function getBulletsByTag(tag, option){}             //=> returns all elements with that tag

function getEventBulletsByTag(tag, option){}        //=> List of event bullets that have the specified tag
function getNoteBulletsByTag(tag, option){}         //=> List of note bullets that have the specified tag
function getTaskBulletsByTag(tag, option){}         //=> List of task bullets that have the specified tag

function setBulletTitle(ID, title, option){}        //=> returns updated bullet class
function setBulletDate(ID, date, option){}          //=> returns updated bullet class
function setBulletTags(ID, tagList, option){}       //=> returns updated bullet class
function addBulletTag(ID, tag, option){}            //=> returns updated bullet class
function removeBulletTag(ID, tag, option){}         //=> returns updated bullet class
function setBulletContent(ID, content, option){}    //=> returns updated bullet class
function setBulletDueDate(ID, dueDate, option){}    //=> returns updated bullet class
function setBulletStatus(ID, status, option){}      //=> returns updated bullet class

function getAvailableTags(){}                       //=> returns a list of all known tags
function removeTagGlobably(tag){}                   //=> removes tag from the global tag table, and removes it from all bullets

//note due date and status will be taken as an option Object if the type requires them
function createBullet(strType, strTitle, strDate, lstTags, strContent, option){} //=> returns the created bullet class

function deleteBulletById(ID){}                     //=> return null or throw exception if id not found