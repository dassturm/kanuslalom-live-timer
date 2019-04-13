class Timer {
    constructor(startnumberElement, timeElement) {
        this.startnumberElement = startnumberElement;
        this.timeElement = timeElement;
        this.starter = null;
    }
    
    get isFree() {
        return this.starter == null;
    }
    
    handleFinishTime(time, callback) {
        this.displayFinishTime(time);
        setTimeout(this.removeStarter, 10000, callback);
    }
    
    displayFinishTime(time) {
        clearInterval(this.interval);
        this.timeElement.innerHTML = Timer.getFormattedFinishTime(this.starter.startTime, time);
    }
    
    removeStarter(callback) {
        this.starter = null;
        callback();
    }
    
    startInterval(starter) {
        this.starter = starter;
        this.interval = setInterval(this.updateHTML, 100, this);
    }
    
    updateHTML(o) {
        o.startnumberElement.innerHTML = Timer.getFormattedStartnumber(o.starter.startnumber);
        o.timeElement.innerHTML = Timer.getFormattedTime(o.starter.startTime);
    }
    
    static getFormattedStartnumber(startnumber) {
        var s = startnumber + "";
        while (s.length < 3) s = " " + s;
        return s;
    }
    
    static getFormattedTime(time) {
        var timeDiff = (Math.round(new Date().getTime() / 100 - time / 10)) / 10;
        timeDiff = timeDiff + "";
        var timeStrings = timeDiff.split(".");
        if (timeStrings.length < 2) timeStrings.push("0");
        while (timeStrings[0].length < 3) timeStrings[0] = "0" + timeStrings[0];
        while (timeStrings[1].length < 2) timeStrings[1] = timeStrings[1] + " ";
        return timeStrings[0] + "." + timeStrings[1];
    }
    
    static getFormattedFinishTime(startTime, finishTime) {
        var timeDiff = (finishTime - startTime) / 100;
        timeDiff = timeDiff + "";
        var timeStrings = timeDiff.split(".");
        if (timeStrings.length < 2) timeStrings.push("0");
        while (timeStrings[0].length < 3) timeStrings[0] = "0" + timeStrings[0];
        while (timeStrings[1].length < 2) timeStrings[1] = timeStrings[1] + "0";
        return timeStrings[0] + "." + timeStrings[1];
    }
    
    reset() {
        this.startnumberElement.innerHTML = "000";
        this.timeElement.innerHTML = "---.--";
    }
}
