// Box and Circle are "subclasses" of Shape. In order to allow Box and
// Circle to share methods of Shape (even if Shape is changed after Box
// and Circle are instantiated) I define Box and Circle to have the same
// prototype as shape. I also make sure that all of the properties of
// Shape are defined in its prototype.

var Shape = function(){
    this.pos = {
        x: this.x,
        y: this.y
    };
    this.fillColor = "#FFF";
    this.strokeColor = "#000";

    return this;
};

var Box = function(){
    Shape.call(this);
    this.dims = {
        width: this.width,
        height: this.height
    };
};
Box.prototype = Object.create(Shape.prototype); // Make Box's prototype that of Shape (Box "extends" Shape)
Box.prototype.constructor = Box; // Make sure that Box's constructor is the one we want.

function Circle(){
    Shape.call(this);
    this.dims = {
        radius: this.radius
    };
};
Circle.prototype = Object.create(Shape.prototype); // Make Box's prototype that of Shape (Box "extends" Shape)
Circle.prototype.constructor = Box; // Make sure that Circle's constructor is the one we want.
