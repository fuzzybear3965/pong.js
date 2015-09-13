Paddle = function(canvasObj,posinit){
    this.score = 0;
    this.dims = {width: 10, height: 100}; // TODO: Should I add this as a constructor argument?
    this.pos = {x: posinit.x, y: posinit.y-.5*this.dims.height};
    this.canvas = canvasObj;
    this.draw(this.canvas);
};

Paddle.prototype.constructor = Paddle; // Paddle has its own constructor

Paddle.prototype.move = function(event){
    // TODO: generalize the events, below, so that each player gets their own keys
    var keyCode = event.which || event.keyCode; //cross-platform solution from w3schools
    this.isDown;
    if (keyCode == 38 || keyCode == 40 || keyCode == 87 || keyCode == 83){
        if (keyCode == 40 || keyCode == 83) {
            // 40 is down and 83 is s
            this.isDown = 1;
        }
        else if (keyCode == 38 || keyCode == 87) {
            // 38 is up and 87 is w
            this.isDown = -1;
        }
        else { console.log('Keys can only be <up>, <down>, w or s.') };
        // this.isDown = keyCode - 39; // -1 for ArrowUp and +1 for ArrowDown
        console.log('isDown is: ' + this.isDown);
        if (this.isDown > 0) {
            if (this.pos.y + this.dims.height < window.innerHeight-5){
                this.movement = 5 * this.isDown; // Move it down by 5
            } else {
                this.movement = window.innerHeight - this.pos.y - this.dims.height; // Move it down to the very bottom 
            }
        }

        else if (this.isDown < 0){
            if (this.pos.y > 5) {
                this.movement = 5 * this.isDown; // Move it up by 5
            } else{                 
                this.movement = -1*this.pos.y; // Move it up to the very top
            }
        }
        this.pos.y += this.movement;
        console.log('this.pos.y is: ' + this.pos.y);
        this.draw(this.canvas); // TODO: Implement this draw function somehow
    }
}

Paddle.prototype.draw = function(canvasObj){
    var ctx = canvasObj.canvasElement.getContext("2d");
    if (ctx) {
        ctx.clearRect(0,0,canvasObj.dims.width,canvasObj.dims.height);
        ctx.fillStyle = "#F00";
        ctx.fillRect(this.pos.x,this.pos.y,this.dims.width,this.dims.height);
    }
};
