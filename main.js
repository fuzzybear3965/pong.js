(function () {
  var start = performance.now();

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

  // paddle dimensions set up as fraction of screen size
  var paddleMargin = Math.ceil(viewWidth / 100); // distance from edge
  var paddleHeight = Math.floor(viewHeight / 5);
  var paddleWidth = Math.floor(viewWidth / 80);

  var leftPaddle, rightPaddle = null;
  var ball; // global ball object
  var keys = {}; // global object storing information about how many of which key was pressed
  var score = { l: 0, r: 0 };

  window.addEventListener("keydown", keyPressed);

  init();

  function step(timestamp) {
    // // move ball at 1 px / ms
    var deltaT = Math.floor(timestamp - start); // number of milliseconds
    moveBall(ball, deltaT);
    movePaddle(leftPaddle);
    movePaddle(rightPaddle);
    initKeys();
    if (hasCollided()) {
      // redraw the paddles just in case
      drawPaddle(leftPaddle);
      drawPaddle(rightPaddle);
    }
    if (hasExited()) {
      if (ball.x < leftPaddle.x) {
        score.r += 1;
      } else {
        score.l += 1;
      }

      init();
      return;
    }
    requestAnimationFrame(step);
  }

  function movePaddle(paddle) {
    var net = keys[paddle.downKey] - keys[paddle.upKey];
    var multiplier = Math.ceil(.01 * viewHeight);
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

  function moveBall(ball) {
    // remove old ball
    clearBall();
    // update ball position
    ball.x += ball.vx;
    ball.y += ball.vy;
    drawBall(ball);
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
    return ball;
  }

  function initBall() {
    ball = {
      x: viewWidth >> 1,
      y: viewHeight >> 1,
      r: paddleWidth,
      vx: getRandomInt(-viewWidth / 30, viewWidth / 30),
      vy: getRandomInt(-viewHeight / 50, viewHeight / 50)
    };
  }
  function initPaddles() {
    // Initial left and right paddle positions
    leftPaddle = {
      x: paddleMargin,
      y: (viewHeight - paddleHeight) >> 1,
      w: paddleWidth,
      h: paddleHeight,
      vx: 0,
      vy: 0,
      color: "#0000FF",
      upKey: "w",
      downKey: "s",
    };
    rightPaddle = {
      x: viewWidth - paddleMargin - paddleWidth,
      y: (viewHeight - paddleHeight) >> 1,
      w: paddleWidth,
      h: paddleHeight,
      vx: 0,
      vy: 0,
      color: "#FF0000",
      upKey: "ArrowUp",
      downKey: "ArrowDown",
    };
  }
  function initKeys() {
    keys[leftPaddle.upKey] = 0;
    keys[leftPaddle.downKey] = 0;
    keys[rightPaddle.upKey] = 0;
    keys[rightPaddle.downKey] = 0;
  }

  function countdown(t) {
    return function () {
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
  function init() {
    // check if we're on a new round
    initPaddles();
    initBall();
    initKeys();
    loadingScreen();
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
    if ((ball.x - ball.r <= leftPaddle.x + paddleWidth) &&
            (ball.y <= leftPaddle.y || ball.y >= leftPaddle.y + leftPaddle.h)) {
      return true;
    } else if ((ball.x + ball.r >= rightPaddle.x) &&
            (ball.y <= rightPaddle.y || ball.y >= rightPaddle.y + rightPaddle.h)) {
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
      (ball.x + ball.vx - ball.r <= leftPaddle.x + paddleWidth) &&
            (ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + leftPaddle.h)
    ) {
      // keep it from going past the paddle;
      clearBall();
      ball.x = leftPaddle.x + paddleWidth + ball.r;
      ball.vx *= -1;
      drawBall();
      return true;
    } else if (
      (ball.x + ball.r + ball.vx >= rightPaddle.x) &&
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
})();