var bird;
var pipes=[];
var canvas;
var height=0;
var width=0;
var ctx;
var counter=0;
var start=false;
var score=0;
var best_score=0;
var clouds=[];
var grounds=[];
var game_over=false;
var ground_alt = 500
var game_speed = 1

/* window.onload function makes sure that the html document
is fully loaded to cliet's browser before running our game. */
window.onload=function(){
  
  initWindow();
  getPipe();
  setupBird();
  setupClouds();
  setupGround();
// setIntervalcontinuously runs the function passed inside
// in the first argument with a timeout value in the second argument.
  setInterval(function(){
    // this function is called the gameloop. It is the heartbeat of our game.
    // this makes the graphical rendering and physics interaction of our game happen. 
    
    draw(); // rendering the assests of our game.
    if(start){ // if start is true, then we run the game
      if(game_over) { // if game is over i.e the player died, we stop
        // updating game variables. Otherwise, keep updating.
        gameOver();
        game_over = true;
      }else{
        update();
    }
    }else{
      startScreen()
    }
  },1000/60); // we are running our game loop at 60 times a second.
}
function initWindow(){
  // this function sets up the game canvas and ctx
  canvas=document.getElementById("canvas"); // canvas is what wee need to render the bird, pipes and background
  ctx=canvas.getContext("2d"); // we then need to access the context of the canvas in order to draw. 
  // context holds the object for drawing operations in canvas.
  height = window.innerHeight
  if (window.innerWidth>700){
    width = window.innerWidth
  }else {
    width = window.innerWidth
  }
  canvas.width=width;
  canvas.height=height;
}
function setupClouds(){
  // Loading the clouds background
      console.log("init clouds");
      var cloud=new Background();
      cloud.load();
      clouds.push(cloud);
      var cloud1=new Background();
      cloud1.load();
      cloud1.x=cloud.x+cloud.width;
      clouds.push(cloud1);
      var cloud2=new Background();
      cloud2.load();
      cloud2.x=cloud1.x+cloud1.width;
      clouds.push(cloud2);
      var cloud3=new Background();
      cloud3.load();
      cloud3.x=cloud2.x+cloud2.width;
      clouds.push(cloud3);

    }
  function setupGround() {
    // Loading the ground
    var ground = new Ground();
    ground.load();
    grounds.push(ground);
     var ground1 = new Ground();
     ground1.load();
    ground1.x = ground.x + ground.width;
    grounds.push(ground1);
     var ground2 = new Ground();
     ground2.load();
    ground2.x = ground1.x + ground1.width;
    grounds.push(ground2);
    var ground3 = new Ground();
     ground3.load();
    ground3.x = ground2.x + ground2.width;
    grounds.push(ground3);
  
  }
      
function draw(){
  // this is where rendering happens
  ctx.clearRect(0,0,width,height); // first we need to clear the canvas
  // to remove the previos drawings.

  // drawing the clounds.
  for(i=0;i<clouds.length;i++){
    clouds[i].draw(ctx);
  }
  // drawing the bird.
  bird.draw(ctx);
 // drawing pipe
  for (i = 0; i < pipes.length; i++) {
    pipes[i].draw(ctx);
  }
  // drawing ground
  for(ground of grounds){
    ground.draw(ctx)
  }
  // drawing the score board
  ctx.fillStyle = "rgba(5,5,5,.5)";
  ctx.fillRect(10, 5, 300, 50);
  ctx.fillStyle="#fef43e";
  ctx.font="15px Courier New";
  ctx.fillText("Score: "+score,20,30);
  ctx.fillText("Best Score: "+best_score,130,30);
  
}
function update(){
  /* this function does the update in our game variables.
    This function makes our bird and pipes move by constantly updating their
    values like x position and y position. */
  counter++;
  //updatting bird;
    bird.update();
  // updating pipes

  // since our pipes are in array, we need to loop through it.
  for (i=0;i<pipes.length;i++){
     pipes[i].update();
  }
  checkPipes();
  // If there is no pipe on screen, make a new one.
  if(pipes.length==0){
    getPipe();
    counter=0;
  }
  // we constantly adding pipe with random distance from neighboring pipes.
  if(counter>(Math.random(new Date().getTime)*500)+200){
    getPipe();
    counter=0;
  }
  detectCollision()
  score++;
  if(score>best_score){
    best_score=score;
  }
  for(i=0;i<clouds.length;i++){
    clouds[i].update();
  }

for (i=0;i<grounds.length;i++) {
  grounds[i].update();
}
}
function detectCollision(){
  // this code detects collision with bird and pipe.

  var p = pipes[0]; // for choosing incoming pipe.
  if (p.x + p.wide >= bird.x) { // checks of the first pipe is in front of the bird.
       p = pipes[0]; 
  }else { // if the first pipe is not in front, then choose the second pipe.
       p = pipes[1];
  }
  // this checks if bird collided with pipe or collided the top or fell down, then game over.
  
  if (bird.x + bird.width - 5 >= p.x && bird.x+20<=p.x+p.wide&&
    (bird.y + bird.height <= p.y_top || bird.y + bird.height - 5 >= p.y_bottom) || (bird.y <= 0 || bird.y + bird.height >= ground_alt)) {
      game_over=true;
  }
}
function getPipe(){
  // for getting a pipe.
  if(pipes.length==0){
    var pipe=new Pipe();
    pipe.speed =  game_speed 
    pipe.x=width; // make the pipe's initial position as the edge of the screen.
    pipes.push(pipe); // adding to the list of pipes.
  }else{
    var pipe = new Pipe();
    pipe.speed =  game_speed
    pipes.push(pipe);
  }
  
}
function checkPipes(){
  // This removes the pipe when pipe is off the sreen
  for (i = 0; i < pipes.length; i++) {
    if(pipes[i].x+pipes[i].wide<0){
      pipes.splice(0,1);
    }
  }
}
function setupBird(){
    bird=new Bird();
}
function gameOver(){
    ctx.fillStyle = "#e74f44";
    ctx.font = "37px Courier New";
    ctx.fillText("Game Over", width/2-100, height/2);
}
function startScreen(){
  ctx.fillStyle = "#e74f44";
  ctx.font = "20px Courier New";
  ctx.fillText("Press space or touch to start", width/2-150, height/2);
}
function resetGame(){
  bird.y=height/2;
  game_over=false;
  pipes=[];
  getPipe();
  counter=0;
  score=0;
}
class Background{
  // backgroud object
  constructor(){
    this.sky;
    this.ground;
    this.y=300;
    this.x=0;
    this.width=400;
    this.height=500;
    this.speed=game_speed*.1;
  }
  load(){
    this.sky = new Image();
   // this.sky.src = "sky.png";
    
  }
  draw(ctx){
    ctx.drawImage(this.sky,this.x,0);
    }
  update(){
    this.x-=this.speed;
    if(this.x+this.width<0){
      this.x=this.width;
    }
}
}
class Ground{
  constructor(){
    this.ground;
    this.y=500;
    this.x=0; 
    this.width=600;
    this.height=500;
    this.speed=game_speed;
  }
  load(){
    this.ground=new Image();
    this.ground.src="ground.png";
  
  }
  draw(ctx){
    ctx.drawImage(this.ground,this.x,this.y);  }
  update(){
    this.x-=this.speed;
    if(this.x+this.width<=0){
      this.x=window.innerWidth;
    }
  }
}
// detects keypress for desktop/laptop devices
document.onkeypress = function(key){
  if(key.code === "Space"){
    // if the game starts, then make the bird fly.
  if(start){
    bird.fly();
  }
  else{ // If the game hasn't start, start it.
    start = true
  }
  if(game_over||!start){ // resst the game if it's game over.
    resetGame()
  }
  }
}


// detects touch for mobile devices
document.addEventListener('touchstart',function(){
  if(start){ 
    bird.fly();
  }else{
    start = true
  }
  if(game_over||!start){
    resetGame()
  }
});
