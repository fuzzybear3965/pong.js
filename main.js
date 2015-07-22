window.onload = function() {
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;
    players = createPlayers();
    createCanvases(players);
    //document.addEventListener('keydown',animate);
}

function createPlayers(){
    playerA = new Player(0,'A');
    playerB = new Player(0,'B');
    return [playerA, playerB];
}
    
function createCanvases(){
    paddleAcanvas = new Canvas('paddle-a',playerA.x,playerA.y,playerA.width,playerA.height);
    paddleBcanvas = new Canvas('paddle-b',playerB.x,playerB.y,playerB.width,playerB.height);
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

function draw(shapeObj, canvasObj) {
    if (canvasObj.canvasEl.getContext) {
        var context = canvasObj.canvasEl.getContext('2d'); 
        context.fillStyle = "#00F";
        context.fillRect(shapeObj.x,shapeObj.y,shapeObj.width,shapeObj.height);
   }
}
