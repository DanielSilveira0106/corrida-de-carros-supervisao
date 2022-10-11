class Game {
  constructor() {
   this.resetTitle = createElement("h2");
   this.resetButton = createButton("");
   this.leadeboardTitle = createElement("h2");
   this.leader1 = createElement("h2");
   this.leader2 = createElement("h2");
   this.playerMoving = false;
   this.leftKeyActive = false;
   this.blast = false;
  }
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
  database.ref("/").update({
  gameState:state  
  })



  }
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 50);
     car1.addImage("car1", car1_img);
      car1.addImage("blast",blastimg);
      car1.scale = 0.07;
       car2 = createSprite(width / 2 + 100, height - 50);
       car2.addImage("car2", car2_img);
       car2.addImage("blast",blastimg);
        car2.scale = 0.07;
         cars = [car1, car2];
   
         fuels = new Group();
         goldcoin = new Group();   
         obstacles = new Group();

         var obstaclesPositions = [ { x: width / 2 + 250, y: height - 800, image: pneuimg },
          { x: width / 2 - 150, y: height - 1300, image: coneimg },
           { x: width / 2 + 250, y: height - 1800, image: coneimg },
            { x: width / 2 - 180, y: height - 2300, image: pneuimg },
             { x: width / 2, y: height - 2800, image: pneuimg },
              { x: width / 2 - 180, y: height - 3300, image: coneimg },
               { x: width / 2 + 180, y: height - 3300, image: pneuimg },
                { x: width / 2 + 250, y: height - 3800, image: pneuimg },
                 { x: width / 2 - 150, y: height - 4300, image: coneimg },
                  { x: width / 2 + 250, y: height - 4800, image: pneuimg },
                   { x: width / 2, y: height - 5300, image: coneimg },
                    { x: width / 2 - 180, y: height - 5500, image: pneuimg } ];
        
                    this.addSprites(fuels,4,fuelimg,0.02);
         this.addSprites(goldcoin,18,goldcoinimg,0.09);
         this.addSprites(obstacles,obstaclesPositions.length,coneimg,0.04,obstaclesPositions)
        
         
        }

   handleElements() {
           form.hide();
           form.titleImg.position(40, 50);
           form.titleImg.class("gameTitleAfterEffect");

           this.resetTitle.html("Reiniciar Jogo");
           this.resetTitle.class("resetText");
           this.resetTitle.position(width / 2 + 200, 40);
           this.resetButton.class("resetButton");
           this.resetButton.position(width / 2 + 230, 100);

           this.leadeboardTitle.html("Placar");
           this.leadeboardTitle.class("resetText");
           this.leadeboardTitle.position(width / 3 - 60, 40);
           this.leader1.class("leadersText");
           this.leader1.position(width / 3 - 50, 80);
           this.leader2.class("leadersText");
           this.leader2.position(width / 3 - 50, 130);
   }
 
    play() {
    this.handleElements();
    this.handleResetButton();
    player.getcarsAtEnd();
    Player.getPlayersInfo();
    if(allPlayers !== undefined) {
    image(track,0,-height*5,width,height*6);
  
    this.showLeaderBoard();
    this.showLife();
    
    var index = 0;
    for(var plr in allPlayers) {
    index = index+1;
    var x = allPlayers[plr].positionX;
    var y = height - allPlayers[plr].positionY;
    var currentLife = allPlayers[plr].life;
    if(currentLife<=0) {
    cars[index-1].changeImage("blast");
    cars[index-1].scale = 0.3;
    }   
    cars[index-1].position.x = x;
    cars[index-1].position.y = y;
    
    




    
    
    if (index===player.index)  {
    stroke(10);
    fill("red");
    ellipse(x,y,60,60);
    this.handlePowerCoins(index);
    this.handlefuel(index);
    this.handleObstacleCollision(index);
    this.handleCarACollisionWithCarB(index);
    if (player.life<=0) {
    this.blast = true;
    this.playerMoving = false;
                               }

    camera.position.x = cars[index-1].position.x;
    camera.position.y = cars[index-1].position.y;

    
  
   };
    

    };
    this.handlePlayerControls();
    const finishLine = height*6-100;
    if (player.positionY > finishLine) {
    gameState = 2;
    player.rank +=1;
    Player.updateCarsAtEnd(player.rank);
    player.update();
    this.showRank();
    


    }
    drawSprites();
    }
     


    }
  
  handlePlayerControls()  {
  if (!this.blast) { 
  if (keyIsDown(UP_ARROW)) {
  player.positionY +=10;
  player.update();
  this.playerMoving = true;
 
  }
  if(keyIsDown(LEFT_ARROW)&& player.positionX>width/3-50) {
  player.positionX -=5;
  player.update();
  this.leftKeyActive = true;
  }
  if(keyIsDown(RIGHT_ARROW)&&player.positionX<width/2+300 ) {
  player.positionX +=5;
  player.update();
  this.leftKeyActive = false;
  }
  }
  }
showLeaderBoard() {

    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
        // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
        leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

        leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }



handleResetButton()  {
this.resetButton.mousePressed(()=>{
database.ref("/").set({
  playerCount:0,
  gameState:0,
  players:{},
  carsAtEnd:0,  
});
window.location.reload;


})


}


addSprites(spriteGroup,numberOfSprites,spriteImage,scale,positions = []) {
 for (var i = 0;i<numberOfSprites;i++) {
 var x , y;
 x = random(width/2+150,width/2-150);
 y = random(-height*4.5,height-400);
 if(positions.length>0) {
 x = positions[i].x;
 y = positions[i].y;
 spriteImage = positions[i].image;
} else {

var sprite = createSprite(x,y);
 sprite.addImage("sprite",spriteImage);
 sprite.scale = scale;
 spriteGroup.add(sprite); 
 
}
 }



}
handlefuel(index) {
  cars[index - 1].overlap(fuels, function (collector, collected)
   { player.fuel = 185; collected.remove(); });
    if (player.fuel > 0 && this.playerMoving) { player.fuel -= 0.3;}
     if (player.fuel <= 0) { gameState = 2; this.gameOver(); }
}
handlePowerCoins(index) { cars[index - 1].overlap(goldcoin,
   function (collector, collected) { player.score += 21;
     player.update();
     collected.remove(); }); }


     showRank()  {
     swal({
      title: `Incrível!${"\n"}Rank${"\n"}${player.rank}`,
       text: "Você alcançou a linha de chegada com sucesso!",
        imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
         imageSize: "100x100",
          confirmButtonText: "Ok"

     })}
     showLife() {
      push();
       image(lifeImg, width / 2 - 130, height - player.positionY - 200, 20, 20);
        fill("white"); 
        rect(width / 2 - 100, height - player.positionY - 200, 185, 20);
         fill("#f50057");
          rect(width / 2 - 100, height - player.positionY - 200, player.life, 20);
          noStroke(); 
          pop();
}
     showFuelBar() {
      push();
       image(fuelImage, width / 2 - 130, height - player.positionY - 100, 20, 20);
        fill("white");
         rect(width / 2 - 100, height - player.positionY - 100, 185, 20);
          fill("#ffc400");
           rect(width / 2 - 100, height - player.positionY - 100, player.fuel, 20);
            noStroke();
             pop();
              }
      
    
     handleObstacleCollision(index) {
      if(cars[index-1].collide(obstacles)){
         if (this.leftKeyActive) {//novo 
          player.positionX += 100; } else { player.positionX -= 100;
         } 
         if (player.life > 0) { player.life -= 185/4; }
          player.update(); }
                      }
                      handleCarACollisionWithCarB(index) {
                        if (index === 1) {
                          if (cars[index - 1].collide(cars[1])) {
                            if (this.leftKeyActive) {
                              player.positionX += 100;
                            } else {
                              player.positionX -= 100;
                            }
                    
                            //Reduzindo a vida do jogador
                            if (player.life > 0) {
                              player.life -= 185 / 4;
                            }
                    
                            player.update();
                          }
                        }
                        if (index === 2) {
                          if (cars[index - 1].collide(cars[0])) {
                           if (this.leftKeyActive) {
                              player.positionX += 100;
                            } else {
                              player.positionX -= 100;
                            }
                    
                            //Reduzindo a vida do jogador
                            if (player.life > 0) {
                              player.life -= 185 / 4;
                            }
                    
                            player.update();
                          }
                        }
                      }
                      gameOver() {
                        swal({
                          title: `Fim de Jogo`,
                          text: "Oops você perdeu a corrida!",
                          imageUrl:
                            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
                          imageSize: "100x100",
                          confirmButtonText: "Obrigado por jogar"
                        });
                      }
                      
                      end() {
                        console.log("Fim de Jogo");
                      }
                    }
                    
                    
                    
                    
                    
                    
                    
                    
                    