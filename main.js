window.onload = function() {
    new Paddle();
//    viewWidth = document.documentElement.clientWidth;
    viewWidth = window.innerWidth;
    viewHeight = document.documentElement.clientHeight;//window.innerHeight;
    var canvas = new Canvas(viewWidth,viewHeight,'paddle-canvas');
    PaddleA = new Paddle();
    PaddleB = new Paddle();
   
    initPaddles();
    draw(PaddleA,canvas);
    draw(PaddleB,canvas);
//    drawPaddle(cfg.paddleA.x,cfg.paddleA.y,cfg.paddleA.width,cfg.paddleA.height,canvas);
//    drawPaddle(cfg.paddleB.x,cfg.paddleB.y,cfg.paddleB.width,cfg.paddleB.height,canvas);
    main(canvas);
    
}

function animate(event){
        if (event.key == "ArrowUp" || event.key == "ArrowDown"){
            val = event.keyCode - 39; // makes val = -1 for ArrowUp and +1 for ArrowDown
            movement = 5 * val;
            PaddleA.y += movement;
            console.log(PaddleA.y);
            draw(PaddleA);
        }

}

function redraw(shapeObj){
    canvas = document.getElementById('paddle-canvas');
    if (canvas.getContext) {
        var context = canvas.getContext('2d'); 
        context.clearRect(0,0,window.innerWidth,window.innerHeight);
        context.fillStyle = "#00F";
        context.fillRect(shapeObj.x,shapeObj.y,shapeObj.width,shapeObj.height);
   }
}

function initPaddles(){
    PaddleA.width = cfg.paddleA.width;
    PaddleA.height = .2*viewHeight;
    PaddleA.x = 10;
    PaddleA.y = .5*(viewHeight-PaddleA.height);    

    PaddleB.width = cfg.paddleB.width;
    PaddleB.height = .2*viewHeight;
    PaddleB.x = viewWidth - PaddleB.width - 10;
    PaddleB.y = .5*(viewHeight-PaddleB.height);    
}

function Player(id) {
    this.name = id,
    this.score,
    this.paddle = new Paddle();
}

function Paddle() {
    this.x,
    this.y,
    this.width,
    this.height
}

function Canvas(width, height, id) {
    this.canvasEl = document.getElementById(id);
//    this.canvasEl.width = width;
//    this.canvasEl.height = height;
    this.canvasEl.width = width;
    this.canvasEl.height = height;
    this.canvasID = id;
}

function draw(shapeObj, canvasObj) {
    if (canvasObj.canvasEl.getContext) {
        var context = canvasObj.canvasEl.getContext('2d'); 
        context.fillStyle = "#00F";
        context.fillRect(shapeObj.x,shapeObj.y,shapeObj.width,shapeObj.height);
   }
}

function main(gameCanvas) {
    console.log("i'm here.");
    document.addEventListener("keypress",animate);
};
