window.onload = function() {
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;
    
    PaddleA = new Paddle();
    PaddleB = new Paddle();
    
    draw(PaddleA,canvas);
    draw(PaddleB,canvas);
    
    main(canvas);
}

function animate(event){
        if (event.keyCode == 38 || event.keyCode == 40){
            isDown = event.keyCode - 39; // makes val = -1 for ArrowUp and +1 for ArrowDown
            if (isDown > 0) {
                if (PaddleA.y+PaddleA.height < window.innerHeight-5)
                    movement = 5 * isDown;
                else                 
                    movement = window.innerHeight - (PaddleA.y + PaddleA.height);
                PaddleA.y += movement;
                redraw(PaddleA);
            }

            else if (isDown < 0){
                if (PaddleA.y > 5)
                    movement = 5 * isDown;
                else                 
                    movement = - PaddleA.y;
                PaddleA.y += movement;
                redraw(PaddleA);
            }
        }
}

function spawnPellet(){
//    pellet = 
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
    document.addEventListener('keydown',animate);
};
