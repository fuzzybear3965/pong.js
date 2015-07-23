// TODO: Change all instances of player/Player references to
// paddle/Paddle 

window.onload = function() {
    viewWidth = window.innerWidth; // GLOBAL
    viewHeight = window.innerHeight; // GLOBAL
    players = createPlayers();
    canvases = createCanvases(players);
    canvases.playerAcanvas.draw(players.paddleA.pos,players.paddleA.dims);
    //document.addEventListener('keydown',animate);
}

function createPlayers(){
    initApos = {x:0,y:viewHeight*.5};
    initBpos = {x:viewWidth-20,y:viewHeight*.5};
    paddleA = new Paddle('A',initApos);
    paddleB = new Paddle('B',initBpos); // TODO: get rid of the constant '20' in the x position
    return {paddleA: paddleA,
            paddleB: paddleB};
}
    
function createCanvases(playersObj){
    canvasAdims = {width: playersObj.paddleA.dims.width,
    height: playersObj.paddleA.dims.height};
    canvasApos = {x: playersObj.paddleA.pos.x,
        y: playersObj.paddleA.pos.y};
    
    canvasBdims = {width: playersObj.paddleB.dims.width,
    height: playersObj.paddleB.dims.height};
    canvasBpos = {x: playersObj.paddleB.pos.x,
        y: playersObj.paddleB.pos.y};
    // TODO: Maybe the above can be simplified??
    playerAcanvas = new Canvas('paddle-a',canvasApos,canvasAdims);
    playerBcanvas = new Canvas('paddle-b',canvasBpos,canvasBdims);
    return {playerAcanvas: playerAcanvas, 
        playerBcanvas: playerBcanvas};

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
