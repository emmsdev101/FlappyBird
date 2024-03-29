class Pipe {
  constructor() {
    this.x = width;
    this.space = 90;
    this.bound = this.randPos();
    this.y_top = this.bound;
    this.y_bottom = this.bound + this.space;
    this.wide = 100  ;
    this.speed = 0;
    this.pipe_top=new Image();
    this.pipe_bottom=new Image();
    this.pipe_top.src="pipe_top.png";
    this.pipe_bottom.src="pipe_bottom.png";
  }
  draw(pctx) {
    
    pctx.drawImage(this.pipe_top,this.x,this.y_top-590);
    pctx.drawImage(this.pipe_bottom,this.x,this.y_bottom);
  }
  update() {
    this.x -= this.speed;
  }
  randPos() {
    var space = Math.random() * (500 - 150);
    if (space < 50) {
      space = 50;
    }
    return space;
  }
}