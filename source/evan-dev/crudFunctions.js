/*
    most of the code in here should be considered wip
*/

let runTimeBullets = {};
let runTimeUpToDate = false;
let lastID; //this is bad

export function setBulletAttributes(intID, objData = null, strType=null, dateDate=null, lstTags=null)
{
    let bullet = Object.assign({}, runTimeBullets[intID]); //make a shallow copy first
    if (objData)
        bullet.data = objData;
    if (strType)
        bullet.data = objData;
    if (dateDate)
        bullet.date = dateDate;
    if (lstTags)
        bullet.tags = lstTags;
    
    updateBulletInStorage(bullet);
}

export function getBulletsByDateRange(dateStart, dateEnd, objOption=null)
{
    let bulletsToReturn = [];
    for (const [ID, bullet] of Object.entries(runTimeBullets))
    {
        if (bullet.date >= dateStart && bullet.date < dateEnd)
            bulletsToReturn.push(bullet);
    }
    return bulletsToReturn;
}

export function getBulletById(intID, objOption=null)
{
    return runTimeBullets[intID];
}

//makes a new bullet and adds it to storage
export function createBullet(objData, strType, dateDate, lstTags)
{
    let bullet;
    if (strType === "note")
    {
        lastID++;
        bullet = makeNoteBullet(objData, dateDate, lstTags, lastID);
        localStorage.setItem("lastID", lastID);
        writeBulletToStorage(bullet);
    }

    //todo write ids into local storage array for later querying

    return bullet.ID;
}

export function deleteBulletById(intID)
{
    runTimeBullets[intID] = null;
    deleteBulletFromStorage(intID);
}

export function initCrudRuntime()
{
    fillRunTimeBullets();
}

//helper function for creating note bullets
function makeNoteBullet(objData, dateDate, lstTags, intID)
{
    return {
        ID: intID,
        date: dateDate,
        type: "note",
        tags: lstTags,
        data: objData,
    };
}

//hack
//is there a better way to do this?
function updateBulletInStorage(objBullet)
{
    runTimeBullets[objBullet.ID] = objBullet;
    localStorage.setItem(objBullet.ID, JSON.stringify(objBullet));
}

//writes bullet to local storage and runtime
function writeBulletToStorage(objBullet)
{
    runTimeBullets[objBullet.ID] = objBullet;

    localStorage.setItem(objBullet.ID, JSON.stringify(objBullet));
    let bulletIDs = readArrayFromStorage("bulletIDs");
    console.log(bulletIDs);
    bulletIDs.push(objBullet.ID);
    localStorage.setItem("lastID", lastID);
    writeArrayToStorage("bulletIDs", bulletIDs);
}

function deleteBulletFromStorage(intID)
{
    localStorage.removeItem(intID);
    let bulletIDs = readArrayFromStorage("bulletIDs");
    const bulletIndex = bulletIDs.indexOf(intID);
    bulletIDs.splice(bulletIndex, 1);
    console.log(bulletIDs);
    writeArrayToStorage("bulletIDs", bulletIDs);
}

//todo should populate the runtime list from local storage
function fillRunTimeBullets()
{
    if (runTimeUpToDate) return;

    lastID = localStorage.getItem("lastID");

    if (lastID == "null" || lastID == null)
    {
        localStorage.setItem("lastID", lastID);
        lastID = 0;
        writeArrayToStorage("bulletIDs", []);
    }

    lastID = Number(lastID);
    let bulletIDs = readArrayFromStorage("bulletIDs");
    console.log("loaded bullet ids: ", bulletIDs);
    for (const ID of bulletIDs)
    {
        runTimeBullets[ID] = JSON.parse(localStorage.getItem(ID));
        console.log("loaded bullet object: ", runTimeBullets[ID]);
    }

    runTimeUpToDate = true;
}

function writeArrayToStorage(strKey, lstArray)
{
    localStorage.setItem(strKey, JSON.stringify({array: lstArray}));
}

function readArrayFromStorage(strArrayKey)
{
    let array = localStorage.getItem(strArrayKey);
    return JSON.parse(array)["array"];
}