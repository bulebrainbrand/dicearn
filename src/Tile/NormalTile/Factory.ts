import Phaser from "phaser";
import { Direction } from "@/Direction";
import { TileFactory } from "../types";
import { NormalTileModel } from "./Model";
import { NormalTileView } from "./View";

export class NormalTileFactory implements TileFactory<
  NormalTileModel,
  NormalTileView
> {
  withModel(scene: Phaser.Scene, model: NormalTileModel): NormalTileView {
    const view = new NormalTileView(scene, model.getDirection());
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    return view;
  }
  readonly DEFAULT_DIR: Direction = "u";
  view(scene: Phaser.Scene, dir: Direction = this.DEFAULT_DIR): NormalTileView {
    return new NormalTileView(scene, dir);
  }
  model(dir: Direction = this.DEFAULT_DIR): NormalTileModel {
    return new NormalTileModel(dir);
  }
  all(
    scene: Phaser.Scene,
    dir: Direction = this.DEFAULT_DIR,
  ): { model: NormalTileModel; view: NormalTileView } {
    const model = new NormalTileModel(dir);
    const view = new NormalTileView(scene, dir);
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    return { model, view };
  }
}