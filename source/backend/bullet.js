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
}
