var game;
var gameConfig;
window.onload = function(){
    gameConfig = {
        type: Phaser.CANVAS,
        width: 720,
        height: 1280,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        backgroundColor: '#222222',
        parent: 'phaser-example',
        scene: [game_Scene]
    };
    game = new Phaser.Game(gameConfig);
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);


}

var player;
var alive = true;
var bomb;
var cursors;
var player_pos = 1.57;
var player_speed = 0.05;

var score = 0;
var stage = 1;
var text_score;
var text_stage;

var bomb_pos = 3;
var bomb_speed = 0.03;

var emitter;
var emitter1;
var particles;
var particles1;
var deathZone;
var graphics;

var others = {
    id : {},
    player : {},
    isMove : {},
    pos : {}
};

class playGame extends Phaser.Scene
{
    constructor(){  super("PlayGame");  }

    preload ()
    {
        this.load.spritesheet('balls', '../assets/balls.png', { frameWidth: 17, frameHeight: 17 });
        this.load.image('bomb', '../assets/bomb.png');
        this.load.image('button_L','../assets/Lbutton.png');
        this.load.image('button_L_active','../assets/Lbutton_active.png');
        this.load.image('button_R','../assets/Rbutton.png');
        this.load.image('button_R_active','../assets/Rbutton_active.png');
        this.load.atlas('flares', '../assets/flares.png', '../assets/flares.json');
        this.load.spritesheet('explode', '../assets/explode.png',  { frameWidth: 128, frameHeight: 128 });
          this.load.json('enemy0', '../assets/enemy/enemy0.json');
          this.load.json('enemy1', '../assets/enemy/enemy1.json');
          this.load.json('enemy2', '../assets/enemy/enemy2.json');
          this.load.json('enemy3', '../assets/enemy/enemy3.json');
          this.load.json('enemy4', '../assets/enemy/enemy4.json');
          this.load.json('enemy5', '../assets/enemy/enemy5.json');
          this.load.json('enemy6', '../assets/enemy/enemy6.json');
          this.load.json('enemy7', '../assets/enemy/enemy7.json');
          this.load.json('enemy8', '../assets/enemy/enemy8.json');
          this.load.json('enemy9', '../assets/enemy/enemy9.json');
          this.load.json('enemy10', '../assets/enemy/enemy10.json');
          this.load.json('enemy11', '../assets/enemy/enemy11.json');
          this.load.json('enemy12', '../assets/enemy/enemy12.json');
    }

    create ()
    {
        text_stage = this.add.text(50, 50, 'STAGE : 1', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });
        text_score = this.add.text(50, 100, 'SCORE : 0', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        player = this.physics.add.image(game.config.width/2, game.config.height/2 + 250, 'balls', Phaser.Math.Between(0,5)).setActive();
        bomb = this.physics.add.image(game.config.width/2, game.config.height / 2, 'bomb').setActive().setScale(3);
        this.physics.add.collider(player, bomb, this.death, null, this);
        deathZone = {
            contains : function(x, y){
                var hit = player.body.hitTest(x,y);
                if(hit)
                {
                    game_Scene.death();
                    //game END
                }
                return hit;
            }
        }

        particles = this.add.particles('flares');
        particles1 = this.add.particles('flares');
        emitter = particles.createEmitter(this.cache.json.get('enemy1'));
        emitter.setDeathZone({ type: 'onEnter', source: deathZone });

        var button_L_origin = this.add.image(game.config.width/5 ,game.config.height / 8 * 7,'button_L').setScale(0.3);
        var button_L_active = this.add.image(game.config.width/5 ,game.config.height / 8 * 7,'button_L_active').setScale(0.3); button_L_active.visible = false;
        var button_R_origin = this.add.image(game.config.width/5 * 4 ,game.config.height / 8 * 7,'button_R').setScale(0.3);
        var button_R_active = this.add.image(game.config.width/5 * 4 ,game.config.height / 8 * 7,'button_R_active').setScale(0.3); button_R_active.visible = false;

        cursors = game.input.keyboard.createCursorKeys();

        this.input.on('pointerdown', function (pointer) {
            if(pointer.x < game.config.width/2)
            {
                button_L_active.visible = true;
            }
            else
            {
                button_R_active.visible = true;
            }
        }, this);

        this.input.on('pointerup', function (pointer) {
            button_L_active.visible = button_R_active.visible =false;

        }, this);
        this.input.keyboard.on('keydown_LEFT', function(event){
            button_L_active.visible = true;

        }, this);
        this.input.keyboard.on('keyup_LEFT', function(event){
            button_L_active.visible = false;

        }, this);
        this.input.keyboard.on('keydown_RIGHT', function(event){
            button_R_active.visible = true;

        }, this);
        this.input.keyboard.on('keyup_RIGHT', function(event){
            button_R_active.visible = false;

        }, this);
    }

    update ()
    {
         if(game.input.activePointer.isDown)
    {
      if(game.input.activePointer.x < game.config.width/2)
          player_pos += player_speed;
      else
          player_pos -= player_speed;
    }

     if (cursors.right.isDown)
     {
        player_pos -= player_speed;
     }
     else if(cursors.left.isDown)
     {
        player_pos += player_speed;
     }
     player.x = game.config.width /2 + Math.cos(player_pos) * 250;
     player.y = game.config.height/2 + Math.sin(player_pos) * 250;

     bomb_pos += bomb_speed;
     bomb.x = game.config.width/2+ Math.cos(2.2*bomb_pos) * 200 ;
     bomb.y = game.config.height/2 + Math.sin(-1.3*bomb_pos) * 400 ;

     for(var i in others.id)
     {
         if(others.isMove[i] != 0)
         {
            others.pos[i] += (others.isMove[i] * player_speed);
             others.player[i].x = game.config.width /2 + Math.cos(others.pos[i]) * 250;
             others.player[i].y = game.config.height/2 + Math.sin(others.pos[i]) * 250;
         }
    }

 
      ++score;

    if(score % 10 == 0 && alive)
      text_score.setText('SCORE : '+score);
    if(score % 1000 == 0 && alive)
       text_stage.setText('STAGE : '+ (++stage));


     if(((score-400) % 500) == 0)
     {
       particles.destroy();
     }
     if((score % 500) == 0)
     {
        particles = this.add.particles('flares');
        emitter = particles.createEmitter(this.cache.json.get('enemy'+((score / 500)+1)));
        emitter.setDeathZone({ type: 'onEnter', source: deathZone });
     }
     if(score == 1700)
     {
         emitter1 = particles1.createEmitter(this.cache.json.get('enemy0'));
         emitter1.setDeathZone({ type: 'onEnter', source: deathZone });
     }
     if((score + 300)%1000 == 0)
     {
          particles.createGravityWell({
          x: 360,
          y: 640,
          power: 4,
          epsilon: 100,
          gravity: 50
        });
     }
     if(score > 7000 && alive)
     {
      this.death();
    }
    }
    checkOverlap(_enemy)
    {
        var boundsB = _enemy.getBounds();
        return Phaser.Geom.Rectangle.Overlaps(deathZone, boundsB);
    }
  death()    
  {
    //this.scene.pause();    
    var explode = this.add.sprite(player.x, player.y, 'explode').setScale(2);
    this.anims.create({
        key: 'die',
        frames: this.anims.generateFrameNumbers('explode', { start: 0, end: 15 }),
        frameRate: 25,
        repeat: 0
    });
    explode.anims.play('die', false);
    deathZone.contains = function() {  return false; }

    player.destroy();
    alive = false;

    game.input.enabled = false;
    game.input.keyboard.enabled = false;
    
     gameOver();
   //
  }
}

var game_Scene = new playGame();

// pure javascript to scale the game
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = 720 / 1280;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

function gameOver(){
    document.getElementById("gameResult").style.transform = 'translateY(40vh)';
    document.getElementById("gameResult").textContent = "Score \r\n"+score;
    document.getElementById("Return").style.transform = 'translateY(60vh)';
}