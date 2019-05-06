class DisplaySpace {
    
    constructor(startnumberElement, timeElement) {
        this.startnumberElement = startnumberElement;
        this.timeElement = timeElement;
        this.timer = null;
    }
    
    reset() {
        this.startnumberElement.innerHTML = "000";
        this.timeElement.innerHTML = "---.--";
    }
}