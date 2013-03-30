BrushStrokes = function (data) {
  this.id = data.canvas.id;
  this.color = "rgba(" + data.canvas.color.r + ", " + data.canvas.color.g + ", " + data.canvas.color.b + ", " + data.canvas.color.a + ")" || "rgba(255,255,255,1)";
  this.height = data.canvas.height;
  this.width = data.canvas.width;
  this.font = {
    'color': "rgba(" + data.font.color.r + ", " + data.font.color.g + ", " + data.font.color.b + ", " + data.font.color.a + ")" || "rgba(0,0,0,1)",
    'family': data.font.family || 'sans-serif',
    'size': data.font.size || 25,
    'style': data.font.style || "normal",
    'weight': data.font.weight || "normal"
  };
  this.content = {
    'text': data.content.text || "Sample",
    'x': data.content.x || 0,
    'y': data.content.y || this.font.size
  };
  this.brush = {
    'load': 0,
    'width': data.brush.width || 5
  };
  this.prevX = null;
  this.prevY = null;
  this.brushStrokeStart = function (x, y) {
    this.prevX = x;
    this.prevY = y;
  };
  this.brushStroke = function (x, y) {
    if (this.brush.load > 0) {
      this.context.beginPath();

      this.context.globalAlpha = this.brush.load;

      this.context.moveTo(this.prevX, this.prevY);
      this.context.lineTo(x, y);
      this.context.stroke();

      this.brush.load -= 0.05;
    }

    var pixelRGBA = this.getColor(x, y);

    if (this.font.color === "rgba(" + pixelRGBA[0] + ", " + pixelRGBA[1] + ", " + pixelRGBA[2] + ", " + pixelRGBA[3] / 255 + ")") {
      if (this.brush.load < 1) {
        this.brush.load += 0.2;
      }
      //this.context.lineWidth = 5;
    }

    this.prevX = x;
    this.prevY = y;
  };
  this.brushStrokeEnd = function () {
    this.brush.load = 0;
  };
};

BrushStrokes.prototype.init = function () {
  this.canvas = document.getElementById(this.id);
  this.context = this.canvas.getContext("2d");
  this.rect;

  this.canvas.height = this.height;
  this.canvas.width = this.width;

  this.context.fillStyle = this.color;
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

  this.context.font = this.font.style + " " + this.font.weight + " " + this.font.size + "px " + this.font.family;
  this.context.fillStyle = this.font.color;

  this.context.fillText(this.content.text, this.content.x, this.content.y);

  this.context.lineWidth = this.brush.width;

  this.rect = this.canvas.getBoundingClientRect();

  this.canvas.addEventListener("mousedown", this.onMouseDown, false);
  this.canvas.addEventListener("touchstart", this.onTouchStart, false);
};

BrushStrokes.prototype.onMouseDown = function (e) {
  bs.brushStrokeStart(e.clientX, e.clientY);
  bs.canvas.addEventListener("mousemove", bs.onMouseMove, false);
  bs.canvas.addEventListener("mouseup", bs.onMouseUp, false);
};

BrushStrokes.prototype.onMouseMove = function (e) {
  bs.brushStroke(e.clientX, e.clientY);
};

BrushStrokes.prototype.onMouseUp = function (e) {
  bs.brushStrokeEnd();
  bs.canvas.removeEventListener("mousemove", bs.onMouseMove, false);
  bs.canvas.removeEventListener("mouseup", bs.onMouseUp, false);
}

BrushStrokes.prototype.onTouchStart = function (e) {
  if (e.touches.length == 1) {
    e.preventDefault();
    bs.brushStrokeStart(e.touches[0].pageX, e.touches[0].pageY);
    bs.canvas.addEventListener("touchmove", bs.onTouchMove, false);
    bs.canvas.addEventListener("touchend", bs.onTouchEnd, false);
  }
};

BrushStrokes.prototype.onTouchMove = function (e) {
  if (e.touches.length == 1) {
    e.preventDefault();
    bs.brushStroke(e.touches[0].pageX, e.touches[0].pageY)
  }
};

BrushStrokes.prototype.onTouchEnd = function (e) {
  if (e.touches.length == 0) {
    e.preventDefault();
    bs.brushStrokeEnd();
  }
}

BrushStrokes.prototype.brushDown = function (x, y) {

};

BrushStrokes.prototype.getColor = function (x, y) {
  return this.context.getImageData(x, y, 1, 1).data;
}