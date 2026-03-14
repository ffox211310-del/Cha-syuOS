let packages = {

python3:{
name:"python3",
description:"Python interpreter",
install:function(){

installedPackages["python3"]=true;

alert("Python3 installed!");

}
},

calculator:{
install(){

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

}
},

nano:{
name:"nano",
description:"Text editor",
install:function(){

installedPackages["nano"]=true;

alert("Nano installed!");

}
}

};
