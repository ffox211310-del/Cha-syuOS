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
"
placeholder="$ command">

`);

setTimeout(()=>{
document.getElementById("terminalInput").focus();
},100);

}

document.addEventListener("keydown",function(e){

if(e.key === "Enter"){

let input = document.getElementById("terminalInput");
if(!input) return;

let command = input.value;
runCommand(command);

input.value="";

}

});

function runCommand(cmd){

let out = document.getElementById("terminalOutput");

out.innerHTML += "<br>$ " + cmd;

if(cmd === "help"){

out.innerHTML += `
<br>Commands:
<br>help
<br>about
<br>clear
<br>ls
`;

}

else if(cmd === "about"){

out.innerHTML += "<br>Cha-syuOS Terminal v0.1";

}

else if(cmd === "clear"){

out.innerHTML="";

}

else if(cmd === "ls"){

for(let item in filesystem){
out.innerHTML += "<br>" + item;
}

}

else{

out.innerHTML += "<br>command not found";

}

out.scrollTop = out.scrollHeight;

}
