function init() {
  var stage = new createjs.Stage("demoCanvas")
  //var background = new createjs.Bitmap("fractal.jpg")
  //stage.addChild(background);
  var circle = new createjs.Shape();
  circle.graphics.beginFill("red").drawCircle(0,0,50);
  circle.x = 100;
  circle.y = 100;
  stage.addChild(circle);
  createjs.Ticker.addEventListener("tick", tick);
  createjs.Ticker.setFPS(60);
  pressed = {};
  bullets = [];

// set key handling
// in the future we may want to store the time the key was pressed so we can do increasing effects
  document.onkeydown = function(e){pressed[e.keyCode]=true;}
  document.onkeyup= function(e){ delete pressed[e.keyCode];}

  bulletCounter=0;
  function tick() {
    if (pressed[37]) {circle.x=circle.x-3};
    if (pressed[39]) {circle.x=circle.x+3};
    if (pressed[38]) {circle.y=circle.y-3};
    if (pressed[40]) {circle.y=circle.y+3};
    if (circle.x >stage.canvas.width+50) {circle.x=-50;}
    if (circle.x <-50) {circle.x=stage.canvas.width+50;}
    if (circle.y >stage.canvas.height+50) {circle.y=-50;}
    if (circle.y <-50) {circle.y=stage.canvas.height+50;}
    bulletCounter=(bulletCounter+1)%10;
    if (bulletCounter==0) {
      newBullet=new createjs.Shape();
      newBullet.graphics.beginFill("green").drawCircle(0,0,5);
      newBullet.x=circle.x;
      newBullet.y=circle.y;
      stage.addChild(newBullet);
      bullets.push(newBullet);
    }
    for (var i=bullets.length-1; i>=0; i--){
      var bullet=bullets[i];
      if (bullet.x<0) {
        stage.removeChild(bullet);
        delete bullet;
        bullets.splice(i,1);
      }
      else {
        bullet.x=bullet.x-7;
      }
    }
    //console.log(pressed)
    stage.update();
  }
  stage.update();
}