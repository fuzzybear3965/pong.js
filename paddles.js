var Paddle = function(){
    Rectangle.call(this);
    this.x = 0; // TODO: Maybe let them move in the x-direction?
    this.y = ; // TODO: Get the document height from some other scope
    this.width = 20; // TODO: Should I add this as a constructor argument?
    this.height = 100; // TODO: Same as above
};

Paddle.prototype = Object.create(Rectangle.prototype); // Paddle extends Rectangle
Paddle.prototype.constructor = Paddle; // Paddle has its own constructor
