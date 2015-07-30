var Canvas = function(domid,pos,dims){
    this.dims = dims;
    this.pos = pos;
    this.canvasElement = document.getElementById(domid);
    this.canvasContext = this.canvasElement.getContext("2d");
    this.canvasElement.width = this.dims.width;
    this.canvasElement.height = viewHeight;
    if (pos.x != 0 || pos.y != 0) {
        this.canvasContext.translate(pos.x,pos.y);
    };
};
