var Pellet = function(speed,direction) {
    Circle.call(this);
    this.speed = speed;
    this.direction = direction;
}

Pellet.prototype = Object.create(Circle.prototype); // Pellet extends Circle
Pellet.prototype.constructor = Pellet; // Pellet has its own constructor
