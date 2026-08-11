import Phaser from "phaser";
import { ACTUAL_CELL_SIZE_PX } from "@/constants.ts";
import { Direction } from "@/Direction.ts";
import { TileView } from "../types";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { BufferIconDrawer } from "./BufferTileIconDrawer";
import { BuffAreaDrawer } from "./BuffAreaDrawer";
import { HOVER_TILE_DEPTH, TILE_DEPTH } from "@/layor";
export class BufferTileView
  extends Phaser.GameObjects.Container
  implements TileView
{
  private graphics: Phaser.GameObjects.Graphics;
  private isHover: boolean = false;
  readonly name: string = "buffer";
  constructor(
    scene: Phaser.Scene,
    private dir: Direction,
    private readonly directionTileDrawer: DirectionTileDrawer,
    private readonly bufferIconDrawer: BufferIconDrawer,
    private readonly buffAreaDrawer: BuffAreaDrawer,
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
      if (this.scene.input.activePointer.isDown) return;
      this.toHover();
    });
    this.on("pointerout", () => {
      this.toNoHover();
    });
    this.scene.input.on("pointerdown", () => {
      this.toNoHover();
    });
    this.on("pointerup", () => {
      this.toHover();
    });
  }
  private drawTile(dir: Direction): void {
    const g = this.graphics;
    g.clear();
    this.directionTileDrawer.draw(g, dir);
    this.bufferIconDrawer.draw(g);
    if (this.isHover) this.buffAreaDrawer.draw(g);
  }
  private toHover() {
    this.isHover = true;
    console.log(this.isHover);
    this.setDepth(HOVER_TILE_DEPTH);
    this.drawTile(this.dir);
  }
  private toNoHover() {
    this.isHover = false;
    this.setDepth(TILE_DEPTH);
    this.drawTile(this.dir);
  }
  changeDirection(dir: Direction): void {
    this.dir = dir;
    this.drawTile(dir);
  }
}