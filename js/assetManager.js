export class AssetManager {
    constructor() {
        this.background = this.loadImage('./assets/background.png');
        this.apple = this.loadImage('./assets/apple.png');
        this.snakeHead = this.loadImage('./assets/snake_head.png');
        this.snakeBody = this.loadImage('./assets/snake_body.png');
        this.startSound = this.loadSound('./assets/sounds/start.mp3');
        this.startSound.volume = 1.0;        
        this.background_music = this.loadSound('./assets/sounds/background.mp3');
        this.background_music.volume = 0.5;
        this.eatSound = this.loadSound('./assets/sounds/eat.mp3');
        this.eatSound.volume = 1.0;
        this.gameOverSound = this.loadSound('./assets/sounds/game_over.mp3');
        this.gameOverSound.volume = 1.0;
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }

    loadSound(src, loop = false) {
        const audio = new Audio(src);
        audio.loop = loop;
        return audio;
    }    
}