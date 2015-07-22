var Canvas = function(domid,x,y,width,height){
    this.dims = {x : x, y : y};
    this.width = width;
    this.height = height;
    this.canvasElement = document.getElementById(domid);
    this.canvasContext = this.canvasElement.getContext("2d");
    if (x != 0 && y ! = 0) {
        this.canvasContext.translate(x,y);
    };
}
