class StopwatchUI {
  constructor(initialTime) {
    this.container = document.createElement("div");
    this.container.classList.add("stopwatch-container");
    
    this.stopwatchElement = document.createElement("div");
    this.stopwatchElement.classList.add("stopwatch");
    this.setTime(initialTime);

    this.startBtn = this.createButton("Start", this.onStartClick.bind(this));
    this.pauseBtn = this.createButton("Pause", this.onPauseClick.bind(this));
    this.resetBtn = this.createButton("Reset", this.onResetClick.bind(this));

    this.isRunning = false;

    this.container.appendChild(this.stopwatchElement);
    this.container.appendChild(this.startBtn);
    this.container.appendChild(this.pauseBtn);
    this.container.appendChild(this.resetBtn);
  }

  createButton(label, clickHandler) {
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", clickHandler);
    return button;
  }

  appendStopWatch(container) {
    container.appendChild(this.container);
  }

  setTime(time) {
    this.stopwatchElement.textContent = `${String(time.hours).padStart(
      2,
      "0"
    )}:${String(time.minutes).padStart(2, "0")}:${String(time.seconds).padStart(
      2,
      "0"
    )}`;
  }


  onStartClick() {
    if (!this.isRunning) {
      if (this.onStart) {
        this.onStart();
      }
      this.isRunning = true;
    }
  }

 
  onPauseClick() {
    if (this.isRunning) { 
      if (this.onPause) {
        this.onPause();
      }
      this.isRunning = false;
    }
  }

  
  onResetClick() {
    if (this.isRunning) { 
      this.isRunning = false; 
    }
    
    this.setTime({ hours: 0, minutes: 0, seconds: 0 });

    if (this.onReset) {
      this.onReset();
    }
  }
  

  addStartBtnListener(callback) {
    this.onStart = callback;
  }

  addPauseBtnListener(callback) {
    this.onPause = callback;
  }

  addResetBtnListener(callback) {
    this.onReset = callback;
  }
}

export default StopwatchUI;
