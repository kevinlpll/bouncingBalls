//setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

//function to generate random number in a specified range(min,max)

function random(min,max){
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
class Shape{
  constructor(x,y,velX,velY,exists){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = true;

  }

}


class Ball extends Shape{
  constructor(x,y,velX,velY,exists,color,size){
    super(x,y,velX,velY,exists);
    this.color = color;
    this.size = size;
  }
  //define ball draw method
    draw(){
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x,this.y,this.size, 0,  2 * Math.PI);
      ctx.fill();
    }
    colisionDetect(){
      for (var i = 0; i < balls.length; i++) {
        if (!(this===balls[i])) {
          var dx = this.x - balls[i].x;
          var dy = this.y - balls[i].y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < this.size + balls[i].size) {
            balls[i].color = this.color = `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
            balls[i].velX *= -1;
            balls[i].velY *= -1;
            this.velX *= -1;
            this.velY *= -1;
          }
        }
      }
    }
    //define ball update method
    update(){

      if ((this.x + this.size)>=width || (this.x - this.size)<=0) {
        this.velX *= -1;
      }
      if ((this.y + this.size)>=height || (this.y - this.size)<=0 ) {
        this.velY *= -1;
      }

      this.x += this.velX;
      this.y += this.velY;
    }

  }

class EvilCircle extends Shape{
  constructor(x,y,velX,velY,exists){
    super(x,y,20,20,exists);
    this.velX = 20;
    this.velY = 20;
    this.color = 'white';
    this.size = 10;
  }

  draw(){
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x,this.y,this.size, 0,  2 * Math.PI);
    ctx.stroke();
  }
  checkBounds(){
    if ((this.x + this.size)>=width || (this.x - this.size)<=0) {
      // this.velX *= -1;
    }
    if ((this.y + this.size)>=height || (this.y - this.size)<=0 ) {
      // this.velY *= -1;
    }
  }
  setControls(){
    var _this = this;
    window.onkeydown = function(e){
      //Left arrow key
      if(e.keyCode === 65){
        _this.x -= this.velX;
        //Right arrow key
      }else if (e.keyCode === 68) {
        _this.x += this.velX;
        //up arrow key
      }else if (e.keyCode === 87){
        _this.y -= _this.velY;
        //down arrow key
      }else if (e.keyCode ===83) {
        _this.y += _this.velY;
      }
    }
  }
  colisionDetect(){
    for (var i = 0; i < balls.length; i++) {
      if (balls[i].exists === true) {
        var dx = this.x - balls[i].x;
        var dy = this.y - balls[i].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + balls[i].size) {
          balls[i].exists = false;
        }
      }
    }
  }
}
  var balls = [];

  //define loop that keep drawing the scene constantly

  function loop(){
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width,height);

    while(balls.length < 26 ) {
      var size = random(10,20);
      var ball = new Ball(
        //balls positions always drawn at least one ball width
        //away from the edge of canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-10,10),
        random(-10,10),
        true,
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
      );
      balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].colisionDetect();
    }

    requestAnimationFrame(loop);
  }

  loop();
