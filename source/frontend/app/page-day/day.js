const timeSegments = document.getElementById("time_list");

for (let i = 0; i < 24; i++)
{
    timeSegments.appendChild(makeTimeSlotComponent(i));
}

function makeTimeSlotComponent(intTime)
{
    let stringTime = String(intTime);
    if (intTime < 10) stringTime = "0" + stringTime;
    let timeSlot = document.createElement("div");
    let timeText = document.createTextNode(`${stringTime}:00`);
    let bulletList = document.createElement("ul");

    timeSlot.appendChild(timeText);
    timeSlot.appendChild(bulletList);

    timeSlot.className = "time_slot";

    return timeSlot;
}