import Phaser from "phaser";
import { Direction } from "@/Direction";
import { TileFactory } from "../types";
import { NormalTileModel } from "./Model";
import { NormalTileView } from "./View";
import { DirectionTileTheme } from "../TileTheme";
import {
  TILE_ARROW_COLOR,
  TILE_BACKGRAOUND_COLOR,
  TILE_BOARDER_COLOR,
} from "./constants";
import { DirectionTileDrawer } from "../DirectionTileDrawer";

export class NormalTileFactory implements TileFactory<
  NormalTileModel,
  NormalTileView
> {
  withModel(scene: Phaser.Scene, model: NormalTileModel): NormalTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const view = new NormalTileView(scene, model.getDirection(), drawer);
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    return view;
  }
  readonly DEFAULT_DIR: Direction = "u";
  view(scene: Phaser.Scene, dir: Direction = this.DEFAULT_DIR): NormalTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    return new NormalTileView(scene, dir, drawer);
  }
  model(dir: Direction = this.DEFAULT_DIR): NormalTileModel {
    return new NormalTileModel(dir);
  }
  all(
    scene: Phaser.Scene,
    dir: Direction = this.DEFAULT_DIR,
  ): {
    model: NormalTileModel;
    view: NormalTileView;
    theme: DirectionTileTheme;
  } {
    const model = new NormalTileModel(dir);
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const view = new NormalTileView(scene, dir, drawer);
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