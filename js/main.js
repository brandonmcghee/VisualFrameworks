//Brandon McGhee
//Assignment 3
//VFW

window.addEventListener("DOMContentLoaded", function () {
    
    //Search the document for an element and returns the element to 
    function $(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    //Validation function
    function validate(e) {
        
        var getSpirit = $('spiritName');
        var getBottle = $('slideVAL');
        var getShelve = $('topShelve');
        var getFamily = $('spiritFamily');
        var getDate = $('datePurchase');
        
        var messageAry = [];
        
        //Reset error message
        errMsg.innerHTML = "";
            getSpirit.style.border = "1px solid black";
            getBottle.style.border = "1px solid black";
            getShelve.style.border = "1px solid black";
            getFamily.style.border = "1px solid black";
            getDate.style.border = "1px solid black";
        
        //Name Validation
        if (getSpirit.value == "") {
            var nameError = "Please enter the Spirit's Name";
            getSpirit.style.border = "2px solid red";
            messageAry.push(nameError);
        }
        
        //Bottle Size Validation
        if (getBottle.value == "") {
            var bottleError = "Please select a Size of the Bottle";
            getBottle.style.border = "2px solid red";
            messageAry.push(bottleError);
        }
        
        //Shelve Quality Validation
        var radios = document.forms[0].shelve;
        if (!radios[0].checked && !radios[1].checked && !radios[2].checked) {
            var shelveError = "Please select a Shelve Quality";
            $('topShelve').style.border = "1px solid red";
            $('middleShelve').style.border = "1px solid red";
            $('bottomShelve').style.border = "1px solid red";
            messageAry.push(shelveError);
        }
        
        //Family Validation
        if (getFamily.value == "---Select Spirit Family---") {
            var familyError = "Please select a Spirit Family";
            getFamily.style.border = "2px solid red";
            messageAry.push(familyError);
        }
        
        //Date Purchased Validation
        if (getDate.value == "") {
            var dateError = "Please select a Purchase Date";
            getDate.style.border = "2px solid red";
            messageAry.push(dateError);
        }
        
        //Display Errors, if any
        if (messageAry.length >= 1) {
            for (var i = 0, j = messageAry.length; i < j; i++) {
                var txt = document.createElement('li');
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        }else{
            //If its all valid
            storeData(this.key);  
        }
    
    }
    
    //Constructs the family select element filled with Family Spirits
    function buildFamily() {
        var formTag = document.getElementsByTagName("form"),
           selectDiv = $('family'),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "spiritFamily");
        for (var i = 0, j = spiritFamily.length; i < j; i++) {
            var makeOption = document.createElement('option');
            var optText = spiritFamily[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectDiv.appendChild(makeSelect);
    }
    
    //Find value of selected radio button
    function getSelectedRadio() {
        var radios = document.forms[0].shelve;
        
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                shelveValue = radios[i].value;
            }
        }
    }
    
    //Toggles "on" and "off" if form is displayed
    function toggleControls(n){
        switch(n){
            case "on":
                $('spiritForm').style.display = "none";
                $('clear').style.display = "inline";
                $('display').style.display = "none";
                $('addNew').style.display = "inline";
                break;
            case "off":
                $('spiritForm').style.display = "block";
                $('clear').style.display = "inline";
                $('display').style.display = "inline";
                $('addNew').style.display = "none";
                $('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    //Stores data into Local Storage
    function storeData(key) {
        //If there is no key, this means this is a brand new item and we need a new key.
        if (!key) {
            var id              = Math.floor(Math.random()*100000001);
        }else{
            //Set the id to the existing key we're editing so that it will save over the data
            //The key is the same key that's been passed along from the editSubmit event handler
            //to the validate function, and then passed here, into the storeData function.
            id = key;
        }

        //Gather all form field values and store in an object.
        //Object properties contain array with the form label and input value.
        
        //Caling Radio Function to see which one the user chose
        getSelectedRadio();
        //Stores form data into an object
        var spirit            = {};
            spirit.spiritName = ["Name: ", $('spiritName').value];
            spirit.bottleMIL  = ["Bottle Size: ", $('slideVAL').value];
            spirit.shelve     = ["Quality: ", shelveValue];
            spirit.family     = ["Family: ", $('spiritFamily').value];
            spirit.date       = ["Date Purchased: ", $('datePurchase').value];
            
        //Save into local storage: Use stringify to convert object to a string.
        localStorage.setItem(id, JSON.stringify(spirit));
        alert("Spirit Stored!");
        toggleControls("on");
    }
    //
    function getData() {
        //Verify if local storage has items
        if (localStorage.length === 0) {
            alert("You have not stored any Spirits! So they were filled for you from JSON");
            autoFillData();
        }
        //Hides the form
        toggleControls("on");
        //Write Data from Local Storage to browser
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items').style.display = "block";
        for (var i = 0, len=localStorage.length; i < len; i++) {
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //Convert the string from local storage value back to and object
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            getImage(obj.family[1], makeSubList);
            for (var n in obj) {
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj [n] [0] + "  " + obj [n] [1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);
        }
    }
    
    //Get Image for Spirit
    function getImage(catName, makeSubList) {
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
        imageLi.appendChild(newImg);
    }
    
    //Auto Populate Local Storage
    function autoFillData() {
        //The actual JSON Object data required for this to work is coming from the json file
        //Store the JSON Object into Local Storage
        for (var n in json) {
            var id = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }
    
    //Constructs delete and edit links
    function makeItemLinks(key, linksLi) {
        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        editLink.className = "edit";
        var editText = "Edit Spirit";
        editLink.addEventListener("click", editSpirit);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        deleteLink.className = "delete";
        var deleteText = "Delete Spirit";
        deleteLink.addEventListener("click", deleteSpirit);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
        
        linksLi.appendChild(breakTag);
        
    }
    
    //Function called to edit user's spirit
    function editSpirit() {
        
        var value = localStorage.getItem(this.key);
        var spirit = JSON.parse(value);
        var radios = document.forms[0].shelve;
        
        toggleControls("off");
        
        $('spiritName').value = spirit.spiritName[1];
        $('slideVAL').value = spirit.bottleMIL[1];
        $('spiritFamily').value = spirit.family[1];
        $('datePurchase').value = spirit.date[1];
        
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].value == "Top Shelve" && spirit.shelve[1] == "Top Shelve") {
                radios[i].setAttribute("checked", "checked");
            }else if (radios[i].value == "Middle Shelve" && spirit.shelve[1] == "Middle Shelve") {
                radios[i].setAttribute("checked", "checked");
            }else if (radios[i].value == "Bottom Shelve" && spirit.shelve[1] == "Bottom Shelve") {
                radios[i].setAttribute("checked", "checked");
            }else{
                return
            }
        
        }
        
        //Remove the initial listener from the input Store Spirit button
        save.removeEventListener("click", storeData);
        
        //Change value of submit button to edit
        $('submit').value = "Edit Spirit >>";
        var editSubmit = $('submit');
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }
    
    //Function for deleting spirit from inventory
    function deleteSpirit() {
        var ask = confirm("Are you sure you want to delete this spirit from your inventory?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert("Spirit has been removed");
            window.location.reload();
        }else{
            alert("Spirt was NOT removed.");
        }
    }
    
    //Clears all Stored Spirit Inventory
    function clearData() {
        var answer = confirm("Do you want to clear all the Spirits in your Inventory?");
        if (answer) {
            if (localStorage.length === 0) {
                alert("Spirit Storage is already Empty!")
            }else{
                localStorage.clear();
                alert("Spirit Storage has been Emptied")
                window.location.reload();
            }
        toggleControls("off");
        }else{
            return false;
        }
    }
    
    //Gathers current value of Slider and displays it to a text field
    function slider() {
        var slide = $('bottleMIL').value;
        
        //Changes the value of the "Size of Bottle" text box to reflect accurate measurements
            for (var i = 0; i < mil.length; i++) {
                if (i == slide) {
                    $('slideVAL').value = mil[i];
                }
            }
        
    }
    
    //Var defaults
    var shelveValue;
    var errMsg = $('errors');
    var spiritFamily = [
                        "---Select Spirit Family---",
                        "Whiskey",
                        "Rum",
                        "Vodka",
                        "Gin",
                        "Tequila",
                        "Cognac",
                        "Brandy",
                        "Vermouth",
                        "Sake"];
    var mil = [
                "375 ml",
                "750 ml",
                "1.5 L",
                "3 L",
                "4.5 L"];
    
    //Calling buildFamily to construct drop down menu
    buildFamily();
    
    //Set Store Spirit, Display Spirits, Clear Spirits and Slider Click Events
    var save = $('submit');
    save.addEventListener("click", validate);
    
    var display = $('display');
    display.addEventListener("click", getData);
    
    var clear = $('clear');
    clear.addEventListener("click", clearData);
    
    var slide = $('bottleMIL')
    slide.addEventListener("change", slider);
    
});