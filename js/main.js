import { Game } from './game.js';
import { CONFIG } from './config.js';

const game = new Game("gameCanvas");

document.getElementById("timerDisplay").textContent = `Time Left: ${CONFIG.timeLimit}s`;

let gameStarted = false;
let gameInterval = null;

function startGame() {
    document.getElementById("startScreen").style.display = "none";
    game.assets.startSound.play();
    game.assets.background_music.play();

    gameInterval = setInterval(() => {
        game.update();
        game.draw();
    }, CONFIG.game.tickRate);
    gameStarted = true;
}

window.addEventListener("keydown", (e) => {
    if (!gameStarted && e.key === "Enter") {
        startGame();
    }
});