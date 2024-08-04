let score = 0;

export function drawScore(ctx) {
    // Set a background for the score
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, 40);

    // Draw the score text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

export function updateScore(points) {
    score += points;
}

export function resetScore() {
    score = 0;
}

export function getScore() {
    return score;
}