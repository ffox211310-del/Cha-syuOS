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
out.innerHTML+="<br>"+item;
}

}

else if(command==="mkdir"){

let dir=getCurrentDir();
dir[arg]={};
saveFS();

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

out.scrollTop=out.scrollHeight;

}

