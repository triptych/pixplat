import { initPlayer } from './player.js';
import { initEnemies } from './enemies.js';
import { initCoins } from './coins.js';

let currentLevel = 0;
let levels = [];
let tilesheet = new Image();
tilesheet.src = 'img/tilesheet.png';

export function initLevel(loadedLevels) {
    levels = loadedLevels;
    currentLevel = 0;
}

export function drawLevel(ctx) {
    const currentMap = levels[currentLevel].map;
    for (let y = 0; y < currentMap.length; y++) {
        for (let x = 0; x < currentMap[y].length; x++) {
            if (currentMap[y][x] === 1) {
                ctx.drawImage(tilesheet, 0, 0, 18, 18, x * 18, y * 18, 18, 18);
            } else if (currentMap[y][x] === 2) {
                ctx.fillStyle = 'green';
                ctx.fillRect(x * 18, y * 18, 18, 18);
            }
        }
    }
}

export function getCurrentLevel() {
    return levels[currentLevel];
}

export function goToNextLevel() {
    currentLevel = (currentLevel + 1) % levels.length;
    initPlayer();
    initEnemies(getCurrentLevel().enemies);
    initCoins(getCurrentLevel().coins);
}