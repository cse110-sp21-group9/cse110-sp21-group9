/* eslint-env jquery */
import { getLocalStorageData, loadLocalStorageData } from '../../../backend/crudFunctions.js';

const settingsModel = document.getElementById('settingsNav');

/* Open settings modal */
settingsModel.addEventListener('click', function() {
  $('#settingsModal').modal('toggle');
});

// Download feature
const exportData = document.getElementById('exportData');

exportData.addEventListener('click', function() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(getLocalStorageData())], {
      type: 'text/plain'
    })
  );
  a.setAttribute('download', 'backup.txt');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

const getFiles = document.getElementById('input');

getFiles.addEventListener('change', function() {
  const reader = new FileReader();
  reader.readAsText(this.files[0]);
  loadLocalStorageData(reader.result);
  location.reload();
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
