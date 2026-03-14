let installedPackages = {};

let packages = {

python3:{
name:"python3",
description:"Python interpreter",

install:function(){

installedPackages["python3"]=true;

alert("Python3 installed!");

}

},

  paint:{
name:"paint",
description:"Simple paint",

install:function(){

if(!filesystem.apps){
filesystem.apps = {};
}

filesystem.home["paint.js"] = `
createWindow("Paint", \`

<canvas id="paintCanvas" width="400" height="300"
style="border:1px solid white;background:white;"></canvas>
<br>
<button onclick="clearPaint()">Clear</button>
\`);

setTimeout(()=>{

let canvas=document.getElementById("paintCanvas");
let ctx=canvas.getContext("2d");

let drawing=false;

canvas.onmousedown=()=>drawing=true;
canvas.onmouseup=()=>drawing=false;

canvas.addEventListener("mousedown",(e)=>{
e.stopPropagation();
drawing=true;
});

canvas.addEventListener("mousemove",(e)=>{
e.stopPropagation();
if(!drawing) return;

let rect=canvas.getBoundingClientRect();
let x=e.clientX-rect.left;
let y=e.clientY-rect.top;

ctx.fillRect(x,y,3,3);
});

canvas.addEventListener("mouseup",(e)=>{
e.stopPropagation();
drawing=false;
});

canvas.onmousemove=(e)=>{
if(!drawing) return;

let rect=canvas.getBoundingClientRect();
let x=e.clientX-rect.left;
let y=e.clientY-rect.top;

ctx.fillRect(x,y,2,2);
};

window.clearPaint=function(){
ctx.clearRect(0,0,canvas.width,canvas.height);
};

},50);

`;

alert("Paint installed!");

}
},
    
nano:{
name:"nano",
description:"Text editor",

install:function(){

installedPackages["nano"]=true;

alert("Nano installed!");

}

},

calculator:{
name:"calculator",
description:"Simple GUI calculator",

install:function(){

if(!filesystem.apps) filesystem.apps={};

filesystem.apps["calculator.js"] = `
createWindow("Calculator", \`
<h2>Calculator</h2>
<input id="a">
+
<input id="b">
<button onclick="
let a=Number(document.getElementById('a').value);
let b=Number(document.getElementById('b').value);
alert(a+b);
">=</button>
\`);
`;

alert("Calculator installed!");

}

},

calc:{
name:"calc",
description:"Python calculator",

install: async function(){

commands["calc"] = async function(){

let expr = prompt("calc>");

if(!expr) return;

await startPython();

let result = pyodide.runPython(expr);

alert(result);

};

alert("Calc installed!");

}

}

};
