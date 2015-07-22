// Rectangle and Circle are "subclasses" of Shape. In order to allow Rectangle and
// Circle to share methods of Shape (even if Shape is changed after Rectangle
// and Circle are instantiated) I define Rectangle and Circle to have the same
// prototype as Shape. Calling the Shape constructor inside Rectangle's and
// Circle's constuctors allows me to inherit all of the properties from
// Shape in the new Rectangle or Circle.

var Shape = function(){
    this.pos = {
        x: this.x,
        y: this.y
    };
    this.fillColor = "#FFF";
    this.strokeColor = "#000";
};

Shape.prototype.draw = function(canvas){
    this.canvas = new Canvas(
}

var Rectangle = function(width,height){
    Shape.call(this);
    this.dims = {
        this.width: width,
        this.height: height
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
