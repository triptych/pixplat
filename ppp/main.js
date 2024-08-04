import { initGame, gameLoop } from './game.js';
import { loadLevels } from './levels.js';

async function startGame() {
    const levels = await loadLevels();
    initGame(levels);
    gameLoop();
}

startGame();