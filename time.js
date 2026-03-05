function openTimeApp() {

  const win = createWindow("Time ⏰", 300, 300);

  win.innerHTML = `
  <h2>Time</h2>

  <h3>Stopwatch</h3>
  <div id="swDisplay">0</div>
  <button onclick="startSW()">Start</button>
  <button onclick="stopSW()">Stop</button>
  <button onclick="resetSW()">Reset</button>

  <hr>

  <h3>Timer</h3>
  <input id="timerInput" type="number" placeholder="秒">
  <button onclick="startTimer()">Start</button>
  <div id="timerDisplay"></div>
  `;

}

let swTime = 0;
let swInterval;

function startSW(){
  if(!swInterval){
    swInterval = setInterval(()=>{
      swTime++;
      document.getElementById("swDisplay").innerText = swTime;
    },1000);
  }
}

function stopSW(){
  clearInterval(swInterval);
  swInterval = null;
}

function resetSW(){
  swTime = 0;
  document.getElementById("swDisplay").innerText = 0;
}

function startTimer(){
  let time = document.getElementById("timerInput").value;
  let display = document.getElementById("timerDisplay");

  let interval = setInterval(()=>{
    time--;
    display.innerText = time;

    if(time <= 0){
      clearInterval(interval);
      alert("Time up!");
    }

  },1000);
}
