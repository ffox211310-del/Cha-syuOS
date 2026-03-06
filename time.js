function openTimeApp(){

  createWindow("Time ⏰", `
  
  <h3>Timer</h3>
  <input id="timerInput" type="number" value="300"> 秒
  <br><br>
  <button onclick="startTimer()">Start</button>
  <button onclick="stopTimer()">Stop</button>
  <button onclick="resetTimer()">Reset</button>

  <hr>

  <h3>Stopwatch</h3>
  <div id="stopwatch">0.00</div>
  <button onclick="startStopwatch()">Start</button>
  <button onclick="stopStopwatch()">Stop</button>

  `);

}

const alarmSound = new Audio("alarm.mp3");
alarmSound.loop = true;

let timerInterval;
let stopwatchInterval;
let startTime;

function startTimer(){

  let time = parseInt(document.getElementById("timerInput").value);

  timerInterval = setInterval(()=>{

    time--;
    document.getElementById("timerInput").value = time;

    if(time <= 0){

      clearInterval(timerInterval);

      alarmSound.currentTime = 0;
      alarmSound.play();

      alert("Time up‼︎");

      alarmSound.pause();
      alarmSound.currentTime = 0;

    }

  },1000);

}

function startStopwatch(){

  startTime = Date.now();

  stopwatchInterval = setInterval(()=>{

    let t = (Date.now() - startTime)/1000;
    document.getElementById("stopwatch").innerText = t.toFixed(2);

  },10);

}

function stopStopwatch(){
  clearInterval(stopwatchInterval);
}

function stopTimer(){
  clearInterval(timerInterval);
  alarmSound.pause();
}

function resetTimer(){
  clearInterval(timerInterval);
  alarmSound.pause();
  document.getElementById("timerInput").value = 300;
}
