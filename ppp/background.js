let backgroundSheet = new Image();
backgroundSheet.src = 'img/background_tilesheet.png';

export function drawBackground(ctx) {
    const bgTileSize = 24;
    const numTilesX = Math.ceil(ctx.canvas.width / bgTileSize);
    const numTilesY = Math.ceil(ctx.canvas.height / bgTileSize);

    for (let y = 0; y < numTilesY; y++) {
        for (let x = 0; x < numTilesX; x++) {
            const tileX = Math.floor(Math.random() * 8) * bgTileSize;
            const tileY = Math.floor(Math.random() * 3) * bgTileSize;

            ctx.globalAlpha = 0.3;
            ctx.drawImage(
                backgroundSheet,
                tileX, tileY, bgTileSize, bgTileSize,
                x * bgTileSize, y * bgTileSize, bgTileSize, bgTileSize
            );
            ctx.globalAlpha = 1.0;
        }
    }
}