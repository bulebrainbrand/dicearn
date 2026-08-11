import { ACTUAL_CELL_SIZE_PX } from "@/constants";
import Phaser from "phaser";

export class BuffAreaDrawer {
  constructor(private readonly color: number) {}
  draw(g: Phaser.GameObjects.Graphics) {
    const tileWidth = ACTUAL_CELL_SIZE_PX;
    console.log("a");
  }
}