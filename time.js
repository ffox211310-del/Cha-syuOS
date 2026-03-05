function openTimeApp(){

  createWindow("Time ⏰", `
  
  <h3>Timer</h3>
  <input id="timerInput" type="number" value="300"> 秒
  <br><br>
  <button onclick="startTimer()">Start</button>

  <hr>

  <h3>Stopwatch</h3>
  <div id="stopwatch">0.00</div>
  <button onclick="startStopwatch()">Start</button>
  <button onclick="stopStopwatch()">Stop</button>

  `);

}
