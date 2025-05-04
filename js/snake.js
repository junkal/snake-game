import { CONFIG } from './config.js';

export class Snake {
    constructor(startX, startY) {
        this.body = [{ x: startX, y: startY }];
        this.direction = { x: 0, y: 0 };
    }

    setDirection(newDir) {
        if ((newDir.x !== -this.direction.x) || (newDir.y !== -this.direction.y)) {
            this.direction = newDir;
        }
    }

    move() {
        const head = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };
        this.body.unshift(head);
        return head;
    }

    removeTail() {
        this.body.pop();
    }

    checkSelfCollision() {
        const [head, ...rest] = this.body;
        return rest.some(segment => segment.x === head.x && segment.y === head.y);
    }

    reset(startX, startY) {
        this.body = [{ x: startX, y: startY }];
        this.direction = { x: 0, y: 0 };
    }

    getDirectionAngle() {
        const dir = this.direction;
        if (dir.x === 0 && dir.y === -1) return Math.PI; // Up
        if (dir.x === 0 && dir.y === 1) return 0;   // Down
        if (dir.x === -1 && dir.y === 0) return Math.PI/2; // Left
        return -Math.PI/2; // Right (default)
    }
}
