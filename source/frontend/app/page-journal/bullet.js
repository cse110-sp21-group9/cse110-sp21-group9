/**
 * Read only Bullet Class
 * to be subclassed later by notes, tasks, events, etc.
 * It uses the template with id="bulletTemplate" in crud.html
 *
 * front end side code should never construct a bullet class directly since ID must be
 * assigned by crud runtime. If a new bullet object is needed construct one through the crud functions
 */

export class Bullet {
  constructor(objBullet) {
    this.ID = objBullet.ID; // automatic generation up to nearest second, hidden from user
    this.title = objBullet.title; // user selection
    this.type = objBullet.type; // user selection, this is the specific type of bullet
    this.date = objBullet.date; // user selected date, the one actually displayed to the user
    this.tags = objBullet.tags; // user selection
    this.content = objBullet.content; // user input
    this.dueDate = objBullet.dueDate;
    this.status = objBullet.status;
  }

  get ID() {
    return this.ID;
  }

  get title() {
    return this.title;
  }

  get type() {
    return this.type;
  }

  get date() {
    return this.date;
  }

  get tags() {
    return this.tags;
  }

  get content() {
    return this.content;
  }

  get dueDate() {
    return this.dueDate;
  }

  get status() {
    return this.status;
  }
}
