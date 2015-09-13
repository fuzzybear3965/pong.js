window.onload = function() {
    initLayout();
};

function initLayout(){
    var canvases = createCanvases();
    var paddles = createPaddles(canvases);
    var pellet = new Pellet(paddles);
};

function createCanvases(){
    var viewHeight = window.innerHeight;
    var viewWidth = window.innerWidth;
    var canvasAdims = {width: 10, height: viewHeight};
    var canvasApos = {x: 5, y: 0};

    var canvasBdims = {width: 10, height: viewHeight};
    var canvasBpos = {x: viewWidth-10-5, y: 0}; // Give the canvas a 5 pixel margin

    // TODO: Maybe the above can be simplified??
    var canvasA = new Canvas('paddle-a',canvasApos,canvasAdims);
    var canvasB = new Canvas('paddle-b',canvasBpos,canvasBdims);

    return {canvasA: canvasA, canvasB: canvasB};
};

function createPaddles(canvasObj){
    var viewHeight = window.innerHeight;
    var initApos = {x:0,y:viewHeight*.5};
    var initBpos = {x:0,y:viewHeight*.5};
    var paddleA = new Paddle(canvasObj.canvasA,initApos);
    var paddleB = new Paddle(canvasObj.canvasB,initBpos);
   
    var paddles = {paddleA: paddleA, paddleB: paddleB};

    document.addEventListener('keydown', function(){
        keyFunction(event,paddles);
    });

    return paddles ;

};

function keyFunction(event,paddleObj){
    //TODO: Use a data structure to keep track of the keys so that
    //different players can hold down keys at the same time.
    keyStruck = event.which || event.keyCode; // cross-browser solution from w3schools
    // TODO: generalize the events, below, so that each player gets their own keys
    if (keyStruck == 38 || keyStruck == 40){
        var paddleA = paddleObj.paddleA;
        paddleA.move(event);    
    }

    else if (keyStruck == 87 || keyStruck == 83){
        var paddleB = paddleObj.paddleB;
        paddleB.move(event);    
    }
};
