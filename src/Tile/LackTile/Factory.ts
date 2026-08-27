import Phaser from "phaser";
import { Direction } from "@/Direction";
import { TileFactory } from "../types";
import { LackTileModel } from "./Model";
import { LackTileView } from "./View";
import { DirectionTileTheme } from "../TileTheme";
import {
  TILE_ARROW_COLOR,
  TILE_BACKGRAOUND_COLOR,
  TILE_BOARDER_COLOR,
} from "./constants";
import { DirectionTileDrawer } from "../DirectionTileDrawer";

export class LackTileFactory implements TileFactory<
  LackTileModel,
  LackTileView
> {
  withModel(scene: Phaser.Scene, model: LackTileModel): LackTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const view = new LackTileView(scene, model.getDirection(), drawer);
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    return view;
  }
  readonly DEFAULT_DIR: Direction = "u";
  view(scene: Phaser.Scene, dir: Direction = this.DEFAULT_DIR): LackTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    return new LackTileView(scene, dir, drawer);
  }
  model(dir: Direction = this.DEFAULT_DIR): LackTileModel {
    return new LackTileModel(dir);
  }
  all(
    scene: Phaser.Scene,
    dir: Direction = this.DEFAULT_DIR,
  ): { model: LackTileModel; view: LackTileView; theme: DirectionTileTheme } {
    const model = new LackTileModel(dir);
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const view = new LackTileView(scene, dir, drawer);
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    return { model, view, theme };
  }
  private createTheme() {
    return new DirectionTileTheme(
      TILE_BOARDER_COLOR,
      TILE_BACKGRAOUND_COLOR,
      TILE_ARROW_COLOR,
    );
  }
}