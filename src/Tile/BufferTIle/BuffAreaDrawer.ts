import { ACTUAL_CELL_SIZE_PX } from "@/constants";
import Phaser from "phaser";

export class BuffAreaDrawer {
  constructor(private readonly color: Phaser.Display.Color) {}
  draw(g: Phaser.GameObjects.Graphics) {
    const tileSize = ACTUAL_CELL_SIZE_PX;
    const rightTileLeftUpperCorner = [tileSize / 2, -tileSize / 2] as const;
    const leftTileLeftUpperCorner = [
      -tileSize / 2 - tileSize,
      -tileSize / 2,
    ] as const;
    const upperTileLeftUpperCorner = [
      -tileSize / 2,
      -tileSize / 2 - tileSize,
    ] as const;
    const lowerTileLeftUpperCorner = [
      -tileSize / 2,
      -tileSize / 2 + tileSize,
    ] as const;
    g.fillStyle(this.color.color, this.color.alpha);
    g.fillRect(...rightTileLeftUpperCorner, tileSize, tileSize);
    g.fillRect(...leftTileLeftUpperCorner, tileSize, tileSize);
    g.fillRect(...upperTileLeftUpperCorner, tileSize, tileSize);
    g.fillRect(...lowerTileLeftUpperCorner, tileSize, tileSize);
  }
}