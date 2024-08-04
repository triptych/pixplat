import { getCurrentLevel } from './level.js';

export function checkCollision(x, y) {
    const currentMap = getCurrentLevel().map;
    const tileX = Math.floor(x / 18);
    const tileY = Math.floor(y / 18);
    return currentMap[tileY] && currentMap[tileY][tileX] === 1;
}