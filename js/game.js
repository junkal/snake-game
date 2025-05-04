import { CONFIG } from './config.js';
import { Snake } from './snake.js';
import { Apple } from './apple.js';
import { AssetManager } from './assetManager.js';
import { Renderer } from './renderer.js';
import { LevelManager } from './levelManager.js';

const GAME_STATE = {
    START: 'start',
    RUNNING: 'running',
    PAUSED: 'paused',
    GAME_OVER: 'game_over',
    LEVEL_CLEARED: 'level_cleared'
};

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        const tileSize = CONFIG.grid.tileSize;
        const tileCountX = CONFIG.grid.tileCountX;
        const tileCountY = CONFIG.grid.tileCountY;
        this.canvas.width = tileSize * tileCountX;
        this.canvas.height = tileSize * tileCountY;
        this.assets = new AssetManager();
        this.renderer = new Renderer(this.ctx, this.assets);
        this.levelManager = new LevelManager();
        this.state = GAME_STATE.START;
        this.init();
        this.handleInput();
    }

    init() {
        const midX = Math.floor(CONFIG.grid.tileCountX / 2);
        const midY = Math.floor(CONFIG.grid.tileCountY / 2);

        this.snake = new Snake(midX, midY);
        this.apple = new Apple();
        this.apple.placeRandom();
        this.score = 0;
        this.win = false;

        // restart the timer and level-specific settings
        this.timeLimit = this.levelManager.getCurrentTimeLimit();
        this.remainingTime = this.timeLimit;
        this.targetScore = this.levelManager.targetScore;
        this.lastUpdateTime = Date.now();

        this.state = GAME_STATE.RUNNING;
    }

    handleInput() {
        document.addEventListener("keydown", e => {
            if (this.state === GAME_STATE.GAME_OVER) {
                this.reset();
                return;
            }
            // if pause key
            if (e.key === 'p' || e.key === 'P') {
                if (this.state === GAME_STATE.RUNNING) {
                    this.state = GAME_STATE.PAUSED;
                } else if (this.state === GAME_STATE.PAUSED) {
                    this.state = GAME_STATE.RUNNING;
                }
                return;
            }

            // if level cleared and ENTER key
            if (this.state === GAME_STATE.LEVEL_CLEARED && e.key === 'Enter') {
                this.levelManager.advanceLevel();
                this.init();
                return;
            }

            // if arrow keys
            if (this.state === GAME_STATE.RUNNING){
                switch (e.key) {
                    case "ArrowUp":
                        this.snake.setDirection({ x: 0, y: -1 });
                        break;
                    case "ArrowDown":
                        this.snake.setDirection({ x: 0, y: 1 });
                        break;
                    case "ArrowLeft":
                        this.snake.setDirection({ x: -1, y: 0 });
                        break;
                    case "ArrowRight":
                        this.snake.setDirection({ x: 1, y: 0 });
                        break;
                }
            }
        });
    }

    update() {
        if (this.state !== GAME_STATE.RUNNING) return;

        const now = Date.now();
        const delta = (now - this.lastUpdateTime) / 1000;
        this.remainingTime -= delta;
        this.lastUpdateTime = now;

        if (this.remainingTime <= 0 && this.score < this.targetScore) {
            this.state = GAME_STATE.GAME_OVER;
            this.assets.gameOverSound.play();
            return;
        }

        if (this.score >= this.targetScore) {
            if (this.levelManager.isFinalLevel()) {
                this.state = GAME_STATE.GAME_OVER;
                this.win = true;
                return;
            } else {
                this.state = GAME_STATE.LEVEL_CLEARED;
            }

            return;
        }

        if (this.state === GAME_STATE.GAME_OVER || (this.snake.direction.x === 0 && this.snake.direction.y === 0)) return;

        const head = this.snake.move();

        if (head.x === this.apple.x && head.y === this.apple.y) {
            this.assets.eatSound.currentTime = 0;
            this.assets.eatSound.play();
            this.score += 10;
            this.apple.placeRandom();
        } else {
            this.snake.removeTail();
        }

        if (this.isGameOver()) {
            this.state = GAME_STATE.GAME_OVER;
            this.assets.gameOverSound.play();
        }
    }

    draw() {
        this.renderer.clear(this.canvas.width, this.canvas.height);
        this.renderer.drawSnake(this.snake);
        this.renderer.drawApple(this.apple.x, this.apple.y);
    
        document.getElementById("levelDisplay").textContent =`Level: ${this.levelManager.level}`;
        document.getElementById("scoreDisplay").textContent = `Score: ${this.score}`;
        document.getElementById("timerDisplay").textContent = `Time Left: ${Math.ceil(this.remainingTime)}s`;
        document.getElementById("targetDisplay").textContent = `Target Score: ${this.targetScore}`;

        if (this.state === GAME_STATE.GAME_OVER) {
            if (this.win) {
                this.renderer.drawWinScreen(this.canvas.width, this.canvas.height);
                return;
            }
            this.renderer.drawGameOver(this.canvas.width, this.canvas.height);
        }

        if (this.state === GAME_STATE.LEVEL_CLEARED) {
            this.renderer.drawLevelClearScreen(this.canvas.width, this.canvas.height, this.levelManager.level);
        }

        if (this.state === GAME_STATE.PAUSED) {
            this.renderer.drawPauseOverlay(this.canvas.width, this.canvas.height);
        }
    }

    isGameOver() {
        const head = this.snake.body[0];
        const { tileCountX, tileCountY } = CONFIG.grid;

        const hitWall =
            head.x < 0 || head.x >= tileCountX ||
            head.y < 0 || head.y >= tileCountY;

        return hitWall || this.snake.checkSelfCollision();
    }

    reset() {
        this.init();
    }
}