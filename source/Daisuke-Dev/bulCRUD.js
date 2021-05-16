var formButton = document.getElementById('addBulletBut');
var tagList = ['School', 'Sports', 'extras'];


var show = true;


/* bruh what is this function for /
function showCheckboxes() {
    var checkboxes = document.getElementById("checkBoxes");

    if (show) {
        checkboxes.style.display = "block";
        show = false;
    } else {
        checkboxes.style.display = "none";
        show = true;
    }
}
*/

/*creates a checklist in the dialog form with options being the ones established in tagList */
var idCounter = 0;
function updateTags() {
  //taglist is already defined
  var checkList = document.getElementById('tags');
  for(const tag in tagList){
    //create checkbox
    var options = document.createElement("input");
    //specify element attributes
    options.setAttribute('type', 'checkbox');
    options.setAttribute('id', idCounter + 1);
    options.setAttribute('value', tagList[tag]);       
    options.setAttribute('name', tagList[tag]);

    // since we're creating a bullet, we want them to start with none checked
    options.checked = false;

    //create label for checkbox and define attributes
    var label = document.createElement('label');
    label.setAttribute('for', tagList[tag]);

    //append text to the label
    label.appendChild(document.createTextNode(tagList[tag]));

    //append checkbox and label to the form
    checkList.appendChild(options);
    checkList.appendChild(label);
    idCounter = idCounter + 1;
    }
}

/* Adds the checklist of tags with the previously chosen selection to the edit bullet dialog form */
function editTags() {
    var checkList = document.getElementById('edittag');

    for(const tag in tagList){
        //create checkbox
        var options = document.createElement("input");
        //specify element attributes
        options.setAttribute('type', 'checkbox');
        options.setAttribute('id', idCounter + 1);
        options.setAttribute('value', tagList[tag]);       
        options.setAttribute('name', tagList[tag]);
    
        // set the correct ones checked
        options.checked = true;

        //create label for checkbox and define attributes
        var label = document.createElement('label');
        label.setAttribute('for', tagList[tag]);
    
        //append text to the label
        label.appendChild(document.createTextNode(tagList[tag]));
    
        //append checkbox and label to the form
        checkList.appendChild(options);
        checkList.appendChild(label);
        idCounter = idCounter + 1;
    }
}

//editTags();

//updateTags();

formButton.addEventListener('click', function () {
    bujoSpace.showModal();
});
  