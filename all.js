var Canvas = function(domid,x,y,width,height){
    this.dims = {x : x, y : y};
    this.width = width;
    this.height = height;
    this.canvasElement = document.getElementById(domid);
    this.canvasContext = this.canvasElement.getContext("2d");
    if (x != 0 && y != 0) {
        this.canvasContext.translate(x,y);
    };

Canvas.prototype.draw = function(shapeObj){
    this.shape = shapeObj;
    this.canvasEl = document.getElementById(this.canvasId);
    if (this.canvasEl.getContext) {
        this.context = this.canvasEl.getContext('2d'); 
        this.context.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.context.fillStyle = "#00F";
        this.context.fillRect(shapeObj.x,shapeObj.y,shapeObj.width,shapeObj.height);
   }
}
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
Paddle = function(){
    Rectangle.call(this);
    this.x = 0; // TODO: Maybe let them move in the x-direction?
    this.y = window.innerHeight; // TODO: Get the document height from some other scope
    this.width = 20; // TODO: Should I add this as a constructor argument?
    this.height = 100; // TODO: Same as above
};

Paddle.prototype = Object.create(Rectangle.prototype); // Paddle extends Rectangle
Paddle.prototype.constructor = Paddle; // Paddle has its own constructor

Paddle.prototype.move = function(event){
	// TODO: generalize the events, below, so that each player gets their own keys
    if (event.keyCode == 38 || event.keyCode == 40){
        this.isDown = event.keyCode - 39; // makes val = -1 for ArrowUp and +1 for ArrowDown
        if (this.isDown > 0) {
            if (this.y+this.height < window.innerHeight-5)
                this.movement = 5 * this.isDown; // Move it down by 5
            else                 
                this.movement = window.innerHeight - this.y; // Move it down to the very bottom 
        }

        else if (this.isDown < 0){
            if (this.y > 5)
                this.movement = 5 * this.isDown; // Move it up by 5
            else                 
                this.movement = -1*this.y; // Move it up to the very top
        }
        this.y += this.movement;
        draw(this); // TODO: Implement this draw function somehow
    }
}
var Pellet = function(speed,direction) {
    Circle.call(this);
    this.speed = speed;
    this.direction = direction;
}

Pellet.prototype = Object.create(Circle.prototype); // Pellet extends Circle
Pellet.prototype.constructor = Pellet; // Pellet has its own constructor
    this.drawPellet = (function () {})(); // draw a new pellet (this self-invoking function is run after new is called) 
};
var Player = function(score,name){
    Paddle.call(this);
    this.score = score;
    this.name = name;
}

Player.prototype = Object.create(Paddle.prototype); // Player extends Paddle
Player.prototype.constructor = Player; // Player has its own constructor
// Rectangle and Circle are "subclasses" of Shape. In order to allow Rectangle and
// Circle to share methods of Shape (even if Shape is changed after Rectangle
// and Circle are instantiated) I define Rectangle and Circle to have the same
// prototype as Shape. Calling the Shape constructor inside Rectangle's and
// Circle's constuctors allows me to inherit all of the properties from
// Shape in the new Rectangle or Circle.

Shape = function(){
    this.pos = {
        x: this.x,
        y: this.y
    };
    this.fillColor = "#FFF";
    this.strokeColor = "#000";
};

Shape.prototype.draw = function(canvas){
//    this.canvas = new Canvas()
}

Rectangle = function(width,height){
    Shape.call(this);
    this.dims = {
        width: width,
        height: height
    };
};

Rectangle.prototype = Object.create(Shape.prototype); // Make Rectangle's prototype that of Shape (Rectangle "extends" Shape)
Rectangle.prototype.constructor = Rectangle; // Make sure that Rectangle's constructor is the one we want.

function Circle(radius){
    Shape.call(this);
    this.dims = {
        radius: radius
    };
};

Circle.prototype = Object.create(Shape.prototype); // Make Circle's prototype that of Shape (Circle "extends" Shape)
Circle.prototype.constructor = Circle; // Make sure that Circle's constructor is the one we want.
