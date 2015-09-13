var Pellet = function(speed,direction) {
    Circle.call(this);
    this.speed = speed;
    this.direction = direction;
    this.drawPellet = (function () {})(); // draw a new pellet (this
                                          //self-invoking function is run after new is called) 
}

Pellet.prototype.constructor = Pellet; // Pellet has its own constructor
