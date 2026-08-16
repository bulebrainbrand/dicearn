import Phaser from "phaser";
import { ACTUAL_CELL_SIZE_PX } from "@/constants.ts";
import { Direction } from "@/Direction.ts";
import { TileView } from "../types";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { BufferIconDrawer } from "./BufferTileIconDrawer";
import { BOARD_DEPTH_RANGE } from "@/layer";
import { TileOverlayDrawer } from "../TileOverlayDrawer";
export class BufferTileView
  extends Phaser.GameObjects.Container
  implements TileView
{
  private graphics: Phaser.GameObjects.Graphics;
  private shouldShowBuffArea: boolean = false;
  readonly name: string = "buffer";
  constructor(
    scene: Phaser.Scene,
    private dir: Direction,
    private readonly directionTileDrawer: DirectionTileDrawer,
    private readonly bufferIconDrawer: BufferIconDrawer,
    private readonly tileOverlayDrawer: TileOverlayDrawer,
  ) {
    super(scene, 0, 0);
    scene.add.existing(this);
    const graphics = scene.add.graphics();
    this.graphics = graphics;
    this.add(graphics);
    this.drawTile(dir);
    this.setSize(ACTUAL_CELL_SIZE_PX, ACTUAL_CELL_SIZE_PX);
    this.setInteractive();
    this.on("pointerover", () => {
      this.showBuffArea();
    });
    this.on("pointerout", () => {
      this.hideBuffArea();
    });
    this.on("pointerdown", () => {
      this.showBuffArea();
    });
  }
  private drawTile(dir: Direction): void {
    const g = this.graphics;
    g.clear();
    this.directionTileDrawer.draw(g, dir);
    this.bufferIconDrawer.draw(g);
    if (this.shouldShowBuffArea) {
      this.tileOverlayDrawer.draw(g, { x: 1, y: 0 });
      this.tileOverlayDrawer.draw(g, { x: 0, y: 1 });
      this.tileOverlayDrawer.draw(g, { x: -1, y: 0 });
      this.tileOverlayDrawer.draw(g, { x: 0, y: -1 });
    }
  }
  private showBuffArea() {
    this.shouldShowBuffArea = true;
    console.log(this.shouldShowBuffArea);
    this.setDepth(BOARD_DEPTH_RANGE.getDepth(2));
    this.drawTile(this.dir);
  }
  private hideBuffArea() {
    this.shouldShowBuffArea = false;
    this.setDepth(BOARD_DEPTH_RANGE.getDepth(1));
    this.drawTile(this.dir);
  }
  changeDirection(dir: Direction): void {
    this.dir = dir;
    this.drawTile(dir);
  }
}