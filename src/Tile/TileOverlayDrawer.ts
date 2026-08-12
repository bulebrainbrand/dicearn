import { Position } from "@/board/BoardViewCoordinateCalculator";
import { ACTUAL_CELL_SIZE_PX } from "@/constants";

export class TileOverlayDrawer {
  constructor(readonly baseColor: Phaser.Display.Color) {}
  draw(g: Phaser.GameObjects.Graphics, tileRelativePosition: Position) {
    const tileSize = ACTUAL_CELL_SIZE_PX;
    const myselfTileLeftUpperCornerPos = [-tileSize / 2, -tileSize / 2];
    const tilePosition = [
      myselfTileLeftUpperCornerPos[0] + tileSize * tileRelativePosition.x,
      myselfTileLeftUpperCornerPos[1] + tileSize * tileRelativePosition.y,
    ] as const;
    g.fillStyle(this.baseColor.color, this.baseColor.alpha);
    g.fillRect(...tilePosition, tileSize, tileSize);
  }
}