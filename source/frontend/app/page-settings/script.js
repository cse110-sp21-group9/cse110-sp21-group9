const exportData = document.getElementById('exportData');
const getFiles = document.getElementById('input');
const data = document.getElementById('data');
const modeChange = document.getElementById('modeChange');


exportData.addEventListener('click', function() {
  const a = document.createElement('a');
  var temp = {}; 
  if (localStorage.getItem('bulletIDs') != null) {
    var list = JSON.parse(localStorage.getItem('bulletIDs'))["array"];
    for (let i = 0; i < list.length; i++) {
      temp[list[i]] = JSON.parse(localStorage.getItem(list[i]));
    }
  }
 
  a.href = URL.createObjectURL(new Blob([JSON.stringify(temp, null, 2)], {
    type: 'text/plain'
  }));
  a.setAttribute('download', 'json.txt');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

getFiles.addEventListener('change', function() {
  function read(callback, file) {
    const reader = new FileReader();

    reader.onload = function() {
      callback(reader.result);
    };

    reader.readAsText(file);
  }

  function callBackTest(input) {
    data.innerHTML = input;
    var large=0;
    var array = []
    
    for (const [key, value] of Object.entries(JSON.parse(input))) {
      localStorage.setItem(key,JSON.stringify(value));

      if(parseInt(key)>large){
        large = parseInt(key);
      }
      array.push(parseInt(key));
    }
    localStorage.setItem('bulletIDs', JSON.stringify({"array": array}));
    localStorage.setItem('lastID',large);
  }

  read(callBackTest, this.files[0]);
});

data.addEventListener('click', function() {
  let results = JSON.stringify(data.innerHTML);

  results = JSON.parse(results);
  const parsed = JSON.parse(results);
  parsed.id_13.title = 'NOT WALK';

  data.innerHTML = JSON.stringify(parsed);

  testData.id_13.title = 'NOT WALK';
});

modeChange.addEventListener('click', function() {
  if (modeChange.getAttribute('data-theme') === 'dark') {
    modeChange.setAttribute('data-theme', 'light');
  } else {
    modeChange.setAttribute('data-theme', 'dark');
  }
});
