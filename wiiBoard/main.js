const { Scene, Game } = require('phaser');

class MainScene extends Scene {
    preload() {
        this.load.image('background', 'assets/images/RhulBackground.jpg');
        this.load.spritesheet('character', 'assets/images/Character.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.add.image(400, 300, 'RhulBackground');
        this.add.sprite(100, 100, 'Character');
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MainScene
};

const game = new Game(config);