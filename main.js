window.onload = function() {
    viewWidth = window.innerWidth; // GLOBAL
    viewHeight = window.innerHeight; // GLOBAL
    var canvases = createCanvases();
    var paddles = createPaddles(canvases);

    var progress = 0;
    var canvasElement = document.getElementById('pellet');
    canvasElement.width = viewWidth;
    canvasElement.height = viewHeight;
    canvasElement.style.top = "0px";
    canvasElement.style.left = "0px";
    canvasElement.style.position = "absolute";
    var ctx = canvasElement.getContext("2d");
    ctx.arc(100,100,10,0,2*Math.PI);
    ctx.fill();
    var id = setInterval(function() {
        progress += .1;
        ctx.clearRect(0,0,canvasElement.width,canvasElement.height);
        ctx.arc(100+2*100*progress,100+2*100*progress,10,0,2*Math.PI);
        ctx.fill();
        if (Math.round(progress*10)/10 == 1) {
            clearInterval(id);
        };
    },500);

    document.addEventListener('keydown', function(){
        keyFunction(event,paddles);
    });
};

function createCanvases(){
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
    var initApos = {x:0,y:viewHeight*.5};
    var initBpos = {x:0,y:viewHeight*.5};
    var paddleA = new Paddle(canvasObj.canvasA,initApos);
    var paddleB = new Paddle(canvasObj.canvasB,initBpos); 
    return {paddleA: paddleA, paddleB: paddleB};
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
