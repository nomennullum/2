
export class Time {
    constructor() {
        this.currentTime = {
            hour: 0,
            day: 0,
            year: 0
        };
        this.dayLength = 24;
        this.yearLength = 365;
        this.tempo = 5000;
        this.timer = null;
        this.hasChanged = true;
    }

    advance() {
        const time = this.currentTime;
        time.hour++;
        if (time.hour >= this.dayLength) {
            time.hour = 0;
            time.day++;
        }
        if (time.day >= this.yearLength) {
            time.day = 0;
            time.year++;
        }
        this.hasChanged = true;
    }

    init() {
        this.timer = setInterval(() => 
            this.advance(), this.tempo);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}