import { drawBackground } from './background.js';
import { initPlayer, updatePlayer, drawPlayer, moveLeft, moveRight, jump, stopMoving, killPlayer } from './player.js';
import { initEnemies, updateEnemies, drawEnemies } from './enemies.js';
import { initLevel, drawLevel, getCurrentLevel, goToNextLevel } from './level.js';
import { initCoins, updateCoins, drawCoins } from './coins.js';
import { drawScore, resetScore } from './ui.js';
import './sound.js';  // Import sound module to ensure it's initialized


let canvas, ctx;
let gameState = 'playing'; // 'playing', 'deathSequence', or 'gameOver'

export function initGame(levels) {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = 20 * 18; // TILE_SIZE = 18
    canvas.height = 15 * 18;

    initLevel(levels);
    resetGame();

    // Set up event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('click', handleClick);
}

export function resetGame() {
    initPlayer();
    initEnemies(getCurrentLevel().enemies);
    initCoins(getCurrentLevel().coins);
    resetScore();
    gameState = 'playing';
}

export function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx);

    switch (gameState) {
        case 'playing':
            const playerState = updatePlayer();
            if (playerState === 'nextLevel') {
                // Player has entered a door, reset the current level
                initEnemies(getCurrentLevel().enemies);
                initCoins(getCurrentLevel().coins);
                initPlayer();
            }
            updateEnemies();
            updateCoins();
            drawLevel(ctx);
            drawPlayer(ctx);
            drawEnemies(ctx);
            drawCoins(ctx);
            break;
        case 'deathSequence':
            if (updatePlayer()) {
                gameState = 'gameOver';
            }
            drawLevel(ctx);
            drawPlayer(ctx);
            drawEnemies(ctx);
            drawCoins(ctx);
            break;
        case 'gameOver':
            drawGameOverScreen();
            break;
    }

    // Draw score last so it's on top of everything
    drawScore(ctx);

    requestAnimationFrame(gameLoop);
}

function drawGameOverScreen() {
    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Game Over text
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 40);

    // Restart instruction
    ctx.font = '24px Arial';
    ctx.fillText('Tap or press any key to restart', canvas.width / 2, canvas.height / 2 + 40);
}

export function playerDied() {
    killPlayer();
    gameState = 'deathSequence';
}

function handleKeyDown(event) {
    if (gameState === 'gameOver') {
        resetGame();
        return;
    }
    switch (event.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowUp':
        case ' ':
            jump();
            break;
        case 'n':
        case 'N':
            goToNextLevel();
            break;
    }
}

function handleKeyUp(event) {
    switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
            stopMoving();
            break;
    }
}

let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(event) {
    if (gameState === 'gameOver') {
        resetGame();
        return;
    }
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (gameState !== 'playing') return;
    event.preventDefault();
    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal movement
        if (deltaX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else if (deltaY < 0) {
        // Upward movement (jump)
        jump();
    }
}

function handleTouchEnd() {
    if (gameState === 'playing') {
        stopMoving();
    }
}

function handleClick() {
    if (gameState === 'gameOver') {
        resetGame();
    }
}

export function getCanvas() {
    return canvas;
}

export function getContext() {
    return ctx;
}