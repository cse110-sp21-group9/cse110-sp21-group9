//import "./DOMPurify/dist/purify.min.js";

/* get elements from html page */
//buttons and general writing space
var formButton = document.getElementById('addBulletBut');
var bujoSpace = document.getElementById('bujoSpace');
var saveBtn = document.getElementById('saveAdd');

//creation inputs
var titleInput = document.getElementById('title');
var typeInput = document.getElementById('type');
var dateInput = document.getElementById('time');
var descInput = document.querySelector("[name = 'desc']");
//var tagInput = document.getElementById('tag');

//output of creation
var output = document.getElementById("output");

//deletion stuff
var confirmBox = document.getElementById('deleteBullet');
var confirmBtn = document.getElementById('okConfirm');

//edit inputs
var ebul = document.getElementById('EditBullet');
var esave = document.getElementById('editSaveAdd');
var etitle = document.getElementById('edittitle');
var etype = document.getElementById('edittype');
var edate = document.getElementById('editdate');
var edesc = document.getElementById('editdesc');
var etag = document.getElementById('edittag');



/* on click set save button to true */
saveBtn.addEventListener('click', function (){
    saveBtn.value = "true";
});

/* on click show new blog box */
formButton.addEventListener('click', function () {
  bujoSpace.showModal();
});

/* on click set edit save to true */
esave.addEventListener('click', function (){
    esave.value = "true";
});

/* on click set confirm button to true */
confirmBtn.addEventListener('click', function (){
    confirmBtn.value = "true";
});

/* opens delete dialog box and deletes selection if confirmBtn is true */
function delet(id){
  confirmBox.showModal();
  confirmBox.addEventListener('close', function temp(){
    id = globid;
    if (confirmBtn.value=="true"){
      // title.splice(id, 1);
      // date.splice(id, 1);
      // summary.splice(id, 1);
      localStorage.removeItem(id+"title");
      localStorage.removeItem(id+"time");
      localStorage.removeItem(id+"desc");
      localStorage.removeItem(id+"type");
      //localStorage.removeItem(id+"tag");
      confirmBtn.value="false";
      var array = localStorage.getItem("list");
      array = array.split(",");
      var i = 0;
      while(array[i]!=id.toString()){
        i = i+1;
      }
      array.splice(i,1);
      localStorage.setItem("list",array);
      render();
    }
    confirmBox.removeEventListener('close',temp);
  });

}

/* opens edit dialog box and saves eddits if esave is true */
function edit(id){
  ebul.showModal();
  // etitle.value = title[id];
  // edate.value = date[id];
  // esummary.value = summary[id];
  etitle.value = localStorage.getItem(id+"title");
  edate.value = localStorage.getItem(id+"time");
  edesc.value = localStorage.getItem(id+"desc");
  etype.value = localStorage.getItem(id+"type");
  etag.value = localStorage.getItem(id+"tag");


  ebul.addEventListener('close', function temp(){
    id = globid;
    if(esave.value=="true"){
      // title[id] = DOMPurify.sanitize(etitle.value);
      // date[id] = DOMPurify.sanitize(edate.value);
      // summary[id] = DOMPurify.sanitize(esummary.value);
      localStorage.setItem(id+"title", etitle.value);
      localStorage.setItem(id+"date", edate.value);
      localStorage.setItem(id+"desc", edesc.value);
      localStorage.setItem(id+"type", etype.value);
      //localStorage.setItem(id+"tag", etag.value);
      esave.value = "false";
      render();
    }
    ebul.removeEventListener('close',temp);
  });

}

/* renders blog list  */
function render(){
  output.innerHTML = "";
  // for (var i =0; i < title.length; i++) {
  // for(var i=0; i< localStorage.length/3; i++){
  var array = localStorage.getItem("list");
  if(!array || array==""){
    output.append(document.createTextNode("Bullet Journal is Empty"));
    return;
  }
  array = array.split(",");
  array.forEach(function(item,index){
    var i = parseInt(item);
    var temp = document.createElement('li');

    //render title of bullet
    var bold = document.createElement('b');
    bold.append(document.createTextNode('Title: '));
    temp.append(bold);
    temp.append(document.createTextNode(title[i]));
    temp.append(document.createTextNode(localStorage.getItem(i+"title")));
    localStorage.setItem(i+"title", title[i]);

    //render date and time bullet was created
    bold = document.createElement('b');
    bold.append(document.createTextNode(' Date: '));
    temp.append(bold);
    temp.append(document.createTextNode(time[i]));
    temp.append(document.createTextNode(localStorage.getItem(i+"time")));
    localStorage.setItem(i+"time", time[i]);

    //render description for bullet
    bold = document.createElement('b');
    bold.append(document.createTextNode(' Desc: '));
    temp.append(bold);
    temp.append(document.createTextNode(desc[i]));
    temp.append(document.createTextNode(localStorage.getItem(i+"desc")));
    localStorage.setItem(i+"desc", desc[i]);

    //render bullet type
    bold = document.createElement('b');
    bold.append(document.createTextNode(' Type: '));
    temp.append(bold);
    temp.append(document.createTextNode(type[i]));
    temp.append(document.createTextNode(localStorage.getItem(i+"type")));
    localStorage.setItem(i+"type", type[i]);

    //render bullet's tags
    bold = document.createElement('b');
    bold.append(document.createTextNode(' Tag: '));
    temp.append(bold);
    temp.append(document.createTextNode(tag[i]));
    temp.append(document.createTextNode(localStorage.getItem(i+"tag")));
    localStorage.setItem(i+"tag", type[i]);

    //render edit button
    var x = document.createElement("BUTTON");
    x.id= i;
    x.style="outline:none; background-color: Transparent; border: none;";
    x.className = "edit";
    var t = document.createTextNode("Edit");
    x.appendChild(t);
    temp.append(x);

    //render delete button
    var x = document.createElement("BUTTON");
    x.id= i;
    x.style="outline:none; background-color: Transparent; border: none;";
    x.className = "delete";
    var t = document.createTextNode("Delete");
    x.appendChild(t);
    temp.append(x);
    output.append(temp);
  });

  //add functionality to given buttons
  var tempButtons = document.getElementsByClassName("delete");
  Array.from(tempButtons).forEach((btn) => {
    btn.addEventListener('click', () => {
      delet(btn.id);
    });
  });
  var tempButtons = document.getElementsByClassName("edit");
  Array.from(tempButtons).forEach((btn) => {
    btn.addEventListener('click', () => {
      edit(btn.id);
    });
  });

}

/* add listener for inserting new blog posts */
bujoSpace.addEventListener('close', function (){
  if(saveBtn.value=="true"){
    var i = 0;
    while(localStorage.getItem(i+"title")){
      i = i+1;
    }
    saveBtn.value = "false";
    localStorage.setItem(i+"title", titleInput.value);
    localStorage.setItem(i+"time", dateInput.value);
    localStorage.setItem(i+"desc", descInput.value);
    localStorage.setItem(i+"type", typeInput.value);
    //localStorage.setItem(i+"tag", tagInput.value);
    var array = localStorage.getItem("list");
    if(!array || array==""){
      array = [i.toString()];
      localStorage.setItem("list",array);
      render();
      return;
    }
    array = array.split(",");
    array.push(i.toString());
    localStorage.setItem("list",array);
    render();
  }
});

render();
