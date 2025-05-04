import { CONFIG } from './config.js';

const appleImage = new Image();
appleImage.src = './assets/apple.png';

export class Apple {
    constructor() {
        this.x = 5;
        this.y = 5;
    }

    placeRandom() {
        const { tileSize, tileCountX, tileCountY } = CONFIG.grid;
    
        const marginTiles = Math.ceil(50 / tileSize);
    
        const minX = marginTiles;
        const maxX = tileCountX - marginTiles - 1;
    
        const minY = marginTiles;
        const maxY = tileCountY - marginTiles - 1;
    
        this.x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        this.y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    }

    draw(ctx) {
        const size = CONFIG.grid.tileSize;

        if (appleImage.complete) {
            ctx.drawImage(
                appleImage,
                this.x * size,
                this.y * size,
                size,
                size
            );
        } else {
            // fallback if image not yet loaded
            ctx.fillStyle = CONFIG.colors.apple;
            ctx.fillRect(this.x * size, this.y * size, size - 2, size - 2);
        }
    }
}