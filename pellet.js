var Pellet = function(paddlesObj) {
    this.trajectory = {x: (Math.random()-.5), y: (Math.random()-.5)};
    this.radius = 5;
    this.pos = {x: window.innerWidth*.5, y: window.innerHeight*.5};
    var canvas = document.getElementById('pellet');
    this.drawPellet(canvas);
    this.movePellet(canvas,paddlesObj);
};

Pellet.prototype.constructor = Pellet; // Pellet has its own constructor

Pellet.prototype.movePellet = function(canvas,paddles){
    var that = this;
    var cnt = 0;
    var paddleA = paddles.paddleA;
    var paddleB = paddles.paddleB;
    
    var id = setInterval(function() {
        // To get the distance from the paddleA I'm taking the distance
        // between the center of the pellet and the top right corner of
        // the paddle in both x and y, since this paddle is always to
        // the left of the pellet during gameplay.
        var distFromPaddleA = {x: that.pos.x - (paddleA.pos.x + parseInt(paddleA.canvas.canvasElement.style.left) + paddleA.dims.width),
            y: that.pos.y - (paddleA.pos.y + parseInt(paddleA.canvas.canvasElement.style.top))};

        // To get the distance from the paddleB I'm taking the distance
        // between the center of the pellet and the top left corner of
        // the paddle in both x and y, since this paddle is always to
        // the right of the pellet during gameplay.
        var distFromPaddleB = {x: (paddleB.pos.x + parseInt(paddleB.canvas.canvasElement.style.left)) - that.pos.x,
            y: that.pos.y - (paddleB.pos.y + parseInt(paddleB.canvas.canvasElement.style.top))};

        cnt += 1;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();

        ctx.arc(that.pos.x,that.pos.y,10,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();

        if (Math.log10(cnt) %1 == 0){
            // TODO: Add some trajectory smoothing
            console.log('Increasing trajectory: ' + cnt.toString());
            // If it's been going for a while, make it n times faster
            // after n*1000 steps.
            that.trajectory.x += that.trajectory.x; 
            that.trajectory.y += that.trajectory.y; 
        }

        if (distFromPaddleA.x < 5 && distFromPaddleA.y >= 0 && distFromPaddleA.y < paddleA.dims.height){
            // If it's too far left and close to a paddle
            console.log("I'm too close to the left paddle.");
            that.trajectory.x = Math.abs(that.trajectory.x); // Make it go right
        } else if (distFromPaddleB.x < 5 && distFromPaddleB.y >= 0 && distFromPaddleB.y < paddleB.dims.height){
            // If it's too far right and near a paddle
            console.log("I'm too close to the right paddle.");
            that.trajectory.x  = -1*Math.abs(that.trajectory.x); // Make it go left
        } else if (that.pos.y < 5) {
            // If it's too far up
            console.log("I'm too far up.");
            that.trajectory.y = Math.abs(that.trajectory.y); // Make it go down
        } else if (that.pos.y + 5 > window.innerHeight){
            // If it's too far down
            console.log("I'm too far down.");
            that.trajectory.y = -1*Math.abs(that.trajectory.y);
        } else if (window.innerWidth - that.pos.x < 10){
            // The pellet is past the goal on the right
            ctx.clearRect(0,0,canvas.width,canvas.height);
            alert("Way to go player A!!!");
            clearInterval(id);

        } else if (that.pos.x < 10){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            alert("Way to go player B!!!");
            clearInterval(id);
        }
     
        that.pos.x += that.trajectory.x;
        that.pos.y += that.trajectory.y;
    }, 10);
};

Pellet.prototype.drawPellet = function(canvas){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');
        ctx.arc(this.pos.x,this.pos.y,10,0,2*Math.PI);
        ctx.fillStyle="rgb(0,0,255)";
        ctx.fill();
    }; // draw a new pellet (this
    //self-invoking function is run after new is called)
