import Phaser from "phaser";
import { Direction } from "@/Direction";
import { TileFactory } from "../types";
import { BufferTileModel } from "./Model";
import { BufferTileView } from "./View";

export class BufferTileFactory implements TileFactory<
  BufferTileModel,
  BufferTileView
> {
  withModel(scene: Phaser.Scene, model: BufferTileModel): BufferTileView {
    const view = new BufferTileView(scene, model.getDirection());
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    return view;
  }
  readonly DEFAULT_DIR: Direction = "u";
  view(scene: Phaser.Scene, dir: Direction = this.DEFAULT_DIR): BufferTileView {
    return new BufferTileView(scene, dir);
  }
  model(dir: Direction = this.DEFAULT_DIR): BufferTileModel {
    return new BufferTileModel(dir);
  }
  all(
    scene: Phaser.Scene,
    dir: Direction = this.DEFAULT_DIR,
  ): { model: BufferTileModel; view: BufferTileView } {
    const model = new BufferTileModel(dir);
    const view = new BufferTileView(scene, dir);
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    return { model, view };
  }
}