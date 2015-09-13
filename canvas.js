var Canvas = function(domid,pos,dims){
    this.dims = dims;
    this.pos = pos;
    this.canvasElement = document.getElementById(domid);
    this.canvasElement.width = this.dims.width;
    this.canvasElement.height = viewHeight;
    // The below is super clutch. It's what changes the position of the canvas.
    // 'translate()' is a transformation that affects the shapes drawn on the canvas.
    this.canvasElement.style.top = pos.y.toString() + "px";
    this.canvasElement.style.left = pos.x.toString() + "px";
    this.canvasElement.style.position = "absolute";
};

