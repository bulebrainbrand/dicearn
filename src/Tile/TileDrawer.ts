import Phaser from "phaser";
import { TileTheme } from "./TileTheme";
import { CELL_SIZE_PX } from "@/constants";

export class TileDrawer {
  constructor(private readonly theme: TileTheme) {}
  draw(g: Phaser.GameObjects.Graphics) {
    const lineWidth = 12;
    const inset = lineWidth / 2;
    const half = CELL_SIZE_PX / 2 - inset;

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
  }
}