
  var accuracy,accuFI,AFC=0;
  var health=1;
  var healthFI,healthBar;
  var dif, highScore, score=0;
  var gameState=0;
  var player, ground, SW;
  var laser, LA;
  var fireGroup;
  var laserImg, fireImg;
  var lw=1,bs

  function preload() {
    fireImg = loadImage("fb.png");
    laserImg = loadImage("Laser.png");
  }
function setup() {
  createCanvas(700,700);

  player=createSprite(width/2,height-71,20,50);
  laser = createSprite(width/2,0,1,1400);
  ground = createSprite(width/2,height-20,width,40);
  SW = createSprite(510,height/2,10,height);
  RW = createSprite(0,height/2,10,height);
  healthBar = createSprite(600,40,100,10)
  fireGroup=new Group();

  laserImg.resize(1,1400);
  laser.addImage(laserImg);
  

  highScore=0;
  LA=100;
}

function draw() {
  
  if(gameState===0){

  dif=10000/frameCount;
  if(highScore<score){
    highScore=score
  }

  LA=LA-0.01
  AFC=AFC+1

  if(LA<1){
  LA=10
  }



  accuracy=AFC*0.05;
  accuFI=100-accuracy;
  //console.log(accuFI)

  score = score+0.1;
  //console.log(Math.round(score));

  //if(frameCount%dif<0.5&&frameCount%dif>-0.5){
  //  laser.x=player.x
  //}
  if(player.x+10>laser.x){
    laser.x=laser.x+3;
  } 
  if(player.x-10<laser.x) {
    laser.x=laser.x-3;
  } 
  

  if(frameCount%Math.round(LA)===0){
    lw=20;
  }

  if(keyDown(RIGHT_ARROW)){
    player.velocityX=10;
  } else if(keyDown(LEFT_ARROW)){
    player.velocityX=-10;
  } else {
    player.velocityX=0;
  }
  
  if(keyDown(UP_ARROW)&&player.y>500){
    player.velocityY=-10;
  }

  //console.log(player.y);
  if(player.isTouching(SW)){
    player.x=SW.x-15;
  }
  if(player.isTouching(RW)){
    player.x=RW.x+15;
  }

  
  
  
  if(laser.isTouching(player)&&laser.width>1){
    health=health+frameCount/1000;
    healthFI=100-health;
    console.log("health "+Math.round(health));
  }



  if(fireGroup.isTouching(player)){
    health=health+frameCount/1000;
    healthFI=100-health;
    console.log("health "+Math.round(health));
  }
  if(health>=100){
    //player.destroy();
    gameState=1;
  }
  if(frameCount%dif<1&&frameCount%dif>-1){
    fire=createSprite(width/2,0,10,40);
    fire.x=Math.round(player.x+random(accuFI*-2,accuFI*2));
    //fireImg.resize(frameCount/500,frameCount/500);
    fire.addImage(fireImg);
    fire.scale=0.1
    fire.velocityY=20;
    player.depth=fire.depth
    player.depth+=1;
    fire.lifetime=2000;
    fireGroup.add(fire)
  } else if(gameState===1){
    console.log("oof");
    player.velocityY=0;
    text("Press R to restart",width/2,height/2);
    if(keyDown("r")){
      gameState=0;
      health=1;
      score=0;
      frameCount=0;
      AFC=0;
      player.x=width/2;
      fireGroup.destroyEach();
      LA=100
      
    }
  }

  if(lw>1){
    lw=lw-1;
    laser.width=lw;
    //lw=laser.width;
    laserImg.resize(lw,1400);
    console.log(lw);
  }

  if(accuFI<10){
    AFC=1900
  }

  //if(keyDown("l")){
  //  AFC=AFC+1800;
  //  frameCount=frameCount+1800;
  //}
}
if(player.isTouching(ground)){
  player.velocityY=0;
  player.y=ground.y-46;
}else{
  player.velocityY=player.velocityY+0.8;
}
  background(200,200,200);
  drawSprites();

  text("Score: "+Math.round(score),550,60);
  //text("Health: "+healthFI+"%",600,40);
  healthBar.width=healthFI;
  text("High Score: "+Math.round(highScore),550,20);
}
