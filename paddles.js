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
