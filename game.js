const gameContainer = document.getElementById("gameContainer");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player, enemies, score, gameOver;

function initGame(){
  player = { x:100, y:100, size:40 };
  enemies = [];
  for(let i=0;i<30;i++){
    enemies.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size:40,
      speed:1 + Math.random()*2
    });
  }
  score = 0;
  gameOver = false;
  restartBtn.style.display = "none";
  homeBtn.style.display = "none";
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(gameOver){
    ctx.fillStyle="white";
    ctx.font="80px serif";
    ctx.fillText("どんまい 笑", canvas.width/2 - 200, canvas.height/2);
    restartBtn.style.display = "block";
    homeBtn.style.display = "block";
    return;
  }

  ctx.fillStyle="lime";
  ctx.fillRect(player.x,player.y,player.size,player.size);

  enemies.forEach(enemy=>{
    if(player.x>enemy.x) enemy.x += enemy.speed;
    if(player.x<enemy.x) enemy.x -= enemy.speed;
    if(player.y>enemy.y) enemy.y += enemy.speed;
    if(player.y<enemy.y) enemy.y -= enemy.speed;

    ctx.fillStyle="red";
    ctx.fillRect(enemy.x,enemy.y,enemy.size,enemy.size);

    if(player.x<enemy.x+enemy.size &&
       player.x+player.size>enemy.x &&
       player.y<enemy.y+enemy.size &&
       player.y+player.size>enemy.y){
      gameOver = true;
    }
  });

  ctx.fillStyle="white";
  ctx.font="40px Arial";
  ctx.fillText("Score: "+score,20,30);

  requestAnimationFrame(draw);
}

canvas.addEventListener("touchstart",e=>{
  if(!gameOver){
    player.x = e.touches[0].clientX - player.size/2;
    player.y = e.touches[0].clientY - player.size/2;
    score++;
  }
});

restartBtn.addEventListener("click", ()=>{
  initGame();
  draw();
});

homeBtn.addEventListener("click", ()=>{
  gameContainer.style.display="none";
  desktop.style.display="block";
});

function openGame(){
  desktop.style.display="none";
  gameContainer.style.display="block";
  initGame();
  draw();
}
