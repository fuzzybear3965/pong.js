var Canvas = function(domid,x,y,width,height){
    this.dims = {x : x, y : y};
    this.width = width;
    this.height = height;
    this.canvasElement = document.getElementById(domid);
    this.canvasContext = this.canvasElement.getContext("2d");
    if (x != 0 && y != 0) {
        this.canvasContext.translate(x,y);
    };

Canvas.prototype.draw = function(shapeObj){
    this.shape = shapeObj;
    this.canvasEl = document.getElementById(this.canvasId);
    if (this.canvasEl.getContext) {
        this.context = this.canvasEl.getContext('2d'); 
        this.context.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.context.fillStyle = "#00F";
        this.context.fillRect(shapeObj.x,shapeObj.y,shapeObj.width,shapeObj.height);
   }
}
