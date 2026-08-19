import Phaser from "phaser";
import { Direction } from "@/Direction.ts";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { BufferIconDrawer } from "./BufferTileIconDrawer";
import { BOARD_DEPTH_RANGE } from "@/layer";
import { TileOverlayDrawer } from "../TileOverlayDrawer";
import { AbstructDirectionTileView } from "../AbstructTile/View";
export class BufferTileView extends AbstructDirectionTileView {
  private shouldShowBuffArea: boolean = false;
  readonly name: string = "buffer";
  constructor(
    scene: Phaser.Scene,
    private dir: Direction,
    directionTileDrawer: DirectionTileDrawer,
    private readonly bufferIconDrawer: BufferIconDrawer,
    private readonly tileOverlayDrawer: TileOverlayDrawer,
  ) {
    super(scene, directionTileDrawer);
    this.drawTile(dir);
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
  protected drawTile(dir: Direction): void {
    super.drawTile(dir);
    const g = this.graphics;
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
    super.changeDirection(dir);
  }
}