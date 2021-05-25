const timeSegments = document.getElementById('time_list');

for (let i = 0; i < 24; i++) {
  timeSegments.appendChild(makeTimeSlotComponent(i));
}

function makeTimeSlotComponent(intTime) {
  let stringTime = String(intTime);
  if (intTime < 10) stringTime = '0' + stringTime;
  const timeSlot = document.createElement('div');
  const timeText = document.createTextNode(`${stringTime}:00`);
  const bulletList = document.createElement('ul');

  timeSlot.appendChild(timeText);
  timeSlot.appendChild(bulletList);

  timeSlot.className = 'time_slot';

  return timeSlot;
}
