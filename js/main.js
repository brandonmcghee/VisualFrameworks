//Brandon McGhee
//Assignment 2
//VFW

window.addEventListener("DOMContentLoaded", function () {
    
    function $(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    //Find value of selected radio button
    function getSelectedRadio() {
        var radios = document.forms[0].shelve;
        
        for (var i=0; i < radios.length; i++) {
            if (radios[i].checked) {
                shelveValue = radios[i].value;
            }
        }
    }
    
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
    
    function storeData() {
        var id              = Math.floor(Math.random()*100000001);
        //Gather all form field values and store in an object.
        //Object properties contain array with the form label and input value.
        
        getSelectedRadio();
        
        var item            = {};
            item.spiritName = ["Spirit Name: ", $('spiritName').value];
            item.bottleMIL  = ["Bottle Size: ", $('bottleMIL').value + " ML"];
            item.shelve     = ["Shelve Quality: ", shelveValue];
            item.date       = ["Date Purchased: ", $('datePurchase').value];
            
        //Save into local storage: Use stringify to convert object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Spirit Stored!");
        toggleControls("on");
    }
    
    function getData() {
        if (localStorage.length == 0) {
            alert("You have not stored any spirits!");
            return;
        }
        
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
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //Convert the string from local storage value back to and object
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            for (var n in obj) {
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj [n] [0] + " " + obj [n] [1];
                makeSubli.innerHTML = optSubText;
            }
        }
    }
    
    function clearData() {
        window.localStorage.clear();
        toggleControls("off");
    }
    
    //Var defaults
    var shelveValue;
    
    //Set Link & Submit Click Events
    var save = $('submit');
    save.addEventListener("click", storeData);
    
    var display = $('display');
    display.addEventListener("click", getData);
    
    var clear = $('clear');
    clear.addEventListener("click", clearData);
    
});