let ds1 = new DisplaySpace(document.getElementById("startnumber2"), document.getElementById("time2"));
let ds2 = new DisplaySpace(document.getElementById("startnumber1"), document.getElementById("time1"));

liveTimers = [];
finishedTimers = [];

function start(startnumber, startTime = getCurrentTime()) {
    var starter = {
        startnumber: startnumber,
        startTime: startTime
    };
    liveTimers.push(new Timer(starter));
    updateAssignments();
}

function stop(startnumber, finishTime = getCurrentTime()) {
    var timer = getTimerByStartnumber(startnumber);
    if (timer) {
        timer.handleFinishTime(finishTime);
        liveTimers = liveTimers.filter((value, index, arr) => value !== timer);
        finishedTimers.push(timer);
        if (timer.state == states.READY_FOR_FINISH) {
            updateAssignments();
        }
    }
}

function updateAssignments() {
    finishedTimers = finishedTimers.filter((value, index, arr) => value.state !== states.DONE);
    var timers = finishedTimers.concat(liveTimers);
    if (timers.length > 0) {
        if (timers[0].displaySpace !== ds1) {
            timers[0].detachDisplaySpace();
            if (ds1.timer != null) ds1.timer.detachDisplaySpace();
            timers[0].assignDisplaySpace(ds1);
        }
    } else {
        ds1.reset();
    }
    if (timers.length > 1) {
        if (timers[1].displaySpace !== ds2) {
            timers[1].detachDisplaySpace();
            if (ds2.timer != null) ds2.timer.detachDisplaySpace();
            timers[1].assignDisplaySpace(ds2);
        }
    } else {
        ds2.reset();
    }
}

function getTimerByStartnumber(startnumber) {
    var timers = liveTimers.concat(finishedTimers);
    for (timer of timers) {
        if (timer.starter.startnumber === startnumber) {
            return timer;
        }
    }
    return false;
}

function getCurrentTime() {
    return Math.round(new Date().getTime() / 10);
}
