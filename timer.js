const states = {
    UNDEFINED: -1,
    READY_FOR_LIVE: 1,
    DISPLAYING_LIVE: 2,
    READY_FOR_FINISH: 3,
    DISPLAYING_FINISH: 4,
    DONE: 5
};

class Timer {
    constructor(starter) {
        this.starter = starter;
        if (this.starter.startnumber != null && this.starter.startTime != null) {
            this.state = states.READY_FOR_LIVE;
        } else {
            this.state = states.UNDEFINED;
        }
    }

    assignDisplaySpace(displaySpace) {
        this.displaySpace = displaySpace;
        this.displaySpace.timer = this;
        if (this.starter.finishTime != null) {
            this.displayFinishTime();
        } else {
            this.displayLiveTime();
        }
    }

    detachDisplaySpace() {
        if (this.displaySpace != null) {
            if (this.state = states.DISPLAYING_LIVE) {
                clearInterval(this.interval);
            }
            // bei DISPLAYING_FINISH einfach nichts machen
            this.displaySpace.timer = null;
            this.displaySpace = null; // --> ablaufendes timeout läuft ins nichts
        }
    }
    
    handleFinishTime(time) {
        this.starter.finishTime = time;
        if (this.state == states.DISPLAYING_LIVE) {
            clearInterval(this.interval);
            this.displayFinishTime();
            this.state = states.DISPLAYING_FINISH;
        } else {
            this.state = states.READY_FOR_FINISH;
        }
    }


    // ------- UTILS -------

    displayFinishTime() {
        if (this.starter.startTime != null && this.starter.finishTime != null && this.displaySpace != null) {
            this.state = states.DISPLAYING_FINISH;
            this.displaySpace.startnumberElement.innerHTML = this.getFormattedStartnumber(this.starter.startnumber);
            this.displaySpace.timeElement.innerHTML = this.getFormattedTotalTime(this.starter.startTime, this.starter.finishTime);
            setTimeout(() => {
                this.reset()
            }, 5000);
        }
    }

    displayLiveTime() {
        if (this.displaySpace != null && this.starter.startnumber != null && this.starter.startTime != null) {
            this.state = states.DISPLAYING_LIVE;
            this.displaySpace.startnumberElement.innerHTML = this.getFormattedStartnumber(this.starter.startnumber);
            this.interval = setInterval(() => {
                this.updateLiveTime()
            }, 100);
        }
    }

    updateLiveTime() {
        if (this.displaySpace != null && this.starter.startTime != null) {
            this.displaySpace.timeElement.innerHTML = this.getFormattedLiveTime(this.starter.startTime);
        }
    }

    reset() {
        if (this.displaySpace != null) {
            this.detachDisplaySpace();
        }
        this.state = states.DONE;
        // else nothing (displaySpace probably detached)
        updateAssignments();
    }

    getFormattedLiveTime(startTime) {
        var time = this.getCurrentTime() - startTime;
        time = Math.round(time / 10) / 10;
        var s = time.toFixed(1);
        return this.padLeft(s, "0", 5) + " ";
    }

    getFormattedTotalTime(startTime, finishTime) {
        var time = finishTime - startTime;
        var s = (time / 100).toFixed(2);
        return this.padLeft(s, "0", 6);
    }

    getFormattedStartnumber(startnumber) {
        var s = startnumber + "";
        while (s.length < 3) s = " " + s;
        return s;
    }

    getCurrentTime() {
        return Math.round(new Date().getTime() / 10);
    }

    padLeft(s, c, n) {
        while (s.length < n) s = c + s;
        return s;
    }
}
