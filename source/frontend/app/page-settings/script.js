var testData = {
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

const exportData = document.getElementById('exportData');
const getFiles = document.getElementById('input');
const data = document.getElementById('data');
const modeChange = document.getElementById('modeChange')


data.innerHTML = JSON.stringify(testData);

exportData.addEventListener('click',function() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(testData, null, 2)], {
        type: "text/plain"
    }));
    a.setAttribute("download", "json.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

getFiles.addEventListener('change', function(){

    function read(callback, file) {

        var reader = new FileReader();
      
        reader.onload = function() {
          callback(reader.result);
        }
      
        reader.readAsText(file);
    }
    
    function callBackTest(input){
        data.innerHTML = input;
    }

    read(callBackTest, this.files[0]);
    
});

data.addEventListener('click', function(){
    var results = JSON.stringify(data.innerHTML);
    
    results = JSON.parse(results);
    var parsed = JSON.parse(results);
    parsed['id_13']['title'] = 'NOT WALK';

    data.innerHTML = JSON.stringify(parsed);

    testData['id_13']['title'] = 'NOT WALK';
})

modeChange.addEventListener('click', function(){
    if("data-theme" == "dark"){
        documentElement.setAttribute("data-theme", light);
    }
    else{
        documentElement.setAttribute("data-theme", dark);
    }
    
});