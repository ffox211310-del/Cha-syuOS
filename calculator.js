function openCalculator(){

  var calcHTML = `
  <div style="text-align:center;">
    <input id="calcDisplay" type="text" 
      style="width:90%;height:40px;font-size:20px;margin-bottom:10px;text-align:right;" readonly>
    <br>
    <div>
      <button onclick="press('7')">7</button>
      <button onclick="press('8')">8</button>
      <button onclick="press('9')">9</button>
      <button onclick="press('/')">÷</button>
    </div>
    <div>
      <button onclick="press('4')">4</button>
      <button onclick="press('5')">5</button>
      <button onclick="press('6')">6</button>
      <button onclick="press('*')">×</button>
    </div>
    <div>
      <button onclick="press('1')">1</button>
      <button onclick="press('2')">2</button>
      <button onclick="press('3')">3</button>
      <button onclick="press('-')">−</button>
    </div>
    <div>
      <button onclick="press('0')">0</button>
      <button onclick="press('.')">.</button>
      <button onclick="calculate()">=</button>
      <button onclick="press('+')">+</button>
    </div>
    <br>
    <button onclick="clearCalc()">C</button>
  </div>
  `;

  createWindow("Calculator", calcHTML);
}

function press(value){
  document.getElementById("calcDisplay").value += value;
}

function calculate(){
  try{
    document.getElementById("calcDisplay").value =
      eval(document.getElementById("calcDisplay").value);
  }catch{
    alert("Error");
  }
}

function clearCalc(){
  document.getElementById("calcDisplay").value = "";
}
