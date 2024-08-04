import { checkCollision } from './collision.js';
import { getPlayer } from './player.js';
import { updateScore } from './ui.js';
import { getCurrentLevel } from './level.js';
import { playerDied } from './game.js';

const ENEMY_SIZE = 24;
const GRAVITY = 0.5;

let enemies = [];
let characterSheet = new Image();
characterSheet.src = 'img/character_sheet.png';

// Assume the enemy sprite is in the second row of the character sheet
const ENEMY_SPRITE_Y = ENEMY_SIZE;

export function initEnemies(levelEnemies) {
    enemies = levelEnemies.map(e => ({
        ...e,
        width: ENEMY_SIZE,
        height: ENEMY_SIZE,
        velocityY: 0,
        isDead: false
    }));
}

export function updateEnemies() {
    const player = getPlayer();
    enemies.forEach(enemy => {
        if (enemy.isDead) return;

        enemy.velocityY += GRAVITY;

        if (checkCollision(enemy.x, enemy.y + enemy.height + enemy.velocityY)) {
            enemy.velocityY = 0;
        } else {
            enemy.y += enemy.velocityY;
        }

        if (checkCollision(enemy.x + enemy.direction * 2, enemy.y)) {
            enemy.direction *= -1;
        }

        enemy.x += enemy.direction * 2;

        // Check collision with player
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            if (player.velocityY > 0 && player.y + player.height < enemy.y + enemy.height / 2) {
                // Player is falling and hit the top half of the enemy
                enemy.isDead = true;
                player.velocityY = -5; // Small bounce
                updateScore(50);
            } else {
                // Player died
                playerDied();
            }
        }
    });
}

export function drawEnemies(ctx) {
    enemies.forEach(enemy => {
        if (!enemy.isDead) {
            // Draw enemy facing left or right based on direction
            const spriteX = enemy.direction > 0 ? 0 : ENEMY_SIZE;
            ctx.drawImage(
                characterSheet, 
                spriteX, ENEMY_SPRITE_Y, ENEMY_SIZE, ENEMY_SIZE, 
                enemy.x, enemy.y, enemy.width, enemy.height
            );
        }
    });
}

export function resetEnemies() {
    enemies.forEach(enemy => {
        enemy.isDead = false;
        // Reset enemy to its original position if needed
        // This assumes the original x and y were stored when initializing
        if (enemy.originalX !== undefined && enemy.originalY !== undefined) {
            enemy.x = enemy.originalX;
            enemy.y = enemy.originalY;
        }
    });
}

export function getEnemies() {
    return enemies;
}