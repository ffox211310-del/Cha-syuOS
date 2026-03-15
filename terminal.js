let commands = {};

let pythonMode = false;

let currentPath = ["home"]; // 今いる場所


function getCurrentDir(){
  let dir = filesystem;
  for(let p of currentPath){
    dir = dir[p];
  }
  return dir;
}

function getPrompt(){
  let path = currentPath.join("/");
  if(path === "home") path="~";
  else path="~/" + currentPath.slice(1).join("/");
  return "user@cha-syuOS:" + path + "$ ";
}

function openTerminal(){

createWindow("Terminal 💻",`

<div id="terminalOutput" style="
background:black;
color:#00ff00;
height:200px;
overflow:auto;
font-family:monospace;
padding:5px;
">
Cha-syuOS Terminal<br>
Type 'help'
</div>

<input id="terminalInput"
style="
width:100%;
background:black;
color:#00ff00;
border:none;
font-family:monospace;
">

`);

setTimeout(()=>{
let input=document.getElementById("terminalInput");
input.placeholder=getPrompt();
input.focus();
},100);

}

document.addEventListener("keydown",function(e){

if(e.key === "Enter"){

let input=document.getElementById("terminalInput");
if(!input) return;

let command=input.value;
runCommand(command);

input.value="";
input.placeholder=getPrompt();

}

});

function runCommand(cmd){

let out=document.getElementById("terminalOutput");
  
if(pythonMode){

if(cmd==="exit"){
pythonMode=false;
out.innerHTML+="<br>Exit Python";
return;
}

try{

let result = pyodide.runPython(cmd);

if(result !== undefined){
out.innerHTML+="<br>"+result;
}

}catch(err){

out.innerHTML+="<br>"+err;

}

out.innerHTML+="<br>>> ";
return;

}
  

out.innerHTML += "<br>" + getPrompt() + cmd;

let parts=cmd.split(" ");
let command=parts[0];
let arg=parts[1];

if(command==="help"){

out.innerHTML += `
<br>Commands:
<br>ls
<br>mkdir
<br>cd
<br>touch
<br>clear
`;

}

else if(command==="clear"){
out.innerHTML="";
}

else if(command==="ls"){

let dir=getCurrentDir();

for(let item in dir){

if(typeof dir[item] === "object"){
out.innerHTML += "<br>" + item + "/";
}
else{
out.innerHTML += "<br>" + item;
}

}

}

else if(command==="mkdir"){

let dir=getCurrentDir();
dir[arg]={};
saveFS();

}

  else if(command==="run"){

let dir = getCurrentDir();

if(!dir[arg]){
out.innerHTML+="<br>file not found";
return;
}

let code = dir[arg];

try{

eval(code);

out.innerHTML+="<br>Program executed.";

}catch(err){

out.innerHTML+="<br>Error: "+err;

}

}

    
else if(command==="touch"){

let dir=getCurrentDir();
dir[arg]="";
saveFS();

}

else if(command==="cd"){

if(arg===".."){
if(currentPath.length>1) currentPath.pop();
}

else{

let dir=getCurrentDir();

if(dir[arg] && typeof dir[arg]==="object"){
currentPath.push(arg);
}else{
out.innerHTML+="<br>folder not found";
}

}

}

else if(command==="apt"){

if(parts[1]==="install"){

let pkg=parts[2];

if(packages[pkg]){

out.innerHTML+="<br>Installing "+pkg+"...";
packages[pkg].install();
out.innerHTML+="<br>Done.";

}else{

out.innerHTML+="<br>Package not found";

}

}else{

out.innerHTML+="<br>Usage: apt install [package]";

}

}

else if(command==="beep"){
out.innerHTML+="<br>BEEP!";
}
  
else if(command==="hack"){

out.innerHTML+="<br>ACCESSING MAINFRAME...";
setTimeout(()=>{out.innerHTML+="<br>010101010101";},500);
setTimeout(()=>{out.innerHTML+="<br>101010101010";},1000);
setTimeout(()=>{out.innerHTML+="<br>ACCESS GRANTED";},1500);

}
  
else if(command==="ramen"){

out.innerHTML+="<br>🍜🍜🍜🍜🍜";

}
  
else if(command==="chafetch"){

out.innerHTML+=`
<br>   🍜 Cha-syuOS
<br>OS: Cha-syuOS
<br>Kernel: 端末による
<br>Shell: cha-term,bash
<br>Filesystem: virtual
`;

}
  
else if(command==="fortune"){

let fortunes=[
"今日の運勢：大吉",
"替え玉すると運気UP",
"チャーシューを信じろ",
"今日はコードがバグる日",
"OS開発者に休みはない"
];

let f=fortunes[Math.floor(Math.random()*fortunes.length)];

out.innerHTML+="<br>"+f;

}
  
else if(command==="cha-syu"){

if(parts[1]==="say"){

let message = parts.slice(2).join(" ");

if(!message){
out.innerHTML += "<br>Usage: cha-syu say [message]";
return;
}

let line = "-".repeat(message.length+2);

out.innerHTML += `
<br> ${message}
<br> ${line}
<br>   ()_()
<br>   ( ◠∞◠)
<br>  / >🍜  Cha-syu
`;

}

}
  
  else if(command==="python3"){

out.innerHTML+="<br>Loading Python...";

startPython().then(()=>{

pythonMode = true;
out.innerHTML+="<br>Python ready!";
out.innerHTML+="<br>>> ";

});

}

    else if(command==="py"){

let dir = getCurrentDir();

if(!dir[arg]){
out.innerHTML += "<br>file not found";
return;
}

let code = dir[arg];

startPython().then(()=>{

try{

let result = pyodide.runPython(`
import sys
from io import StringIO

buffer = StringIO()
sys.stdout = buffer

` + code + `

sys.stdout.getvalue()
`);

out.innerHTML += "<br>" + result;

}catch(err){

out.innerHTML += "<br>Error: " + err;

}

});

}
  
  else if(commands[command]){
  commands[command](arg);
}
  
out.scrollTop=out.scrollHeight;

}



commands["pwd"] = function(){

let out=document.getElementById("terminalOutput");

let path=currentPath.join("/");

if(path==="home") path="/home";

out.innerHTML+="<br>"+path;

}

commands["echo"] = function(arg){

let out=document.getElementById("terminalOutput");

out.innerHTML+="<br>"+arg;

}

commands["cat"] = function(arg){

let out=document.getElementById("terminalOutput");

let dir=getCurrentDir();

if(dir[arg]!==undefined){

out.innerHTML+="<br>"+dir[arg];

}else{

out.innerHTML+="<br>file not found";

}

}

commands["rm"] = function(arg){

let out=document.getElementById("terminalOutput");

let dir=getCurrentDir();

if(dir[arg]!==undefined){

delete dir[arg];
saveFS();

}else{

out.innerHTML+="<br>file not found";

}

}

commands["run"] = function(file){

let dir = getCurrentDir();

if(dir[file]){
eval(dir[file]);
return;
}

if(filesystem.apps && filesystem.apps[file]){
eval(filesystem.apps[file]);
return;
}

alert("file not found");

};

commands["nano"] = function(arg){

let dir=getCurrentDir();

let content=prompt("Edit file:", dir[arg] || "");

if(content!==null){

dir[arg]=content;
saveFS();

}

}


commands["tree"] = function(){

let out=document.getElementById("terminalOutput");

let dir = getCurrentDir();

function showTree(folder, indent){

for(let item in folder){

out.innerHTML += "<br>" + indent + "├ " + item;

if(typeof folder[item] === "object"){

showTree(folder[item], indent + "│ ");

}

}

}

showTree(dir,"");

}
