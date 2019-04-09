var elements;
var times = [];

getHTMLElements();

function handleStartTime(starter) {
    times.push(starter);
}

function handleFinishtTime(startnumber, time) {
    
}


//------------------ UTILS ------------------

function getTimeObjByStartnumber() {
    
}

function getHTMLElements() {
    elements = {
        startnumber1: document.getElementById("startnumber1"),
        time1: document.getElementById("time1"),
        startnumber2: document.getElementById("startnumber2"),
        time2: document.getElementById("time2")
    };
}

/* 
Format: <startnummer>/<zeit>
<zeit>: Zeit in 10ms seit UNIX-Epoch (hat dann 12 Stellen)
*/