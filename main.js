// TODO: Change all instances of paddle/Paddle references to
// paddle/Paddle 

window.onload = function() {
    viewWidth = window.innerWidth; // GLOBAL
    viewHeight = window.innerHeight; // GLOBAL
    //var paddles = createPaddles();
    var paddleA = new Paddle('A', {x:0,y:viewHeight*.5});
    var canvasA = new Canvas('paddle-a',{x:0,y:0},{width:10,height:viewHeight});
    //document.addEventListener('keydown',animate);
}

function createPaddles(){
    initApos = {x:0,y:viewHeight*.5};
    initBpos = {x:viewWidth-20,y:viewHeight*.5};
    paddleA = new Paddle('A',initApos);
    paddleB = new Paddle('B',initBpos); // TODO: get rid of the constant '20' in the x position
    return {paddleA: paddleA,
            paddleB: paddleB};
}
    
function createCanvases(paddlesObj){
    canvasAdims = {width: paddlesObj.paddleA.dims.width,
    height: paddlesObj.paddleA.dims.height};
    canvasApos = {x: paddlesObj.paddleA.pos.x,
        y: paddlesObj.paddleA.pos.y};
    
    canvasBdims = {width: paddlesObj.paddleB.dims.width,
    height: paddlesObj.paddleB.dims.height};
    canvasBpos = {x: paddlesObj.paddleB.pos.x,
        y: paddlesObj.paddleB.pos.y};
    // TODO: Maybe the above can be simplified??
    paddleAcanvas = new Canvas('paddle-a',canvasApos,canvasAdims);
    paddleBcanvas = new Canvas('paddle-b',canvasBpos,canvasBdims);
    return {paddleAcanvas: paddleAcanvas, 
        paddleBcanvas: paddleBcanvas};

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
