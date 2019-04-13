class Paddle {
  constructor(w, h, x, y, vx, vy, color, up, down) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.upKey = up;
    this.downKey = down;
  }

  someMethod() {}
}

// var paddleA = new Paddle(10, 100, 0, 50, 0, 10);
// console.log(paddleA.draw());

// var start = performance.now();

var viewWidth = window.innerWidth;
var viewHeight = window.innerHeight;

// Grow canvas to page size
var canvasEl = document.getElementById("canvas");
canvasEl.width = viewWidth;
canvasEl.height = viewHeight;

// Set up text for countdown
var scoreEl = document.getElementById("score");
scoreEl.style.width = viewWidth.toString() + "px";
// scoreEl.style.left = (viewWidth >> 1).toString() + "px";
scoreEl.style.top = (viewHeight >> 2).toString() + "px";

// Set up text when score
var countdownEl = document.getElementById("countdown");
countdownEl.style.left = (viewWidth >> 1).toString() + "px";
countdownEl.style.top = (viewHeight >> 1).toString() + "px";

var ctx = canvasEl.getContext("2d");

var leftPaddle,
  rightPaddle = null; // global paddle objects
var ball; // global ball object
var keys = {}; // global object storing information about how many of which keys were pressed
var score = { l: 0, r: 0 };

window.addEventListener("keydown", keyPressed);

function step() {
  // // move ball at 1 px / ms
  moveBall();
  movePaddle(leftPaddle);
  movePaddle(rightPaddle);
  initKeys();
  if (hasCollided()) {
    // redraw the paddles just in case
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
  }
  if (hasExited()) {
    if (ball.x + ball.r >= rightPaddle.x) {
      score.l += 1;
    } else {
      score.r += 1;
    }
    init();
    return;
  }
  requestAnimationFrame(step);
}

function movePaddle(paddle) {
  var net = keys[paddle.downKey] - keys[paddle.upKey];
  var multiplier = Math.ceil(0.01 * viewHeight);
  var amount = net * multiplier;
  ctx.clearRect(paddle.x, paddle.y, paddle.w, paddle.h);
  if (amount < 0) {
    if (paddle.y + amount > 1) {
      paddle.y += amount;
    }
  } else if (amount > 0) {
    if (paddle.y + paddle.h + amount < viewHeight) {
      paddle.y += amount;
    }
  }
  drawPaddle(paddle);
}

function moveBall() {
  // remove old ball
  clearBall();
  // update ball position
  ball.x += ball.vx;
  ball.y += ball.vy;
  drawBall();
}

function clearBall() {
  ctx.clearRect(ball.x - ball.r, ball.y - ball.r, 2 * ball.r, 2 * ball.r);
}

function drawPaddle(paddle) {
  ctx.fillStyle = paddle.color;
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
}

function drawBall() {
  ctx.fillStyle = "#000000";
  // draw the ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

function initBall() {
  ball = {
    x: viewWidth >> 1,
    y: viewHeight >> 1,
    r: Math.floor(viewWidth / 80),
    vx: getRandomInt(-viewWidth / 75, viewWidth / 75),
    vy: getRandomInt(-viewHeight / 75, viewHeight / 75)
  };
}
function initPaddles() {
  // paddle dimensions set up as fraction of screen size
  var paddleMargin = Math.ceil(viewWidth / 100); // distance from edge
  var paddleHeight = Math.floor(viewHeight / 5);
  var paddleWidth = Math.floor(viewWidth / 80);
  leftPaddle = new Paddle(
    paddleWidth,
    paddleHeight,
    paddleMargin,
    (viewHeight - paddleHeight) >> 1,
    0,
    0,
    "#0000FF",
    "w",
    "s"
  );
  rightPaddle = new Paddle(
    paddleWidth,
    paddleHeight,
    viewWidth - paddleMargin - paddleWidth,
    (viewHeight - paddleHeight) >> 1,
    0,
    0,
    "#FF0000",
    "ArrowUp",
    "ArrowDown"
  );
}

function initKeys() {
  keys[leftPaddle.upKey] = 0;
  keys[leftPaddle.downKey] = 0;
  keys[rightPaddle.upKey] = 0;
  keys[rightPaddle.downKey] = 0;
}

function init() {
  // check if we're on a new round
  initPaddles();
  initBall();
  initKeys();
  loadingScreen();
}

init();

function countdown(t) {
  return function() {
    countdownEl.innerText = t.toString();
  };
}

function showScore() {
  scoreEl.innerText = `L: ${score.l} \u00A0\u00A0\u00A0\u00A0 R: ${score.r}`;
}

function loadingScreen() {
  ctx.clearRect(0, 0, viewWidth, viewHeight);
  drawPaddle(leftPaddle);
  drawPaddle(rightPaddle);
  ctx.font = "100px Arial";
  showScore();
  countdown(3)();
  setTimeout(countdown(2), 1000);
  setTimeout(countdown(1), 2000);
  setTimeout(() => {
    scoreEl.innerText = "";
    countdownEl.innerText = "";
    step();
  }, 3000);
}

function keyPressed(evt) {
  switch (evt.key) {
    case leftPaddle.upKey:
    case leftPaddle.downKey:
    case rightPaddle.upKey:
    case rightPaddle.downKey:
      keys[evt.key] += 1;
      break;
  }
}

function hasExited() {
  // check for: 1) exits on the left, 2) exits on the right
  if (
    ball.x - ball.r <= leftPaddle.x + leftPaddle.w &&
    (ball.y <= leftPaddle.y || ball.y >= leftPaddle.y + leftPaddle.h)
  ) {
    return true;
  } else if (
    ball.x + ball.r >= rightPaddle.x &&
    (ball.y <= rightPaddle.y || ball.y >= rightPaddle.y + rightPaddle.h)
  ) {
    return true;
  }
  return false;
}

function hasCollided() {
  // check for: 1) collisions with top, 2) collisions with right paddle, 3) collisions with bottom, 4) collisions with left paddle
  if (ball.y - ball.r + ball.vy <= 0) {
    clearBall();
    ball.y = ball.r;
    ball.vy *= -1;
    drawBall();
    return true;
  } else if (ball.y + ball.r >= viewHeight) {
    clearBall();
    ball.y = viewHeight - ball.r;
    ball.vy *= -1;
    drawBall();
    return true;
  } else if (
    ball.x + ball.vx - ball.r <= leftPaddle.x + leftPaddle.w &&
    (ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + leftPaddle.h)
  ) {
    // keep it from going past the paddle;
    clearBall();
    ball.x = leftPaddle.x + leftPaddle.w + ball.r;
    ball.vx *= -1;
    drawBall();
    return true;
  } else if (
    ball.x + ball.r + ball.vx >= rightPaddle.x &&
    (ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + rightPaddle.h)
  ) {
    clearBall();
    ball.x = rightPaddle.x - ball.r;
    ball.vx *= -1;
    drawBall();
    return true;
  }
  return false;
}
// from: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
