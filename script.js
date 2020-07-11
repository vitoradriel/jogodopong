let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// bolinha
let x;
let y;
let dx;
let dy;
let ballRadius = 10; // raio da bola

// barra 1 
let paddleHeight = 75;
let paddleWidth = 10;
let paddleX; 
let paddleY;
let upPressed = false;
let downPressed = false;

//barra 2
let paddleHeight2 = 75;
let paddleWidth2 = 10;
let paddleX2; 
let paddleY2;
let wPressed = false;
let sPressed = false;


// pontuação e vidas
let score = 0;
let score2 = 0;
let limite = 5;

function aumentarLimite(){
  limite = limite + 1;
}
function diminuirLimite(){
  limite = limite - 1;
}

function setupBallAndPaddle() {
  x = canvas.width / 2; // inicial horizontal
  y = canvas.height - 35; // inicial vertical
  dx = 4; // variação horizontal
  dy = -4; // variação vertical;
  paddleY = (canvas.height - paddleHeight)/2;
  paddleY2 = (canvas.height - paddleHeight)/2;
  paddleX = 780; 
  paddleX2 =10; 
}

setupBallAndPaddle();

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Jogador 1: " + score, 8, 20);
}
function drawScore2() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Jogador 2: " + score2, 690, 20);
}
function drawLimite() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Pontuação máxima: " + limite, 290, 20);
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle2() {
  ctx.beginPath();
  ctx.rect(paddleX2, paddleY2, paddleWidth2, paddleHeight2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawPaddle2();
  drawScore();
  drawScore2();
  drawLimite();
  // verifica se a bola sai na vertical
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy; // inverte o sinal de dx
  }
  // verifica se a bola sai na horizontal
  if (
    y > paddleY && y < paddleY + paddleHeight && // entre a barra (eixo x)
    x + ballRadius >= paddleX || x > paddleX2 &&
   x < paddleX2 + paddleWidth &&
   y - ballRadius <= paddleY2 + paddleHeight) {
    dx = -dx;
  }
  else if (x + dx > canvas.width - ballRadius) {
    score++;
    setupBallAndPaddle();
  }else if (x + dx < ballRadius){
    score2++;
    setupBallAndPaddle();
  }

  if(score == limite){
    alert("Player 1 Ganhou!");
    document.location.reload();
  }else if(score2 == limite){
    alert("Player 2 Ganhou!");
    document.location.reload();
  }

  if(sPressed){
    paddleY2+=7;
    if(paddleY2 + paddleHeight2>canvas.height){
        paddleY2=canvas.height-paddleHeight2;
    }
}else if(wPressed){
    paddleY2-=7;
    if(paddleY2<0){
        paddleY2=0;
    }
}
  if(downPressed){
  paddleY+=7;
  if(paddleY + paddleHeight>canvas.height){
      paddleY=canvas.height-paddleHeight;
  }
}else if(upPressed){
  paddleY-=7;
  if(paddleY<0){
      paddleY=0;
  }
}




  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

draw();

function keyDownHandler(e) {
  if (e.key == "W" || e.key == "w") {
    wPressed = true;
  }
  if (e.key == "S" || e.key == "s") {
    sPressed = true;
  }
  if (e.key == "ArrowUp" || e.key == "Up") {
    upPressed = true;
  }
  if (e.key == "ArrowDown" || e.key == "Down") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "W" || e.key == "w") {
    wPressed = false;
  }
  if (e.key == "S" || e.key == "s") {
    sPressed = false;
  }
  if (e.key == "ArrowUp" || e.key == "Up") {
    upPressed = false;
  }
  if (e.key == "ArrowDown" || e.key == "Down") {
    downPressed = false;
  }
}



// adiciona eventos de controle para o teclado
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

