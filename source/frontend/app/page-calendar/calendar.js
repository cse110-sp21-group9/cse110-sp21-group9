function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function startDate(month, year) {
  const day = new Date(year, month, 1).getDay(); // 0 is sunday, 1 is monday, ..., 6 is saturday
  return day;
}

console.log(daysInMonth(5, 2021));
console.log(startDate(4, 2021));
