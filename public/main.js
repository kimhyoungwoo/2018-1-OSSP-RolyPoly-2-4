window.onload = function(){
    var config = {
        type: Phaser.AUTO,
        width: 720,
        height: 1280,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        backgroundColor: '#222222',
        scene: {
            preload: preload,
            create: create
        }
    };
    var game = new Phaser.Game(config);
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
}



function preload ()
{

    this.load.image('logo', './assets/Logo.png');
    this.load.atlas('flares', '../assets/flares.png', '../assets/flares.json');
}

function create ()
{

    var particles = this.add.particles('flares');

    var emitter = particles.createEmitter({
        frame: { frames: [ 'red', 'blue', 'green', 'yellow' ], cycle: true },
        speed: 250,
        lifespan : 2000,
        scale: { start: 1, end: 0 },
        quantity : 2,
        blendMode: 'ADD'
    });
    particles.createGravityWell({
          x: 360,
          y: 640,
          power: 4,
          epsilon: 100,
          gravity: 50
    });

    var logo = this.physics.add.image(400, 100, 'logo').setScale(2);

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}

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