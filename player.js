var Player = function(score,name){
    Paddle.call(this);
    this.score = score;
    this.name = name;
}

Player.prototype = Object.create(Paddle.prototype); // Player extends Paddle
Player.prototype.constructor = Player; // Player has its own constructor
