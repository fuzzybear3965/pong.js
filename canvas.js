var Canvas = function(domid,pos,dims){
    this.dims = dims;
    this.pos = pos;
    this.canvasElement = document.getElementById(domid);
    this.canvasContext = this.canvasElement.getContext("2d");
    if (dims.x != 0 && dims.y != 0) {
    this.canvasElement.width = this.dims.width;
    this.canvasElement.height = viewHeight;
        this.canvasContext.translate(dims.x,dims.y);
    };
};

Canvas.prototype.draw = function(posObj,dimsObj){
    if (this.canvasElement.getContext) {
        this.context = this.canvasElement.getContext('2d'); 
        this.context.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.context.fillStyle = "#F00";
        console.log('x',posObj.x,' y',posObj.y,' width',dimsObj.width,' height',dimsObj.height);
        this.context.fillRect(posObj.x,posObj.y,dimsObj.width,dimsObj.height);
   }
};
