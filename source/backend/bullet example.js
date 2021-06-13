
//bullet with no option
let myBullet = crud.createBullet('note', 'title', new Date(), ['todo', 'otherTag'], 'the content');
console.log(myBullet.title);
myBullet = crud.setBulletTitle(myBullet.ID, 'title2');
myBullet = crud.deleteBullet(myBullet.ID);

//bullet with option
let myBullet2 = crud.createBullet('note', 'title', new Date(), ['todo', 'otherTag'], 'the content', {dueDate: new Date()});
console.log(myBullet2.title);
myBullet2 = crud.setBulletTitle(myBullet2.ID, 'title2');
myBullet2 = crud.deleteBullet(myBullet2.ID);

//bullet that requires option
let myBullet3 = crud.createBullet('task', 'title', new Date(), ['todo', 'otherTag'], 'the content', {dueDate: new Date(), status: 'something'});
console.log(myBullet3.title);
myBullet3 = crud.addBulletTag(myBullet3.ID, 'newTag');
myBullet3 = crud.deleteBullet(myBullet3.ID);
console.log('Testing Build Process');
//getting bullets
let someBullets = crud.getBulletsByDateRange(new Date(year, month, day), new Date(year, month, day+1));
someBullets = crud.getEventBulletsByDateRange(new Date(year, month, day), new Date(year, month, day+1));
//for geting week/month/undated bullets
someBullets = crud.getBulletsByDateSpan(new Date(year, month, day), new Date(year, month, day+1));