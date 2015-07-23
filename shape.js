// Rectangle and Circle are "subclasses" of Shape. In order to allow Rectangle and
// Circle to share methods of Shape (even if Shape is changed after Rectangle
// and Circle are instantiated) I define Rectangle and Circle to have the same
// prototype as Shape.
// Calling the Shape constructor inside Rectangle's and
// Circle's constuctors allows me to inherit all of the properties from
// Shape in the new Rectangle or Circle.
//
// Important design note: shapes do not have positions. Just geometries.
// Thus, although I have implemented a draw method for all Shape
// objects, the positions must be given in order that the particular
// shape can be drawn.

Shape = function(){
    this.fillColor = "#FFF";
    this.strokeColor = "#000";
};


Rectangle = function(width,height){
    Shape.call(this);
};

Rectangle.prototype = Object.create(Shape.prototype); // Make Rectangle's prototype that of Shape (Rectangle "extends" Shape)
Rectangle.prototype.constructor = Rectangle; // Make sure that Rectangle's constructor is the one we want.

function Circle(radius){
    Shape.call(this);
};

Circle.prototype = Object.create(Shape.prototype); // Make Circle's prototype that of Shape (Circle "extends" Shape)
Circle.prototype.constructor = Circle; // Make sure that Circle's constructor is the one we want.
