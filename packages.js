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
