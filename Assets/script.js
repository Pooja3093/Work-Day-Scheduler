var today = moment();
$("#currentDay").text(today.format("dddd, MMM Do, YYYY"));

var currentHour = today.format("HH");

var saveBtn = $('.saveBtn');

function handleSave(event){
    // Find the save button clicked and get corresponding input data
    var x = event.currentTarget.id;
    var task = document.getElementById('text_' + x).value;
    // Store slot no. and its data in local storage
    localStorage.setItem(x,task);
    return;
}

// Init function runs on every refresh
function init(){
    colorCode();
    var values = [];
    // get all data from local storage
    var keys = Object.keys(localStorage);
    var i = keys.length;
    while ( i-- ) {
        values.push( localStorage.getItem(keys[(keys.length - 1) - i]) );
    }
    // Display data received from local storage in appropriate textbox
    if(values === null){
        return;
    } else{
    for(var j = 0; j < keys.length; j++){
        document.getElementById("text_" + keys[j]).value = values[j];
    }
}
    return ;  
}


// Color code task boxes
function colorCode(){
    // Add class past for boxes before current hour
    for(var k = 9; k < parseInt(currentHour); k++){
        var m = k.toString();
        document.getElementById("text_" + m).classList.add('past');
    }
    
    // Add class present for current hour
    document.getElementById("text_" + currentHour).classList.add('present');

    // Add class future for upcoming hours
    for(var l = parseInt(currentHour) + 1; l <=17; l++){
        var n = l.toString();
        document.getElementById("text_" + n).classList.add('future');
    }

}

init();

// Event listner for all save buttons
saveBtn.on('click',handleSave);