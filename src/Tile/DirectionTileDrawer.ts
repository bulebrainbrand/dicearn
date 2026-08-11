import { Direction, DIRECTION_RADIAN } from "@/Direction";
import Phaser from "phaser";
import { DirectionTileTheme } from "./TileTheme";
import { CELL_SIZE_PX } from "@/constants";

export class DirectionTileDrawer {
  constructor(private readonly theme: DirectionTileTheme) {}
  draw(g: Phaser.GameObjects.Graphics, dir: Direction) {
    const lineWidth = 12;
    const inset = lineWidth / 2;
    const half = CELL_SIZE_PX / 2 - inset;
    g.clear();

    g.fillStyle(this.theme.backgroundColor);
    g.fillRect(
      -half,
      -half,
      CELL_SIZE_PX - lineWidth,
      CELL_SIZE_PX - lineWidth,
    );

    g.lineStyle(lineWidth, this.theme.boarderColor, 1);
    g.strokeRoundedRect(
      -half,
      -half,
      CELL_SIZE_PX - lineWidth,
      CELL_SIZE_PX - lineWidth,
      8,
    );
    g.beginPath();
    g.rotateCanvas(DIRECTION_RADIAN[dir]);
    g.fillStyle(this.theme.arrowColor);
    g.moveTo(-half / 2, -half);
    g.lineTo(0, -half - 24);
    g.lineTo(half / 2, -half);
    g.fill();
    g.rotateCanvas(0);
  }
}