let time = 300;
let timer = null;

function openTime() {

  const win = document.createElement("div");
  win.className = "window";
  win.innerHTML = `
  <h3>⏰ Time</h3>
  <div id="timeDisplay">300</div>
  <button onclick="startTimer()">Start</button>
  <button onclick="stopTimer()">Stop</button>
  <button onclick="resetTimer()">Reset</button>
  `;

  document.body.appendChild(win);
}

function startTimer(){
  if(timer) return;

  timer = setInterval(()=>{
    time--;
    document.getElementById("timeDisplay").innerText = time;

    if(time <= 0){
      clearInterval(timer);
      timer = null;
      alert("Time up!");
    }

  },1000);
}

function stopTimer(){
  clearInterval(timer);
  timer = null;
}

function resetTimer(){
  time = 300;
  document.getElementById("timeDisplay").innerText = time;
}
