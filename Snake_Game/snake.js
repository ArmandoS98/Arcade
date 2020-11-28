let canvas;
let ctx;

let head;
let objetive;
let ball;

let dots;
let objetive_x;
let objetive_y;

let leftDirection = false;
let rightDirection = true;
let upDirection = false;
let downDirection = false;
let inGame = true;
let score = 10;

const DOT_SIZE = 10;
const ALL_DOTS = 2704;
const MAX_RAND = 50;
const DELAY = 140;
const C_HEIGHT = 520;
const C_WIDTH = 520;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

let x = new Array(ALL_DOTS);
let y = new Array(ALL_DOTS);

function init() {
  score = 0;
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  ctx.font = "12px Helvetica";

  loadImages();
  createSnake();
  objectiveAcquired();
  setTimeout("gameCycle()", DELAY);
}

function loadImages() {
  head = new Image();
  head.src = "head.png";

  ball = new Image();
  ball.src = "dot.png";

  objetive = new Image();
  objetive.src = "apple.png";
}

//Aqui inicialzas la culebra
function createSnake() {
  dots = 3;
  for (var z = 0; z < dots; z++) {
    x[z] = 50 - z * 10;
    y[z] = 50;
  }
}

function checkObjetive() {
  if (x[0] == objetive_x && y[0] == objetive_y) {
    dots++;
    objectiveAcquired();
  }
}

function doDrawing() {
  ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

  if (inGame) {
    ctx.drawImage(objetive, objetive_x, objetive_y);

    for (var z = 0; z < dots; z++) {
      if (z == 0) {
        ctx.drawImage(head, x[z], y[z]);
      } else {
        ctx.drawImage(ball, x[z], y[z]);
      }
    }

    score = (dots - 3) * 100;
    ctx.fillStyle = "#000";
    ctx.fillText("SCORE: " + score, 10, canvas.height - 10);
   
  } else {
    gameOver();
  }
}

function gameOver() {
  ctx.fillStyle = "red";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = "normal bold 18px serif";

  ctx.fillText("Game over", C_WIDTH / 2, C_HEIGHT / 2);

  location.reload();
}

function checkObjetive() {
  if (x[0] == objetive_x && y[0] == objetive_y) {
    dots++;
    objectiveAcquired();
  }
}

function move() {
  for (var z = dots; z > 0; z--) {
    x[z] = x[z - 1];
    y[z] = y[z - 1];
  }

  if (leftDirection) {
    x[0] -= DOT_SIZE;
  }

  if (rightDirection) {
    x[0] += DOT_SIZE;
  }

  if (upDirection) {
    y[0] -= DOT_SIZE;
  }

  if (downDirection) {
    y[0] += DOT_SIZE;
  }
}

function checkCollision() {
  for (var z = dots; z > 0; z--) {
    if (z > 4 && x[0] == x[z] && y[0] == y[z]) {
      inGame = false;
    }
  }

  if (y[0] >= C_HEIGHT) {
    inGame = false;
  }

  if (y[0] < 0) {
    inGame = false;
  }

  if (x[0] >= C_WIDTH) {
    inGame = false;
  }

  if (x[0] < 0) {
    inGame = false;
  }
}

function objectiveAcquired() {
  var r = Math.floor(Math.random() * MAX_RAND);
  objetive_x = r * DOT_SIZE;

  r = Math.floor(Math.random() * MAX_RAND);
  objetive_y = r * DOT_SIZE;
}

function gameCycle() {
  if (inGame) {
    checkObjetive();
    checkCollision();
    move();
    doDrawing();
    setTimeout("gameCycle()", DELAY);
  }
}

onkeydown = function (e) {
  var key = e.keyCode;

  if (key == LEFT_KEY && !rightDirection) {
    leftDirection = true;
    upDirection = false;
    downDirection = false;
  }

  if (key == RIGHT_KEY && !leftDirection) {
    rightDirection = true;
    upDirection = false;
    downDirection = false;
  }

  if (key == UP_KEY && !downDirection) {
    upDirection = true;
    rightDirection = false;
    leftDirection = false;
  }

  if (key == DOWN_KEY && !upDirection) {
    downDirection = true;
    rightDirection = false;
    leftDirection = false;
  }
};
