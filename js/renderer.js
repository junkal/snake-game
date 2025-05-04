import { CONFIG } from './config.js';

export class Renderer {
    constructor(ctx, assetManager) {
        this.ctx = ctx;
        this.assets = assetManager;
    }

    clear(width, height) {
        if (this.assets.background.complete) {
            this.ctx.drawImage(this.assets.background, 0, 0, width, height);
        } else {
            this.ctx.fillStyle = CONFIG.canvas.backgroundColor;
            this.ctx.fillRect(0, 0, width, height);
        }
    }
    
    drawApple(x, y) {
        const size = CONFIG.grid.tileSize;
        const img = this.assets.apple;

        if (img.complete) {
            this.ctx.drawImage(img, x * size, y * size, size, size);
        } else {
            this.ctx.fillStyle = CONFIG.colors.apple;
            this.ctx.fillRect(x * size, y * size, size - 2, size - 2);
        }
    }

    drawSnake(snake) {
        const size = CONFIG.grid.tileSize;

        snake.body.forEach((segment, index) => {
            const image = index === 0 ? this.assets.snakeHead : this.assets.snakeBody;
            const drawSize = index === 0 ? size * 2 : size;
            const centerX = segment.x * size + size / 2;
            const centerY = segment.y * size + size / 2;

            this.ctx.save();
            this.ctx.translate(centerX, centerY);

            if (index === 0) {
                const angle = snake.getDirectionAngle();
                this.ctx.rotate(angle);
                this.ctx.drawImage(image, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
            } else {
                this.ctx.drawImage(image, -size / 2, -size / 2, size, size);
            }

            this.ctx.restore();
        });
    }

    drawScore(score) {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '16px sans-serif';
        this.ctx.fillText(`Score: ${score}`, 10, 20);
    }

    drawPauseOverlay(canvasWidth, canvasHeight) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '40px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('⏸ Paused ⏸', canvasWidth / 2, canvasHeight / 2);
        this.ctx.font = '18px sans-serif';
        this.ctx.fillText('Press P to unpause the game', canvasWidth / 2, canvasHeight / 2 + 50);
    }

    drawGameOver(canvasWidth, canvasHeight) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 36px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over', canvasWidth / 2, canvasHeight / 2 - 10);

        this.ctx.font = '18px sans-serif';
        this.ctx.fillText('Press any key to restart', canvasWidth / 2, canvasHeight / 2 + 30);
    }
}