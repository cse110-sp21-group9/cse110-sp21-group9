const settingsModel = document.getElementById('settingsNav');

/* Open settings modal */
settingsModel.addEventListener('click', function() {
  $('#settingsModal').modal('toggle');
});

/* Edward stuff */
const testData = {
  id_1: {
    type: 'task', // task, event, note
    title: 'Walk Dog',
    date: '2021-05-07T20:00'
  },
  id_2: {
    type: 'task',
    title: 'Feed Dog',
    date: '2021-05-08T20:00'
  },
  id_3: {
    type: 'event',
    title: 'Test',
    date: '2021-05-10T20:00'
  },
  id_4: {
    type: 'event',
    title: 'Eat',
    date: '2021-05-07T20:00'
  },
  id_5: {
    type: 'note',
    title: 'Hi Edmund',
    date: '2021-05-10T20:00'
  },
  id_6: {
    type: 'note',
    title: 'heuhuehue',
    date: '2021-04-28T20:00'
  },
  id_7: {
    type: 'note',
    title: 'heuhuehue2',
    date: '2021-05-01T20:00'
  },
  id_8: {
    type: 'note',
    title: 'mwahahaaha',
    date: '2021-05-30T20:00'
  },
  id_9: {
    type: 'note',
    title: 'mwahahaaha2',
    date: '2021-06-04T20:00'
  },
  id_10: {
    type: 'event',
    title: 'Walk',
    date: '2021-05-07T20:00'
  },
  id_11: {
    type: 'event',
    title: 'Walk2',
    date: '2021-05-07T20:00'
  },
  id_12: {
    type: 'event',
    title: 'Walk3',
    date: '2021-05-07T20:00'
  },
  id_13: {
    type: 'event',
    title: 'Walk4',
    date: '2021-05-07T20:00'
  }
};

// Download feature
const exportData = document.getElementById('exportData');

exportData.addEventListener('click', function() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(testData, null, 2)], {
      type: 'text/plain'
    })
  );
  a.setAttribute('download', 'json.txt');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Upload feature??? HELLO BACKEND TEAM HAVE FUN :)
const getFiles = document.getElementById('input');
const data = document.getElementById('data');

getFiles.addEventListener('change', function() {
  console.log('read');
  function read(callback, file) {
    const reader = new FileReader();
    reader.onload = function() {
      callback(reader.result);
    };
    reader.readAsText(file);
  }

  function callBackTest(input) {
    data.innerHTML = input;
  }

  read(callBackTest, this.files[0]);
});

function setTheme(strTheme) {
  const themeSwitch = document.getElementById('customSwitch1');

  document.documentElement.setAttribute('data-theme', strTheme);
  localStorage.setItem('theme', strTheme);
  // switch logo
  // add bg light and bg light to navbar
  // switching to dark mode
  if (strTheme === 'dark') {
    // switch logo
    document.getElementById('logo').src =
      '/source/frontend/assets/dark-logo.svg';

    // switch navbar
    document.getElementById('navbar').className =
      'd-flex flex-column flex-shrink-0 bg-dark';

    themeSwitch.checked = true;
  } else {
    // switch logo
    document.getElementById('logo').src =
      '/source/frontend/assets/nav-logo.svg';

    // switch navbar
    document.getElementById('navbar').className =
      'd-flex flex-column flex-shrink-0 bg-light';

    themeSwitch.checked = false;
  }
}

// Light/Dark mode switch feature
document.addEventListener('DOMContentLoaded', function(event) {
  const theme = localStorage.getItem('theme');

  if (theme !== null) { setTheme(theme); } else { setTheme('light'); }

  const themeSwitch = document.getElementById('customSwitch1');
  themeSwitch.onclick = function() {
    console.log(themeSwitch);
    // Get the current selected theme, on the first run. it should be `light`
    const currentTheme = document.documentElement.getAttribute('data-theme');

    // Switch between `dark` and `light`
    const switchToTheme = currentTheme === 'dark' ? 'light' : 'dark';

    setTheme(switchToTheme);
  };
});
