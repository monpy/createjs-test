$(function(){ 

  init();

});


var stage;
var misiles = [];
var explosion;

function init() {
  console.log( 'init' );
  stage = new createjs.Stage("animation_missile");

  // 
  setExplosion();

  for (var i = 0; i < 12; i++) {
    setTimeout( createMissile, i* 100 + Math.random() * 400 );
  };

  setTicker();
}

function createMissile() {
  var _str = "谷\n藤";
  var misile = new Missile( _str, explosion.clone() );
  stage.addChild( misile.obj );
  misile.sammon();
}

function setExplosion() {
  var explosion_image = {
    images: ["explosions.png"],
    frames: {width: 64, height: 78},
    animations: {
      explode: [0, 16, 'off'],
      off: [16, 16 ]
    }
  }
  var explosion_sheet = new createjs.SpriteSheet( explosion_image );
  explosion = new createjs.Sprite( explosion_sheet, "explode");
}

function setTicker() {
  createjs.Ticker.setFPS(22);
  createjs.Ticker.addEventListener('tick', onTick);
}


function onTick() {
  stage.update();
}