import { getPlayer } from './player.js';
import { updateScore } from './ui.js';
import { playSound } from './sound.js';

const COIN_SIZE = 18;

let coins = [];

export function initCoins(levelCoins) {
    coins = levelCoins.map(c => ({
        ...c,
        width: COIN_SIZE,
        height: COIN_SIZE,
        isCollected: false
    }));
}

export function updateCoins() {
    const player = getPlayer();
    coins.forEach(coin => {
        if (!coin.isCollected && 
            player.x < coin.x + coin.width &&
            player.x + player.width > coin.x &&
            player.y < coin.y + coin.height &&
            player.y + player.height > coin.y) {
            coin.isCollected = true;
            updateScore(10);
            playSound('coin');

        }
    });
}

export function drawCoins(ctx) {
    coins.forEach(coin => {
        if (!coin.isCollected) {
            ctx.fillStyle = 'gold';
            ctx.beginPath();
            ctx.arc(coin.x + COIN_SIZE / 2, coin.y + COIN_SIZE / 2, COIN_SIZE / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}