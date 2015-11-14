function Missile( name, explosion ) {
  
  this.name = name;
  this.x = 80 + Math.random() * 50;
  this.toX = this.x + 300 + Math.random() * 100;

  this.y = 56 + Math.random() * 100;
  this.toY = this.y;

  this.fontsize = 10 + Math.random() * 20;

  this.shadow1 = new createjs.Shadow("#ffffff", 0, 0, 120);
  this.shadow2 = new createjs.Shadow("#808080", 0, 0, 80);
  this.shadow3 = new createjs.Shadow("#f0f0f0", -10, 0, 20);

  this.obj = null;
  this.explosion_obj = explosion;
  this.explosion_obj.x = this.toX - 32 + this.fontsize/2;
  this.explosion_obj.y = this.toY - 39 + this.fontsize;

  this.init();

}

Missile.prototype.init = function() {
  // body...
  this.obj = new createjs.Text();
  this.obj.font = "bold " + this.fontsize +"px sans-serif";
  this.obj.color = "#ffffff";
  this.obj.text = this.name;
  this.obj.x = this.x;
  this.obj.y = this.y;

  // default opacity - 0
  this.obj.alpha = 0;

};

Missile.prototype.sammon = function() {
  var TIME = 400;

  // shadow
  createjs.Tween.get( this ).wait( TIME / 4).call( 
    function() { 
      this.obj.shadow = this.shadow1; 
      this.obj.color = "#ffffff"; 
    }
  );
  
  createjs.Tween.get( this ).wait( TIME / 2 ).call( function() { 
      this.obj.shadow = this.shadow2; 
      this.obj.color = "#808080"; 
    }.bind(this) 
  );

  createjs.Tween.get( this ).wait(TIME).call( function() { 
      this.obj.shadow = null;
      this.obj.color = "#000000"; 
    }.bind(this) 
  );

  // position
  createjs.Tween.get( this.obj ).to({ 'y': this.y - 20 }, TIME/2, createjs.Ease.cubicIn);
  createjs.Tween.get( this.obj ).wait( TIME/2 ).to({ 'y': this.y }, TIME/2, createjs.Ease.cubicOut);
  
  // alpha
  createjs.Tween.get( this.obj ).to({ alpha:1 }, TIME);

  //callback
  createjs.Tween.get( this ).wait( TIME - TIME/3 ).call( this.attack );

};

Missile.prototype.attack = function() {
  var TIME = 800;
  // move
  createjs.Tween.get( this.obj ).to({ 'x': this.toX }, TIME/2, createjs.Ease.getBackIn(1.2) );
  
  // translate
  createjs.Tween.get( this ).wait( TIME / 8 ).call(
    function() {
      this.obj.shadow = this.shadow3;
    }
  );

  // callback
  createjs.Tween.get( this ).wait( TIME / 4 ).call( this.explosion );
}

Missile.prototype.explosion = function() {
  var TIME = 200;
  createjs.Tween.get( this.obj ).to({ alpha: 0 }, TIME );
  stage.addChild( this.explosion_obj );

  createjs.Tween.get( this ).wait( TIME ).call( createMissile );
  createjs.Tween.get( this ).wait( 1200 ).call( this.removeFromStage );

}

Missile.prototype.removeFromStage = function() {
  // body...
  stage.removeChild( this.obj, this.explosion_obj );

};