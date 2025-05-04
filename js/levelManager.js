import { CONFIG } from './config.js';

export class LevelManager {
    constructor() {
        this.level = 1;
        this.timeLimit = CONFIG.timeLimit;
        this.targetScore = CONFIG.targetScore;
        this.maxLevel = CONFIG.maxlevel;
    }

    getCurrentLevel(){
        return this.level;
    }

    getCurrentTimeLimit(){
        return this.timeLimit
    }

    getCurrentTargetScore(){
        return this.targetScore
    }

    getMaxLevel(){
        return this.maxLevel
    }

    advanceLevel() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.timeLimit = Math.max(30, this.timeLimit - (this.level - 1) * 10);
            this.targetScore = 10 + (this.level - 1) * 50;
        }
    }

    isFinalLevel() {
        return this.level === this.maxLevel;
    }
}