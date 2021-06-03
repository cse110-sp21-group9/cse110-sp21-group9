export const MONTH_NAMES_LONG = {
    1: 'January',
    2: 'Feburuary',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  };

export const WEEK_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const WEEK_NAMES_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function hashString(type, year,month, day=null){
    if(type=='m'){
        return type + '-' + year + '-' + month;
    }
    else{
        return type + '-' + year + '-' + month + '-' + day;
    }
}

export function readHash(hash){
    var splitted = hash.split('-');
    if(splitted[0]=='m'){
        console.log(parseInt(splitted[1]), parseInt(splitted[2]));
        return new Date(parseInt(splitted[1]), parseInt(splitted[2])-1, 1); // if object doesn't contain a day, default to first of month
    }
    else{
        return new Date(parseInt(splitted[1]), parseInt(splitted[2])-1, parseInt(splitted[3]));
    }
}

export function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
  
export function startDate(month, year) {
    const day = new Date(year, month - 1, 1); // 0 is sunday, 1 is monday, ..., 6 is saturday
    return day.getDay();
}

export function updateURL(hash) {
    const url = new URL(document.URL);
    url.hash = hash;
    document.location.href = url.href;
}