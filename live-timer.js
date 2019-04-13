var timer = new Timer({
        startnumber: 1,
        startTime: getTime()
    });

var timers = [];
var lastStartnumber = 0;

function start() {
    lastStartnumber++;
    var timer = new Timer({
        startnumber: lastStartnumber,
        startTime: getTime()
    });
    var newLength = timers.push(timer);
    if(newLength == 1) {
        timer.assignDisplaySpace(elements.startnumber2, elements.time2);
    } else if (newLength == 2) {
        timer.assignDisplaySpace(elements.startnumber1, elements.time1);
    }
}

function stop() {
    var firstTimer = timers[0];
    firstTimer.handleFinishTime(getTime(), callback);
}

function handleStartTime(startnumber, time) {
    var timer = new Timer({
        startnumber: startnumber,
        startTime: time
    });
    var newLength = timers.push(timer);
    if(newLength == 1) {
        timer.assignDisplaySpace(elements.startnumber2, elements.time2);
    } else if (newLength == 2) {
        timer.assignDisplaySpace(elements.startnumber1, elements.time1);
    }
}

function handleFinishtTime(startnumber, time) {
    
}

var elements = {
    startnumber1: document.getElementById("startnumber1"),
    startnumber2: document.getElementById("startnumber2"),
    time1: document.getElementById("time1"),
    time2: document.getElementById("time2")
};

function callback(timer) {
    timer.reset();
    timers.splice(timers.indexOf(timer), 1);
}

//------------------ UTILS ------------------

function getTime() {
    return Math.round(new Date().getTime() / 10);
}

/* 
Format: <startnummer>/<zeit>
<zeit>: Zeit in 10ms seit UNIX-Epoch (hat dann 12 Stellen)
*/
