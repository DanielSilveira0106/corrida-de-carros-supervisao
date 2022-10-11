var canvas;
var backgroundImage, bgImg, car1_img, car2_img, track;
var database, gameState;
var form, player, playerCount;
var allPlayers, car1, car2;
var cars = [];
var obstacles;
var lifeImg , life
var fuelimg , fuels , goldcoinimg , goldcoin , pneuimg , pneu , coneimg , cone
var blast , blastimg
function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1_img = loadImage("assets/car1.png");
  car2_img = loadImage("assets/car2.png");
  track = loadImage("assets/PISTA.png");
  fuelimg = loadImage("./assets/fuel.png");
  goldcoinimg = loadImage("./assets/goldCoin.png");
  pneuimg = loadImage("./assets/obstacle2.png");
  coneimg = loadImage("./assets/obstacle1.png");
  lifeImg = loadImage("./assets/life.png");
  blastimg = loadImage("./assets/blast.png");
  }

 function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
 } 

 function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
