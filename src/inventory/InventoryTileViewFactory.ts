import {
  InventoryTileViewFactory as IInventoryViewFactory,
  InventoryTileView,
} from "./types";
import { NormalInventoryTileView } from "./InventoryTileView";
import { NormalTileFactory } from "@/Tile/NormalTile/Factory";
export class InventoryTileViewFactory implements IInventoryViewFactory {
  constructor(
    private readonly scene: Phaser.Scene,
    private readonly normalTileFactory: NormalTileFactory,
  ) {}
  create(name: string): InventoryTileView {
    if (name === "normal")
      return new NormalInventoryTileView(
        this.scene,
        0,
        0,
        this.normalTileFactory,
        0,
      );
    throw new TypeError(`unexpected name: ${name}`);
  }
}