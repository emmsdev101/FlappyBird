class Bird{
  constructor(){
    this.x=window.innerWidth/2-45;
    this.y=width/2;
    this.width=45;
    this.height=35;
    this.color="#b35a24";
    this.gravity=.3;
    this.y_velocity=0;
    this.score=0;
    this.image=new Image();
    this.image.src="bird.png";
    this.bird_up=new Image();
    this.bird_up.src="bird_up.png";
    this.bird_down=new Image();
    this.bird_down.src="bird_down.png";

  }
  draw(bctx){
      bctx.save();
      bctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      bctx.rotate(Math.PI / 2 * this.y_velocity / 20);
      bctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
      bctx.restore();
    
  }
  update(){
      this.score++;
      this.y_velocity+=this.gravity;
      this.y+=this.y_velocity;
      
      if(this.y_velocity>7){
        this.y_velocity=7;
      }
  }
  
  fly(){
      this.y_velocity=-5;
  }
 
}