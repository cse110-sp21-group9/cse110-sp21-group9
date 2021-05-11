getElementByDate(date, type, option) //=> List of element ids;

getBulletsByDate(date, option) //=> List of element ids, where each id points to a Bullet
getNotesByDate(date, option) //=> List of element ids, where each id points to a Note
getTasksByDate(date, option) //=> List of element ids, where each id points to a Task
getTrackersByDate(date, option) //=> List of element ids, where each id points to a Tracker

//should get be by global id or per element type?
getElementById(id, option) //=> element;

getBulletsById(date, option) //=> List of element ids, where each id points to a Bullet
getNotesById(date, option) //=> List of element ids, where each id points to a Note
getTasksById(date, option) //=> List of element ids, where each id points to a Task
getTrackersById(date, option) //=> List of element ids, where each id points to a Tracker

getElementsByTag(tag, option) //=> returns all elements with that tag

getBulletsByTag(tag, option) //=> List of bullets with that tag
getNotesByTag(tag, option) //=> List of notes with that tag
getTasksByTag(tag, option) //=> List of tasks with that tag
getTrackersByTag(tag, option) //=> List of trackers with that tag

getElementByDateRange(start, end, type, option) //=> List of element ids;

setElementById(id, data, option)

setBulletsById(date, option) //=> List of element ids, where each id points to a Bullet
setNotesById(date, option) //=> List of element ids, where each id points to a Note
setTasksById(date, option) //=> List of element ids, where each id points to a Task
setTrackersById(date, option) //=> List of element ids, where each id points to a Tracker

createBullet(data, tag) //=> returns element id;
createNote(data, tag) //=> returns element id;
createTask(data, tag) //=> returns element id;
createTracker(data, tag) //=> returns element id;

deleteElementById(id) //=> return null or throw exception