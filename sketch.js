var PLAY=1;
var END=0;
var GameState=PLAY;

var purpleguy,Guy_running;
var boy, boy_running, boy4;
var compuestoGroup, c1, c2, c3, c4, c5, c6, c7, c8;
var primosGroup, pr1, pr2, pr3,pr4,pr5,pr6,pr7,pr8; 
var backgroundd, backgroundImg;
var invisible,techo,g1,g2;
var edges;
var gael, gaelimg;
var score = 0;
var gameOver, restart;


function preload(){
  
  Guy_running = loadAnimation("Files/PurpleGuy1.png","Files/PurpleGuy2.png","Files/PurpleGuy3.png","Files/PurpleGuy4.png","Files/PurpleGuy5.png","Files/PurpleGuy6.png","Files/PurpleGuy7.png","Files/PurpleGuy8.png","Files/PurpleGuy9.png","Files/PurpleGuy10.png","Files/PurpleGuy11.png","Files/PurpleGuy12.png","Files/PurpleGuy13.png","Files/PurpleGuy14.png","Files/PurpleGuy15.png","Files/PurpleGuy16.png","Files/PurpleGuy17.png");
  
  boy_running = loadAnimation("boy/boy3.png","boy/boy2.png","boy/boy1.png");
   
  //Números compuestos
  c1 = loadImage("compuestos/100.png");
  c2 = loadImage("compuestos/49.png");
  c3 = loadImage("compuestos/51.png");
  c4 = loadImage("compuestos/65.png");
  c5 = loadImage("compuestos/77.png");
  c6 = loadImage("compuestos/91.png");
  c7 = loadImage("compuestos/94.png");
  c8 = loadImage("compuestos/99.png");
  
  //Numeros primos 
  pr1=loadImage("primos/1.png");
   pr2=loadImage("primos/11.png"); 
   pr3=loadImage("primos/13.png");
   pr4=loadImage("primos/17.png");
   pr5=loadImage("primos/19.png");
   pr6=loadImage("primos/23.png");
   pr7=loadImage("primos/7.png");
   pr8=loadImage("primos/89.png");
  
  gameOverImg= loadImage("GameOver.png");
  restartImg = loadImage("restar.png");
  gaelimg = loadImage("GaEL.jpg");
 
backgroundImg = loadImage("Files/Background.png");
  
}



function setup(){
  
  createCanvas(1000,400);
  
  //fondo
  backgroundd = createSprite(500,200,50,50);
  backgroundd.addImage(backgroundImg);
  backgroundd.x = backgroundd.width/2;
  
  
  //piso invisible
  invisible= createSprite(500,390,1000,20);
  invisible.visible = false;
  
  //Sprite Purple Guy
  purpleguy = createSprite(100,300,20,50);
  purpleguy.addAnimation("running", Guy_running);
  purpleguy.scale = 0.5;
  g1 = createSprite(80,200,30,300);
  g1.visible = false;
  g2 = createSprite(170,150,30,70);
  g2.visible = false;
  
  //Sprite Boy
  boy = createSprite(400,300,20,50);
  boy.addAnimation("running", boy_running);
  boy.scale = 0.2;
  
  gael = createSprite(800,150,20,20);
  gael.addImage(gaelimg);
  gael.scale=0.2;
  
  
  techo=createSprite(500,0,1000,2);
  techo.visible=false;
  
  gameOver = createSprite(500,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.7;
  
  restart = createSprite(500,250);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  
  gameOver.visible = false;
  restart.visible = false;
  
  compuestoGroup = new Group();
  primoGroup = new Group();
  
  edges=createEdgeSprites();
  score = 0;
  count = 0;
}


function draw(){
  
  background(0);  
  
  backgroundd.velocityX = -2;
        
  if( GameState===PLAY) {
    
    gael.visible=false;
    
    backgroundd.velocityX = -(6 + 5*score/5);
    
      
      if (backgroundd.x<0){
          backgroundd.x = backgroundd.width/2;
      }
    
      if(boy.isTouching(primoGroup)) {
          score=score+1;
          primoGroup.destroyEach ();
      }
    
      if(boy.isTouching(g1)||boy.isTouching(g2)||boy.isTouching(compuestoGroup)) {
         GameState = END;
           
      }  
    
  purpleguy.velocityY=purpleguy.velocityY+0.5;
    
  boy.velocityY = boy.velocityY+0.5;
  boy.velocityX = -3;
  
    
  if(keyDown("space")){ 
    boy.velocityY=-10;
  }
  
   if(keyDown("RIGHT_ARROW")){ 
     boy.velocityX = 10;
    }
      
  }
  
   else if (GameState === END) {
     backgroundd.velocityX = 0;
     boy.velocityX = 0;
     boy.y=300;
     boy.x=400;
     
     gameOver.visible = true;
    restart.visible = true;
     
     gael.visible=true;
     
     primoGroup.setVelocityXEach(0);
     compuestoGroup.setVelocityXEach(0);
     
      if(keyDown("SPACE")) {      
      reset();
      
    }
     
   }
  
  purpleguy.collide(edges[3]);
  purpleguy.collide(invisible);
  boy.collide(edges[3]);
  boy.collide(invisible);
  boy.collide(techo);
    
  spawnPrimos();
  spawnCompuestos();
  drawSprites();
  
  
 fill("RED")
 textSize(20);
 text("PUNTAJE: "+score,50,25);
}










function spawnCompuestos() {
  if(frameCount % 40 === 0) {
    var compuesto = createSprite(1100,300,20,30);
    compuesto.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    compuesto.y = Math.round(random(30,300));
    
    compuesto.velocityX = -(10+score/1);
    
    //generate random obstacles
    var rand = Math.round(random(1,8));
    switch(rand) {
      case 1: compuesto.addImage(c1);
              break;
      case 2: compuesto.addImage(c2);
              break;
      case 3: compuesto.addImage(c3);
              break;
      case 4: compuesto.addImage(c4);
              break;
      case 5: compuesto.addImage(c5);
              break;
      case 6: compuesto.addImage(c6);
              break;
      case 7: compuesto.addImage(c7);
              break;
      case 8: compuesto.addImage(c8);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    compuesto.scale = 0.2;
    compuesto.lifetime = 300;
    compuesto.depth = boy.depth;
    boy.depth +=1;
    //add each obstacle to the group
    compuestoGroup.add(compuesto);
  }
}





function spawnPrimos() {
  if(frameCount % 150 === 0) {
    var primo = createSprite(1100,300,20,30);
    primo.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    primo.y = Math.round(random(30,300));
    
    primo.velocityX = -(10+score/1);
    
    //generate random obstacles
    var rand = Math.round(random(1,8));
    switch(rand) {
      case 1: primo.addImage(pr1);
              break;
      case 2: primo.addImage(pr2);
              break;
      case 3: primo.addImage(pr3);
              break;
      case 4: primo.addImage(pr4);
              break;
      case 5: primo.addImage(pr5);
              break;
      case 6: primo.addImage(pr6);
              break;
      case 7: primo.addImage(pr7);
              break;
      case 8: primo.addImage(pr8);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    primo.scale = 0.2;
    primo.lifetime = 300;
   primo.depth = boy.depth;
    boy.depth +=1;
    //add each obstacle to the group
    primoGroup.add(primo);
  }
}

function reset(){
  GameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  primoGroup.destroyEach();
  compuestoGroup.destroyEach();
  

  score = 0;
  
}