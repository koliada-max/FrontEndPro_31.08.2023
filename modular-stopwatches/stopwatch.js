class Stopwatch {
  constructor(onTick) {
    this.onTick = onTick;
    this.timer = null;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  start() {
    this.timer = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes === 60) {
          this.minutes = 0;
          this.hours++;
        }
      }
      this.onTick(this.getTime());
    }, 1000);
  }

  pause() {
    clearInterval(this.timer);
  }

  reset() {
    this.pause();
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  getTime() {
    return {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    };
  }
}

export default Stopwatch;
