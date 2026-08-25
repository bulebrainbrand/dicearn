import Phaser from "phaser";
import { ACTUAL_CELL_SIZE_PX } from "@/constants.ts";
import { Direction } from "@/Direction.ts";
import { TileView } from "../types";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { TileDrawer } from "../TileDrawer";

export abstract class AbstractDirectionTileView
  extends Phaser.GameObjects.Container
  implements TileView
{
  readonly graphics: Phaser.GameObjects.Graphics;
  abstract readonly name: string;
  constructor(
    scene: Phaser.Scene,
    private readonly directionTileDrawer: DirectionTileDrawer,
  ) {
    super(scene, 0, 0);
    scene.add.existing(this);
    const graphics = scene.add.graphics();
    this.graphics = graphics;
    this.add(graphics);
    this.setSize(ACTUAL_CELL_SIZE_PX, ACTUAL_CELL_SIZE_PX);
  }
  protected drawTile(dir: Direction): void {
    this.setToTop();

    const g = this.graphics;
    g.clear();
    this.directionTileDrawer.draw(g, dir);
  }
  changeDirection(dir: Direction): void {
    this.drawTile(dir);
  }
}

export abstract class AbstractTileView
  extends Phaser.GameObjects.Container
  implements TileView
{
  readonly graphics: Phaser.GameObjects.Graphics;
  abstract readonly name: string;
  constructor(
    scene: Phaser.Scene,
    private readonly tileDrawer: TileDrawer,
  ) {
    super(scene, 0, 0);
    scene.add.existing(this);
    const graphics = scene.add.graphics();
    this.graphics = graphics;
    this.add(graphics);
    this.setSize(ACTUAL_CELL_SIZE_PX, ACTUAL_CELL_SIZE_PX);
  }
  protected drawTile(): void {
    this.setToTop();
    const g = this.graphics;
    g.clear();
    this.tileDrawer.draw(g);
  }
}