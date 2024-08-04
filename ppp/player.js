import { checkCollision } from './collision.js';
import { getCanvas } from './game.js';
import { getCurrentLevel, goToNextLevel } from './level.js';
import { playSound } from './sound.js';

const PLAYER_SIZE = 24;
const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const MOVE_SPEED = 5;
const TILE_SIZE = 18;

let player = {
    x: 50,
    y: 50,
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    velocityX: 0,
    velocityY: 0,
    isJumping: false,
    isDead: false,
    deathVelocityY: -15  // Initial upward velocity for death animation
};

let characterSheet = new Image();
characterSheet.src = 'img/character_sheet.png';

export function initPlayer() {
    player.x = 50;
    player.y = 50;
    player.velocityX = 0;
    player.velocityY = 0;
    player.isJumping = false;
    player.isDead = false;
}

export function updatePlayer() {
    if (player.isDead) {
        // Death animation
        player.velocityY += GRAVITY;
        player.y += player.velocityY;
        player.x += player.velocityX;
        
        // Check if player is off screen
        const canvas = getCanvas();
        if (player.y > canvas.height) {
            return true;  // Signal that death animation is complete
        }
        return false;
    }

    player.velocityY += GRAVITY;

    if (checkCollision(player.x, player.y + player.height + player.velocityY)) {
        player.velocityY = 0;
        player.isJumping = false;
    } else {
        player.y += player.velocityY;
    }

    if (checkCollision(player.x + player.velocityX, player.y)) {
        player.velocityX = 0;
    } else {
        player.x += player.velocityX;
    }

    // Check for door collision
    const currentMap = getCurrentLevel().map;
    const playerTileX = Math.floor((player.x + player.width / 2) / TILE_SIZE);
    const playerTileY = Math.floor((player.y + player.height / 2) / TILE_SIZE);
    if (currentMap[playerTileY] && currentMap[playerTileY][playerTileX] === 2) {
        goToNextLevel();
        return 'nextLevel';  // Signal that we've moved to the next level
    }
    
    return false;  // Player is still alive and hasn't changed levels
}

export function drawPlayer(ctx) {
    ctx.drawImage(characterSheet, 0, 0, PLAYER_SIZE, PLAYER_SIZE, player.x, player.y, player.width, player.height);
}

export function killPlayer() {
    player.isDead = true;
    player.velocityY = player.deathVelocityY;
    player.velocityX = 5;  // Add a bit of horizontal velocity for dramatic effect
    playSound('die');

}

export function moveLeft() {
    if (!player.isDead) player.velocityX = -MOVE_SPEED;
}

export function moveRight() {
    if (!player.isDead) player.velocityX = MOVE_SPEED;
}

export function jump() {
    if (!player.isDead && !player.isJumping) {
        player.velocityY = JUMP_FORCE;
        player.isJumping = true;
        playSound('jump');

    }
}

export function stopMoving() {
    if (!player.isDead) player.velocityX = 0;
}

export function getPlayer() {
    return player;
}