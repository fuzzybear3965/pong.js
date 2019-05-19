// much taken from https://thoughtbot.com/blog/pong-clone-in-javascript
// Pong should run the following way:
// requestAnimationFrame should execute a callback which:
// 1. Updates the state of the ball and 2 paddles.
// 2. Redraws the screen.

// Get viewing window dimensions

(() => {
  // globals
  var canvas = null,
    context = null,
    left = null,
    right = null,
    ball = null,
    viewWidth = NaN,
    viewHeight = NaN,
    isPointScored = false,
    keysDown = {},
    score = {
      left: 0,
      right: 0
    };

  class Paddle {
    constructor(x, y, w, h, color) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.vx = 0;
      this.vy = 0;
      this.color = color;
    }

    render() {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.w, this.h);
    }
  }

  class Ball {
    constructor(x, y, r, color) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = color;
      this.vx = 3;
      this.vy = 0;
    }

    render() {
      context.beginPath();
      context.arc(this.x, this.y, this.r, 2 * Math.PI, false);
      context.fillStyle = this.color;
      context.fill();
    }
  }

  // Init canvas, paddles and ball, and set keyboard event listeners
  (() => {
    canvas = document.createElement("canvas");
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;
    canvas.width = viewWidth;
    canvas.height = viewHeight;
    context = canvas.getContext("2d");

    let paddleWidth = Math.max(10, Math.ceil(0.015 * viewWidth));
    let paddleHeight = 10 * paddleWidth;

    let ballRadius = paddleWidth;

    left = new Paddle(
      0,
      0.5 * (viewHeight - paddleHeight),
      paddleWidth,
      paddleHeight,
      "#0000FF"
    );

    right = new Paddle(
      viewWidth - paddleWidth,
      0.5 * (viewHeight - paddleHeight),
      paddleWidth,
      paddleHeight,
      "#FF0000"
    );

    ball = new Ball(0.5 * viewWidth, 0.5 * viewHeight, ballRadius, "#000000");

    document.addEventListener("keydown", evt => {
      keysDown[evt.keyCode] = true;
    });

    document.addEventListener("keyup", evt => {
      keysDown[evt.keyCode] = false;
    });
  })();

  function renderView() {
    // context.fillStyle = "#FF00FF";
    // context.fillRect(0, 0, width, height);
    left.render();
    right.render();
    ball.render();
  }

  function renderScore() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, viewWidth, viewHeight);
  }

  function update() {
    if (keysDown[38]) {
      console.log("up arrow pressed");
    }
    if (keysDown[40]) {
      console.log("down arrow pressed");
    }
  }

  function render() {
    if (isPointScored) {
      renderScore();
    }
    renderView();
  }

  function step() {
    update();
    render();
    requestAnimationFrame(step);
  }

  window.onload = function() {
    document.body.appendChild(canvas);
    requestAnimationFrame(step);
  };
})();

// var viewWidth = window.innerWidth;
// var viewHeight = window.innerHeight;

// // Grow canvas to page size
// var canvasEl = document.getElementById("canvas");
// canvasEl.width = viewWidth;
// canvasEl.height = viewHeight;

// // Set up text for countdown
// var scoreEl = document.getElementById("score");
// scoreEl.style.width = viewWidth.toString() + "px";
// // scoreEl.style.left = (viewWidth >> 1).toString() + "px";
// scoreEl.style.top = (viewHeight >> 2).toString() + "px";

// // Set up text when score
// var countdownEl = document.getElementById("countdown");
// countdownEl.style.left = (viewWidth >> 1).toString() + "px";
// countdownEl.style.top = (viewHeight >> 1).toString() + "px";

// var ctx = canvasEl.getContext("2d");

// var leftPaddle,
//   rightPaddle,
//   ball = null; // global paddle and ball objects
// var keys = {}; // global object storing information about how many of which keys were pressed
// var score = {
//   l: 0,
//   r: 0
// };

// window.addEventListener("keydown", keyPressed);

// class Paddle {
//   constructor(w, h, x, y, vx, vy, color, up, down) {
//     this.w = w;
//     this.h = h;
//     this.x = x;
//     this.y = y;
//     this.vx = vx;
//     this.vy = vy;
//     this.color = color;
//     this.upKey = up;
//     this.downKey = down;
//   }
//   someMethod() {}
// }

// class Ball {
//   constructor(x, y, r, color) {
//     this.x = x;
//     this.y = y;
//     this.r = r;
//     this.color = color;
//   }

//   move() {}

//   draw() {}
// }

// function step() {
//   // // move ball at 1 px / ms
//   ball.clear();
//   ball.draw();
//   movePaddle(leftPaddle);
//   movePaddle(rightPaddle);
//   initKeys();
//   if (hasCollided()) {
//     // redraw the paddles just in case
//     drawPaddle(leftPaddle);
//     drawPaddle(rightPaddle);
//   }
//   if (hasExited()) {
//     if (ball.x + ball.r >= rightPaddle.x) {
//       score.l += 1;
//     } else {
//       score.r += 1;
//     }
//     init();
//     return;
//   }
//   requestAnimationFrame(step);
// }

// function movePaddle(paddle) {
//   var net = keys[paddle.downKey] - keys[paddle.upKey];
//   var multiplier = Math.ceil(0.01 * viewHeight);
//   var amount = net * multiplier;
//   ctx.clearRect(paddle.x, paddle.y, paddle.w, paddle.h);
//   if (amount < 0) {
//     if (paddle.y + amount > 1) {
//       paddle.y += amount;
//     }
//   } else if (amount > 0) {
//     if (paddle.y + paddle.h + amount < viewHeight) {
//       paddle.y += amount;
//     }
//   }
//   drawPaddle(paddle);
// }

// function moveBall() {
//   // remove old ball
//   clearBall();
//   // update ball position
//   ball.x += ball.vx;
//   ball.y += ball.vy;
//   drawBall();
// }

// function clearBall() {
//   ctx.clearRect(ball.x - ball.r, ball.y - ball.r, 2 * ball.r, 2 * ball.r);
// }

// function drawPaddle(paddle) {
//   ctx.fillStyle = paddle.color;
//   ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
// }

// function drawBall() {
//   ctx.fillStyle = "#000000";
//   // draw the ball
//   ctx.beginPath();
//   ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
//   ctx.fill();
//   ctx.closePath();
// }

// function initBall() {
//   ball = {
//     x: viewWidth >> 1,
//     y: viewHeight >> 1,
//     r: Math.floor(viewWidth / 80),
//     vx: getRandomInt(-viewWidth / 75, viewWidth / 75),
//     vy: getRandomInt(-viewHeight / 75, viewHeight / 75)
//   };
// }

// function initPaddles() {
//   // paddle dimensions set up as fraction of screen size
//   var paddleMargin = Math.ceil(viewWidth / 100); // distance from edge
//   var paddleHeight = Math.floor(viewHeight / 5);
//   var paddleWidth = Math.floor(viewWidth / 80);
//   leftPaddle = new Paddle(
//     paddleWidth,
//     paddleHeight,
//     paddleMargin,
//     (viewHeight - paddleHeight) >> 1,
//     0,
//     0,
//     "#0000FF",
//     "w",
//     "s"
//   );
//   rightPaddle = new Paddle(
//     paddleWidth,
//     paddleHeight,
//     viewWidth - paddleMargin - paddleWidth,
//     (viewHeight - paddleHeight) >> 1,
//     0,
//     0,
//     "#FF0000",
//     "ArrowUp",
//     "ArrowDown"
//   );
// }

// function initKeys() {
//   keys[leftPaddle.upKey] = 0;
//   keys[leftPaddle.downKey] = 0;
//   keys[rightPaddle.upKey] = 0;
//   keys[rightPaddle.downKey] = 0;
// }

// function init() {
//   // check if we're on a new round
//   initPaddles();
//   initBall();
//   initKeys();
//   loadingScreen();
// }

// init();

// function countdown(t) {
//   return function () {
//     countdownEl.innerText = t.toString();
//   };
// }

// function showScore() {
//   scoreEl.innerText = `L: ${score.l} \u00A0\u00A0\u00A0\u00A0 R: ${score.r}`;
// }

// function loadingScreen() {
//   ctx.clearRect(0, 0, viewWidth, viewHeight);
//   drawPaddle(leftPaddle);
//   drawPaddle(rightPaddle);
//   ctx.font = "100px Arial";
//   showScore();
//   countdown(3)();
//   setTimeout(countdown(2), 1000);
//   setTimeout(countdown(1), 2000);
//   setTimeout(() => {
//     scoreEl.innerText = "";
//     countdownEl.innerText = "";
//     step();
//   }, 3000);
// }

// function keyPressed(evt) {
//   switch (evt.key) {
//     case leftPaddle.upKey:
//     case leftPaddle.downKey:
//     case rightPaddle.upKey:
//     case rightPaddle.downKey:
//       keys[evt.key] += 1;
//       break;
//   }
// }

// function hasExited() {
//   // check for: 1) exits on the left, 2) exits on the right
//   if (
//     ball.x - ball.r <= leftPaddle.x + leftPaddle.w &&
//     (ball.y <= leftPaddle.y || ball.y >= leftPaddle.y + leftPaddle.h)
//   ) {
//     return true;
//   } else if (
//     ball.x + ball.r >= rightPaddle.x &&
//     (ball.y <= rightPaddle.y || ball.y >= rightPaddle.y + rightPaddle.h)
//   ) {
//     return true;
//   }
//   return false;
// }

// function hasCollided() {
//   // check for: 1) collisions with top, 2) collisions with right paddle, 3) collisions with bottom, 4) collisions with left paddle
//   if (ball.y - ball.r + ball.vy <= 0) {
//     clearBall();
//     ball.y = ball.r;
//     ball.vy *= -1;
//     drawBall();
//     return true;
//   } else if (ball.y + ball.r >= viewHeight) {
//     clearBall();
//     ball.y = viewHeight - ball.r;
//     ball.vy *= -1;
//     drawBall();
//     return true;
//   } else if (
//     ball.x + ball.vx - ball.r <= leftPaddle.x + leftPaddle.w &&
//     (ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + leftPaddle.h)
//   ) {
//     // keep it from going past the paddle;
//     clearBall();
//     ball.x = leftPaddle.x + leftPaddle.w + ball.r;
//     ball.vx *= -1;
//     drawBall();
//     return true;
//   } else if (
//     ball.x + ball.r + ball.vx >= rightPaddle.x &&
//     (ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + rightPaddle.h)
//   ) {
//     clearBall();
//     ball.x = rightPaddle.x - ball.r;
//     ball.vx *= -1;
//     drawBall();
//     return true;
//   }
//   return false;
// }
// // from: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
