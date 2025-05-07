# 🐍 Snake Game – Arcade Classic Reinvented (JavaScript + HTML5)

This version of **Snake Game** is done using **JavaScript + HTML5 Canvas** and is meant to run on a modern browser. The game rule is based on the retro arcade version.

<!-- Centered and Resized Image -->
<p align="center">
  <img width="338" alt="Start-Screen" src="https://github.com/user-attachments/assets/c5bd7267-ffe3-4c36-885c-d24e08a4c72f" />
</p>

---
## Project Structure ##
<pre lang="markdown">
.
├── index.html
├── style.css
├── README.md
├── assets/
│   ├── cover.png
│   ├── favicon.ico
│   ├── snake_head.png
│   ├── apple.png
│   └── sounds/
│       ├── start.ogg
│       ├── eat.ogg
│       ├── gameover.ogg
│       └── background.mp3
└── js/
    ├── main.js
    ├── game.js
    ├── config.js
    ├── snake.js
    ├── apple.js
    ├── renderer.js
    └── assetManager.js
</pre>

---

## 🎮 How to Play ##
The gameplay looks like this

<p align="center">
  <img 
    alt="Gameplay-Screen"
    src="https://github.com/user-attachments/assets/81f21204-7182-4404-b666-1941b2b4baf9"
    style="width: 60%; height: auto;"
  />
</p>

Reach **Target Score** before the timer runs out!
- Use `Arrow Keys` to move
- Press `Enter` to start
- Press `P` to pause/resume
- Eat apples, gain points, beat the timer!

Once the Target Score is achieved and within countdown time, the game will progress to next level with reduced countdown time and higher target score. There are a total of 5 levels.

I've deployed and hosted this game on Github. The link to the game can be found [here](https://junkal.github.io/snake-game/)

---
